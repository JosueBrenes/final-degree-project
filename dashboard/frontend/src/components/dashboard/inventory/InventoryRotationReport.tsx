"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { saveAs } from "file-saver"; // Para exportación <---------------------------------------------
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: string;
  supplier: string;
  lastUpdated: string;
  minStockLevel: number;
  movements: { date: string; type: "in" | "out"; quantity: number }[];
}

interface Props {
  inventory: InventoryItem[];
  isOpen: boolean;
  onClose: () => void;
}

export default function InventoryRotationReport({ inventory, isOpen, onClose }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<string>("All");
  const { toast } = useToast();

  if (!isOpen) return null;

  const filterMovements = () => {
    if (selectedProduct === "All") {
      return inventory;
    }
    return inventory.filter((item) => item.id === selectedProduct);
  };

  const exportToExcel = () => {
    const data = filterMovements().flatMap((item) =>
      item.movements.map((movement) => ({
        Product: item.name,
        Category: item.category,
        Date: movement.date,
        Type: movement.type === "in" ? "Entry" : "Exit",
        Quantity: movement.quantity,
      }))
    );

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rotation Report");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    saveAs(excelBlob, "Inventory_Rotation_Report.xlsx");

    toast({
      title: "Export Successful",
      description: "The report has been exported as an Excel file.",
    });
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Inventory Rotation Report", 10, 10);

    autoTable(doc, {
      head: [["Product", "Category", "Date", "Type", "Quantity"]],
      body: filterMovements().flatMap((item) =>
        item.movements.map((movement) => [
          item.name,
          item.category,
          movement.date,
          movement.type === "in" ? "Entry" : "Exit",
          movement.quantity,
        ])
      ),
    });

    doc.save("Inventory_Rotation_Report.pdf");

    toast({
      title: "Export Successful",
      description: "The report has been exported as a PDF file.",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-3/4">
        <h2 className="text-lg font-semibold mb-4">Inventory Rotation Report</h2>
        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Products</SelectItem>
            {inventory.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterMovements().flatMap((item) =>
              item.movements.map((movement, index) => (
                <TableRow key={`${item.id}-${index}`}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{movement.date}</TableCell>
                  <TableCell>{movement.type === "in" ? "Entry" : "Exit"}</TableCell>
                  <TableCell>{movement.quantity}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex justify-end mt-4">
          <Button onClick={exportToExcel} className="mr-2">
            Export to Excel
          </Button>
          <Button onClick={exportToPDF}>Export to PDF</Button>
        </div>

        <Button onClick={onClose} className="mt-4">
          Close
        </Button>
      </div>
    </div>
  );
}