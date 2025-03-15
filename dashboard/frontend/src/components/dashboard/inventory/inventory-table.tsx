"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Edit,
  Trash,
  History,
  UserCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditItemModal } from "./edit-item-modal";

const inventory = [
  {
    id: "HER-001",
    name: 'Llave Inglesa 12"',
    category: "Herramientas",
    stock: 3,
    minStock: 5,
    maxStock: 15,
    unit: "Unidad",
    location: "A-12-3",
    supplier: "Herramientas Industriales S.A.",
    status: "Disponible",
    lastUsed: "2023-04-14",
    expiryDate: null,
  },
  {
    id: "LUB-023",
    name: "Aceite Hidráulico SAE 10",
    category: "Lubricantes",
    stock: 2,
    minStock: 10,
    maxStock: 30,
    unit: "Litro",
    location: "B-05-2",
    supplier: "Lubricantes Técnicos",
    status: "Stock Bajo",
    lastUsed: "2023-04-10",
    expiryDate: "2024-06-30",
  },
  {
    id: "TOR-105",
    name: "Tornillo Hexagonal M8x50",
    category: "Tornillería",
    stock: 25,
    minStock: 100,
    maxStock: 500,
    unit: "Unidad",
    location: "C-23-4",
    supplier: "Ferretería Industrial",
    status: "Stock Bajo",
    lastUsed: "2023-04-14",
    expiryDate: null,
  },
  {
    id: "ELE-042",
    name: "Cable Eléctrico 12 AWG",
    category: "Eléctricos",
    stock: 15,
    minStock: 50,
    maxStock: 200,
    unit: "Metro",
    location: "D-08-1",
    supplier: "Suministros Eléctricos",
    status: "Stock Bajo",
    lastUsed: "2023-04-14",
    expiryDate: null,
  },
  {
    id: "HER-015",
    name: "Destornillador Phillips #2",
    category: "Herramientas",
    stock: 12,
    minStock: 10,
    maxStock: 30,
    unit: "Unidad",
    location: "A-14-2",
    supplier: "Herramientas Industriales S.A.",
    status: "Disponible",
    lastUsed: "2023-04-12",
    expiryDate: null,
  },
  {
    id: "SEG-007",
    name: "Guantes de Seguridad Talla L",
    category: "Seguridad",
    stock: 8,
    minStock: 15,
    maxStock: 50,
    unit: "Par",
    location: "E-02-3",
    supplier: "Equipos de Protección Industrial",
    status: "Stock Bajo",
    lastUsed: "2023-04-13",
    expiryDate: "2025-01-15",
  },
  {
    id: "MOT-003",
    name: "Motor Eléctrico 2HP 220V",
    category: "Motores",
    stock: 2,
    minStock: 1,
    maxStock: 5,
    unit: "Unidad",
    location: "F-10-1",
    supplier: "Motores y Equipos Industriales",
    status: "Disponible",
    lastUsed: "2023-03-25",
    expiryDate: null,
  },
];

export function InventoryTable() {
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const sortedInventory = [...inventory].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a];
    const bValue = b[sortColumn as keyof typeof b];

    if (aValue === null) return 1;
    if (bValue === null) return -1;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center">
                  Código
                  <SortIcon column="id" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Nombre
                  <SortIcon column="name" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center">
                  Categoría
                  <SortIcon column="category" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer text-right"
                onClick={() => handleSort("stock")}
              >
                <div className="flex items-center justify-end">
                  Stock
                  <SortIcon column="stock" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer text-right"
                onClick={() => handleSort("minStock")}
              >
                <div className="flex items-center justify-end">
                  Stock Mínimo
                  <SortIcon column="minStock" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("location")}
              >
                <div className="flex items-center">
                  Ubicación
                  <SortIcon column="location" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center">
                  Estado
                  <SortIcon column="status" />
                </div>
              </TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.category}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {item.stock} {item.unit}
                </TableCell>
                <TableCell className="text-right">{item.minStock}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "Disponible" ? "outline" : "secondary"
                    }
                    className={
                      item.status === "Stock Bajo"
                        ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                        : ""
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(item)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <History className="mr-2 h-4 w-4" />
                        <span>Historial</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserCheck className="mr-2 h-4 w-4" />
                        <span>Asignar</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Eliminar</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedItem && (
        <EditItemModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          item={selectedItem}
        />
      )}
    </>
  );
}
