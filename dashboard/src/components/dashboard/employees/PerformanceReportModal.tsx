"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "jspdf-autotable";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Empleado {
  id: string;
  name: string;
}

interface ModalReporteDesempenoProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Empleado | null;
}

interface DatosDesempeno {
  name: string;
  score: number;
}

interface DatosDesempenoEquipo {
  name: string;
  productivity: number;
  quality: number;
  teamwork: number;
}

const datosMockDesempeno: DatosDesempeno[] = [
  { name: "Productividad", score: 85 },
  { name: "Calidad", score: 90 },
  { name: "Trabajo en Equipo", score: 95 },
  { name: "Iniciativa", score: 80 },
  { name: "Comunicación", score: 88 },
];

const datosMockDesempenoEquipo: DatosDesempenoEquipo[] = [
  { name: "Gerencia", productivity: 90, quality: 95, teamwork: 85 },
  { name: "Administración", productivity: 85, quality: 88, teamwork: 92 },
  { name: "Operaciones", productivity: 92, quality: 87, teamwork: 90 },
  { name: "Producción", productivity: 88, quality: 90, teamwork: 86 },
];

export default function ModalReporteDesempeno({
  isOpen,
  onClose,
  employee,
}: ModalReporteDesempenoProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportarAExcel = () => {
    setIsExporting(true);
    const datos = employee ? datosMockDesempeno : datosMockDesempenoEquipo;
    const titulo = employee
      ? "Reporte Individual de Desempeño"
      : "Reporte de Desempeño del Equipo";

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datos);
    const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
    const wscols = Object.keys(datos[0]).map(() => ({ wch: 20 }));
    ws["!cols"] = wscols;

    if (!ws["!props"]) ws["!props"] = {};

    XLSX.utils.book_append_sheet(wb, ws, "Reporte de Desempeño");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(
      blob,
      `Reporte_Desempeño_${employee ? "Individual" : "Equipo"}.xlsx`
    );

    setIsExporting(false);
  };

  const exportarAExcelConEstilos = async () => {
    setIsExporting(true);

    const ExcelJS = (await import("exceljs")).default;

    const datos = employee ? datosMockDesempeno : datosMockDesempenoEquipo;
    const titulo = employee
      ? "Reporte Individual de Desempeño"
      : "Reporte de Desempeño del Equipo";

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Arce & Vargas";
    workbook.lastModifiedBy = "Sistema de Inventario";
    workbook.created = new Date();
    workbook.modified = new Date();

    const worksheet = workbook.addWorksheet("Reporte de Desempeño");

    worksheet.mergeCells("A1:E1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = titulo;
    titleCell.font = {
      name: "Arial",
      size: 16,
      bold: true,
      color: { argb: "FFFFFFFF" },
    };
    titleCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00003087" },
    };
    titleCell.alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getRow(1).height = 30;

    worksheet.mergeCells("A2:E2");
    const subtitleCell = worksheet.getCell("A2");
    subtitleCell.value = "Arce & Vargas Industrial Solutions";
    subtitleCell.font = {
      name: "Arial",
      size: 12,
      color: { argb: "FF666666" },
    };
    subtitleCell.alignment = { horizontal: "center" };
    worksheet.getRow(2).height = 20;

    worksheet.mergeCells("A3:E3");
    const dateCell = worksheet.getCell("A3");
    dateCell.value = `Fecha: ${new Date().toLocaleDateString(
      "es-ES"
    )} | Período: ${new Date().getFullYear()}`;
    dateCell.font = {
      name: "Arial",
      size: 10,
      color: { argb: "FF666666" },
    };
    dateCell.alignment = { horizontal: "right" };

    worksheet.addRow([]);

    const headers = Object.keys(datos[0]);
    const headerRow = worksheet.addRow(headers.map((h) => h.toUpperCase()));

    headerRow.eachCell((cell) => {
      cell.font = {
        name: "Arial",
        size: 12,
        bold: true,
        color: { argb: "FFFFFFFF" },
      };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "00003087" },
      };
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    worksheet.getRow(5).height = 25;

    datos.forEach((fila, index) => {
      const row = worksheet.addRow(Object.values(fila));

      const fillColor = index % 2 === 0 ? "FFF5F7FA" : "FFFFFFFF";

      row.eachCell((cell) => {
        cell.font = {
          name: "Arial",
          size: 11,
        };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: fillColor },
        };
        cell.border = {
          top: { style: "thin", color: { argb: "FFDDDDDD" } },
          left: { style: "thin", color: { argb: "FFDDDDDD" } },
          bottom: { style: "thin", color: { argb: "FFDDDDDD" } },
          right: { style: "thin", color: { argb: "FFDDDDDD" } },
        };

        if (typeof cell.value === "number") {
          cell.alignment = { horizontal: "right" };
        }
      });
    });

    worksheet.columns.forEach((column) => {
      column.width = 20;
    });

    worksheet.addRow([]);
    const footerRow = worksheet.addRow([
      "Arce & Vargas - Reporte de Desempeño",
    ]);
    footerRow.getCell(1).font = {
      name: "Arial",
      size: 10,
      color: { argb: "FF666666" },
    };

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(
      blob,
      `Reporte_Desempeño_${employee ? "Individual" : "Equipo"}.xlsx`
    );

    setIsExporting(false);
  };

  const exportarAPDF = async () => {
    setIsExporting(true);
    const doc = new jsPDF();
    const datos = employee ? datosMockDesempeno : datosMockDesempenoEquipo;
    const titulo = employee
      ? "Reporte Individual de Desempeño"
      : "Reporte de Desempeño del Equipo";

    const anchoPage = doc.internal.pageSize.width;
    const altoPage = doc.internal.pageSize.height;

    const gradient = doc.setFillColor(0, 48, 135);
    doc.rect(0, 0, anchoPage, 50, "F");

    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.line(14, 35, anchoPage - 14, 35);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.text(titulo, 14, 25);

    doc.setFontSize(12);
    doc.setTextColor(200, 200, 200);
    doc.text("Arce & Vargas Industrial Solutions", 14, 45);

    doc.setTextColor(80, 80, 80);
    doc.setFontSize(11);
    doc.text(`Fecha: ${new Date().toLocaleDateString("es-ES")}`, 14, 65);
    doc.text(`Período: ${new Date().getFullYear()}`, 14, 75);

    const encabezados = Object.keys(datos[0]).map((clave) => ({
      content: clave.toUpperCase(),
      styles: {
        fillColor: [0, 48, 135] as [number, number, number],
        textColor: [255, 255, 255] as [number, number, number],
        fontStyle: "bold",
      },
    }));

    const filas = datos.map((fila) => Object.values(fila));

    autoTable(doc, {
      head: [encabezados],
      body: filas,
      startY: 85,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 6,
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [0, 48, 135],
        textColor: [255, 255, 255],
        fontSize: 11,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      margin: { top: 20, left: 14, right: 14 },
    });

    const piePaginaY = altoPage - 20;

    doc.setDrawColor(0, 48, 135);
    doc.setLineWidth(0.5);
    doc.line(14, piePaginaY - 5, anchoPage - 14, piePaginaY - 5);

    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("Tel: +123 456 789", 14, piePaginaY);
    doc.text("Email: contacto@arcevargas.com", anchoPage / 2, piePaginaY, {
      align: "center",
    });
    doc.text("www.arcevargas.com", anchoPage - 14, piePaginaY, {
      align: "right",
    });

    doc.setFontSize(8);
    doc.text(`Página 1 de 1`, anchoPage - 14, piePaginaY - 10, {
      align: "right",
    });

    const nombreArchivo = employee
      ? `Reporte_Individual_${employee.name.replace(" ", "_")}.pdf`
      : "Reporte_Equipo.pdf";

    doc.save(nombreArchivo);
    setIsExporting(false);
  };

  const renderizarReporteIndividual = () => (
    <Card>
      <CardHeader>
        <CardTitle>Reporte de Desempeño de {employee?.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={datosMockDesempeno}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" name="Puntuación" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const renderizarReporteEquipo = () => (
    <Card>
      <CardHeader>
        <CardTitle>Reporte de Desempeño del Equipo</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={datosMockDesempenoEquipo}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="productivity" name="Productividad" fill="#8884d8" />
            <Bar dataKey="quality" name="Calidad" fill="#82ca9d" />
            <Bar dataKey="teamwork" name="Trabajo en Equipo" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Reporte de Desempeño</DialogTitle>
        </DialogHeader>
        {employee ? renderizarReporteIndividual() : renderizarReporteEquipo()}
        <DialogFooter className="flex flex-wrap gap-2">
          <Button
            onClick={exportarAPDF}
            disabled={isExporting}
            className="bg-blue-700 hover:bg-blue-800"
          >
            Exportar como PDF
          </Button>
          <Button
            onClick={exportarAExcelConEstilos}
            disabled={isExporting}
            className="bg-green-700 hover:bg-green-800"
          >
            Exportar como Excel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
