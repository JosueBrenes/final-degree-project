"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Filter,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getQuotes, deleteQuote } from "@/lib/quotes";
import QuoteEdit from "./QuoteEdit";
import QuoteModal from "./QuoteModal";

interface Quote {
  id: string;
  client: string;
  date: string;
  total: number;
  status: string;
  items: string;
  createdBy: string;
}

const statusColors: Record<string, string> = {
  Pendiente: "bg-yellow-500 text-black",
  Aprobada: "bg-green-500 text-white",
  Rechazada: "bg-red-500 text-white",
  "En proceso": "bg-blue-500 text-white",
  Completada: "bg-purple-500 text-white",
};

export default function QuotesTable() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [clientFilter, setClientFilter] = useState("todos");

  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    filterQuotes();
  }, [quotes, searchQuery, statusFilter, clientFilter]);

  const fetchQuotes = async () => {
    setIsLoading(true);
    try {
      const data = await getQuotes();
      setQuotes(data);
      setFilteredQuotes(data);
    } catch (error) {
      console.error("Error al obtener cotizaciones:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterQuotes = () => {
    let filtered = [...quotes];

    // Aplicar filtro de búsqueda
    if (searchQuery) {
      filtered = filtered.filter(
        (quote) =>
          quote.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
          quote.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          quote.items.toLowerCase().includes(searchQuery.toLowerCase()) ||
          quote.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Aplicar filtro de estado
    if (statusFilter !== "todos") {
      filtered = filtered.filter((quote) => quote.status === statusFilter);
    }

    // Aplicar filtro de cliente
    if (clientFilter !== "todos") {
      filtered = filtered.filter((quote) => quote.client === clientFilter);
    }

    setFilteredQuotes(filtered);
  };

  const handleEdit = (quote: Quote) => {
    setEditingQuote(quote);
    setIsEditOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteQuote(id);
      await fetchQuotes();
    } catch (error) {
      console.error("Error al eliminar cotización:", error);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredQuotes.map((q) => ({
        Fecha: q.date,
        Cliente: q.client,
        Total: q.total,
        Estado: q.status,
        Items: q.items,
        "Realizado por": q.createdBy,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cotizaciones");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(data, "Cotizaciones.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const logoPath = "/img/logo.png";

    doc.addImage(logoPath, "PNG", 160, 10, 30, 30);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 150, 243);
    doc.text("Reporte de Cotizaciones", 14, 20);

    autoTable(doc, {
      head: [["Fecha", "Cliente", "Total", "Estado", "Items", "Realizado por"]],
      body: filteredQuotes.map((q) => [
        q.date,
        q.client,
        new Intl.NumberFormat("es-CR", {
          style: "currency",
          currency: "CRC",
        }).format(q.total),
        q.status,
        q.items,
        q.createdBy,
      ]),
      startY: 50,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: {
        fillColor: [33, 150, 243],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      theme: "grid",
    });

    doc.save("Cotizaciones.pdf");
  };

  const clients = Array.from(new Set(quotes.map((quote) => quote.client)));
  const statuses = Array.from(new Set(quotes.map((quote) => quote.status)));

  return (
    <Card className="shadow-md">
      <CardHeader className="border-b">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">Cotizaciones</CardTitle>
            <CardDescription>
              Gestione cotizaciones, clientes y genere reportes.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Agregar Cotización
            </Button>
            <Button
              onClick={exportToExcel}
              variant="outline"
              className="bg-green-600 hover:bg-green-700 text-white border-green-600"
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" /> Exportar Excel
            </Button>
            <Button
              onClick={exportToPDF}
              variant="outline"
              className="bg-red-600 hover:bg-red-700 text-white border-red-600"
            >
              <FileText className="mr-2 h-4 w-4" />
              Exportar PDF
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID, cliente, items o creador..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-4">
              <Select value={clientFilter} onValueChange={setClientFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los clientes</SelectItem>
                  {clients.map((client) => (
                    <SelectItem key={client} value={client}>
                      {client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      <Badge className={statusColors[status] || "bg-gray-500"}>
                        {status}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="text-center p-8 border rounded-lg bg-muted/50">
            <p className="text-muted-foreground">
              No se encontraron cotizaciones.
            </p>
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Cliente</TableHead>
                    <TableHead className="font-semibold">Fecha</TableHead>
                    <TableHead className="font-semibold">Total</TableHead>
                    <TableHead className="font-semibold">Estado</TableHead>
                    <TableHead className="font-semibold">Items</TableHead>
                    <TableHead className="font-semibold">Creado por</TableHead>
                    <TableHead className="font-semibold text-right">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium">{quote.id}</TableCell>
                      <TableCell>{quote.client}</TableCell>
                      <TableCell>
                        {new Date(quote.date).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("es-CR", {
                          style: "currency",
                          currency: "CRC",
                        }).format(quote.total)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            statusColors[quote.status] ||
                            "bg-gray-500 text-white"
                          }
                        >
                          {quote.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{quote.items}</TableCell>
                      <TableCell>{quote.createdBy}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(quote)}
                          >
                            <Pencil className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(quote.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t py-4 px-6">
        <div className="flex justify-between items-center w-full text-sm text-muted-foreground">
          <div>
            Mostrando {filteredQuotes.length} de {quotes.length} cotizaciones
          </div>
          {filteredQuotes.length > 0 && (
            <div>
              Total:{" "}
              {new Intl.NumberFormat("es-CR", {
                style: "currency",
                currency: "CRC",
              }).format(
                filteredQuotes.reduce((sum, quote) => sum + quote.total, 0)
              )}
            </div>
          )}
        </div>
      </CardFooter>

      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchQuotes}
      />

      {editingQuote && (
        <QuoteEdit
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onSuccess={fetchQuotes}
          quote={editingQuote}
        />
      )}
    </Card>
  );
}
