"use client";

import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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

export default function InventoryRotationReport({
  inventory,
  isOpen,
  onClose,
}: Props) {
  const [selectedProduct, setSelectedProduct] = useState<string>("All");
  const { toast } = useToast();

  if (!isOpen) return null;

  const filterMovements = () => {
    if (selectedProduct === "All") {
      return inventory;
    }
    return inventory.filter((item) => item.id === selectedProduct);
  };

  const exportToCSV = () => {
    const headers = ["Product", "Category", "Date", "Type", "Quantity"];
    const csvContent = [
      headers.join(","),
      ...filterMovements().flatMap((item) =>
        item.movements.map((movement) =>
          [
            item.name,
            item.category,
            movement.date,
            movement.type === "in" ? "Entry" : "Exit",
            movement.quantity,
          ].join(",")
        )
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "Inventory_Rotation_Report.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    toast({
      title: "Export Successful",
      description: "The report has been exported as a CSV file.",
    });
  };

  const exportToPDF = () => {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Create header
    const headerRow = document.createElement("tr");
    ["Product", "Category", "Date", "Type", "Quantity"].forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create body
    filterMovements().forEach((item) => {
      item.movements.forEach((movement) => {
        const row = document.createElement("tr");
        [
          item.name,
          item.category,
          movement.date,
          movement.type === "in" ? "Entry" : "Exit",
          movement.quantity,
        ].forEach((text) => {
          const td = document.createElement("td");
          td.textContent = String(text);
          row.appendChild(td);
        });
        tbody.appendChild(row);
      });
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    const style = document.createElement("style");
    style.textContent = `
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid black; padding: 8px; text-align: left; }
      th { background-color: #f2f2f2; }
    `;

    const win = window.open("", "_blank");
    win!.document.write(
      "<html><head><title>Inventory Rotation Report</title></head><body>"
    );
    win!.document.write("<h1>Inventory Rotation Report</h1>");
    win!.document.head.appendChild(style);
    win!.document.body.appendChild(table);
    win!.document.write("</body></html>");
    win!.document.close();
    win!.print();

    toast({
      title: "Export Successful",
      description:
        "The report has been opened in a new tab for printing or saving as PDF.",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-3/4">
        <h2 className="text-lg font-semibold mb-4">
          Inventory Rotation Report
        </h2>
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
                  <TableCell>
                    {movement.type === "in" ? "Entry" : "Exit"}
                  </TableCell>
                  <TableCell>{movement.quantity}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex justify-end mt-4">
          <Button onClick={exportToCSV} className="mr-2">
            Export to CSV
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
