"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InventoryModal from "./InventoryModal";

const inventoryItems = [
  {
    id: "ITM-001",
    name: "Industrial Lubricant",
    category: "Consumables",
    quantity: 50,
    status: "In Stock",
    supplier: "Supplier A",
    lastUpdated: "2023-11-01",
  },
  {
    id: "ITM-002",
    name: "Hydraulic Pump",
    category: "Machinery",
    quantity: 10,
    status: "In Stock",
    supplier: "Supplier B",
    lastUpdated: "2023-11-05",
  },
  {
    id: "ITM-003",
    name: "Safety Helmets",
    category: "Safety Equipment",
    quantity: 100,
    status: "In Stock",
    supplier: "Supplier C",
    lastUpdated: "2023-11-07",
  },
  {
    id: "ITM-004",
    name: "Welding Rods",
    category: "Tools",
    quantity: 200,
    status: "In Stock",
    supplier: "Supplier D",
    lastUpdated: "2023-11-08",
  },
  {
    id: "ITM-005",
    name: "Conveyor Belts",
    category: "Machinery Parts",
    quantity: 15,
    status: "Low Stock",
    supplier: "Supplier E",
    lastUpdated: "2023-11-10",
  },
  // ... (rest of the inventory items)
];

export default function InventoryTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory</CardTitle>
        <CardDescription>
          Manage and review industrial maintenance inventory items.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell
                  className={
                    item.status === "Low Stock"
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {item.status}
                </TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <InventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Card>
  );
}
