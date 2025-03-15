"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, Filter } from "lucide-react";
import {
  getInventoryItems,
  deleteInventoryItem,
  type InventoryItem,
} from "@/lib/inventory";
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
import EditItemModal from "./EditItemModal";
import AddItemModal from "./AddItemModal";

const statusColors: Record<string, string> = {
  Disponible: "bg-green-500 text-white",
  "Stock Bajo": "bg-orange-500 text-white",
  Agotado: "bg-red-500 text-white",
  Descontinuado: "bg-gray-500 text-white",
};

const categoryColors: Record<string, string> = {
  Herramientas: "bg-blue-500 text-white",
  Materiales: "bg-purple-500 text-white",
  Repuestos: "bg-yellow-500 text-black",
  Consumibles: "bg-teal-500 text-white",
  Equipos: "bg-indigo-500 text-white",
};

export function InventoryTable() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");

  useEffect(() => {
    loadInventory();
  }, []);

  useEffect(() => {
    filterInventory();
  }, [inventory, searchQuery, categoryFilter, statusFilter]);

  const loadInventory = async () => {
    setIsLoading(true);
    try {
      const items = await getInventoryItems();
      setInventory(items);
      setFilteredInventory(items);
    } catch (error) {
      console.error("Error al cargar inventario:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterInventory = () => {
    let filtered = [...inventory];

    // Aplicar filtro de búsqueda
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Aplicar filtro de categoría
    if (categoryFilter !== "todos") {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }

    // Aplicar filtro de estado
    if (statusFilter !== "todos") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    setFilteredInventory(filtered);
  };

  const handleEdit = (item: InventoryItem) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteInventoryItem(id);
      await loadInventory();
    } catch (error) {
      console.error("Error al eliminar ítem:", error);
    }
  };

  const handleItemAdded = () => {
    setAddModalOpen(false);
    loadInventory();
  };

  const handleItemUpdated = () => {
    setEditModalOpen(false);
    loadInventory();
  };

  const categories = Array.from(
    new Set(inventory.map((item) => item.category))
  );

  const statuses = Array.from(new Set(inventory.map((item) => item.status)));

  return (
    <Card className="shadow-md">
      <CardHeader className="border-b">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">Inventario</CardTitle>
            <CardDescription>
              Gestione ítems, categorías, stock y ubicaciones.
            </CardDescription>
          </div>
          <Button onClick={() => setAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Agregar Ítem
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por código, nombre, categoría o ubicación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas las categorías</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
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
                      {status}
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
        ) : filteredInventory.length === 0 ? (
          <div className="text-center p-8 border rounded-lg bg-muted/50">
            <p className="text-muted-foreground">
              No se encontraron ítems en el inventario.
            </p>
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Código</TableHead>
                    <TableHead className="font-semibold">Nombre</TableHead>
                    <TableHead className="font-semibold">Categoría</TableHead>
                    <TableHead className="font-semibold">Stock</TableHead>
                    <TableHead className="font-semibold">Ubicación</TableHead>
                    <TableHead className="font-semibold">Estado</TableHead>
                    <TableHead className="font-semibold text-right">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            categoryColors[item.category] ||
                            "bg-gray-500 text-white"
                          }
                        >
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.stock} {item.unit}
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            statusColors[item.status] ||
                            "bg-gray-500 text-white"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(item.id)}
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
            Mostrando {filteredInventory.length} de {inventory.length} ítems
          </div>
          {filteredInventory.length > 0 && (
            <div>
              Total de ítems:{" "}
              {filteredInventory.reduce((sum, item) => sum + item.stock, 0)}{" "}
              unidades
            </div>
          )}
        </div>
      </CardFooter>

      {selectedItem && (
        <EditItemModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          item={selectedItem}
        />
      )}

      <AddItemModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onItemAdded={handleItemAdded}
      />
    </Card>
  );
}
