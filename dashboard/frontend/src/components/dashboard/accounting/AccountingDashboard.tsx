"use client";

import React, { useState } from "react";
import { FileText, FileSpreadsheet, Pencil, Trash, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const AccountingDashboard = () => {
  const [invoices, setInvoices] = useState([
    { id: "FAC-001", client: "Empresa XYZ", amount: 4500, type: "Ingreso", date: "2025-01-05" },
    { id: "FAC-002", client: "Proveedor ABC", amount: 3200, type: "Egreso", date: "2025-02-10" },
  ]);

  const [ivaRate, setIvaRate] = useState(13); // IVA por defecto al 13%
  const [retentionRate, setRetentionRate] = useState(2); // Retención por defecto al 2%
  const [notifications, setNotifications] = useState([]);
  const [editingInvoice, setEditingInvoice] = useState(null);

  // Notificación de cambios en regulaciones fiscales
  const addNotification = (message) => {
    setNotifications((prev) => [...prev, { id: prev.length + 1, message }]);
  };

  // Actualizar la tasa de IVA
  const updateIvaRate = (newRate) => {
    setIvaRate(newRate);
    addNotification(`La tasa de IVA ha sido actualizada a ${newRate}%`);
  };

  // Actualizar la tasa de retención
  const updateRetentionRate = (newRate) => {
    setRetentionRate(newRate);
    addNotification(`La tasa de retención ha sido actualizada a ${newRate}%`);
  };

  // Función para exportar el resumen en PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Resumen de Facturación", 10, 10);
    autoTable(doc, {
      head: [["ID", "Cliente", "Monto", "IVA Aplicado", "Tipo", "Fecha"]],
      body: invoices.map((inv) => [
        inv.id,
        inv.client,
        `$${inv.amount.toFixed(2)}`,
        `$${(inv.amount * (ivaRate / 100)).toFixed(2)}`,
        inv.type,
        inv.date,
      ]),
    });
    doc.save("Resumen_Facturacion.pdf");
  };

  // Función para exportar el resumen en Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(invoices);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Facturas");
    XLSX.writeFile(wb, "Resumen_Facturacion.xlsx");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Módulo de Facturación e Impuestos</h1>

      <div className="flex gap-4 mb-4">
        <Button onClick={exportToPDF}>
          <FileText className="mr-2 h-4 w-4" /> Exportar PDF
        </Button>
        <Button onClick={exportToExcel}>
          <FileSpreadsheet className="mr-2 h-4 w-4" /> Exportar Excel
        </Button>
      </div>

      {/* Configuración de impuestos */}
      <div className="mt-6 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Configuración de Impuestos</h2>
        <div className="flex items-center gap-4">
          <label>Tasa de IVA (%):</label>
          <Input
            type="number"
            value={ivaRate}
            onChange={(e) => updateIvaRate(parseFloat(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-4 mt-2">
          <label>Tasa de Retención (%):</label>
          <Input
            type="number"
            value={retentionRate}
            onChange={(e) => updateRetentionRate(parseFloat(e.target.value))}
          />
        </div>
      </div>

      {/* Facturas */}
      <h2 className="text-2xl font-semibold mt-6 mb-3">Facturas Registradas</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Cliente/Proveedor</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>IVA Aplicado</TableHead>
            <TableHead>Retención Aplicada</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.id}</TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell>${invoice.amount.toFixed(2)}</TableCell>
              <TableCell>${(invoice.amount * (ivaRate / 100)).toFixed(2)}</TableCell>
              <TableCell>${(invoice.amount * (retentionRate / 100)).toFixed(2)}</TableCell>
              <TableCell>{invoice.type}</TableCell>
              <TableCell>{invoice.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Notificaciones */}
      <h2 className="text-2xl font-semibold mt-6 mb-3">Notificaciones Fiscales</h2>
      <div className="p-4 border rounded-lg bg-gray-100">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <p key={notif.id} className="text-gray-700 flex items-center">
              <Bell className="h-4 w-4 mr-2 text-yellow-500" /> {notif.message}
            </p>
          ))
        ) : (
          <p>No hay notificaciones.</p>
        )}
      </div>

      {/* Resumen de Facturación */}
      <div className="mt-6 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Resumen de Facturación</h2>
        <p>
          <strong>Total de Ingresos:</strong> $
          {invoices
            .filter((i) => i.type === "Ingreso")
            .reduce((sum, i) => sum + i.amount, 0)
            .toFixed(2)}
        </p>
        <p>
          <strong>Total de Egresos:</strong> $
          {invoices
            .filter((i) => i.type === "Egreso")
            .reduce((sum, i) => sum + i.amount, 0)
            .toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default AccountingDashboard;
