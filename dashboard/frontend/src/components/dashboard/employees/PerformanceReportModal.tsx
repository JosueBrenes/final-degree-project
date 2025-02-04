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

interface PerformanceReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: any;
  team: string | null;
}

const mockPerformanceData = [
  { name: "Productivity", score: 85 },
  { name: "Quality", score: 90 },
  { name: "Teamwork", score: 95 },
  { name: "Initiative", score: 80 },
  { name: "Communication", score: 88 },
];

const mockTeamPerformanceData = [
  { name: "Management", productivity: 90, quality: 95, teamwork: 85 },
  { name: "Administration", productivity: 85, quality: 88, teamwork: 92 },
  { name: "Operations", productivity: 92, quality: 87, teamwork: 90 },
  { name: "Production", productivity: 88, quality: 90, teamwork: 86 },
];

export default function PerformanceReportModal({
  isOpen,
  onClose,
  employee,
  team,
}: PerformanceReportModalProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = () => {
    setIsExporting(true);
    const data = employee ? mockPerformanceData : mockTeamPerformanceData;
    const headers = Object.keys(data[0]).join(",");
    const csvContent = [
      headers,
      ...data.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `${employee ? "Individual" : "Team"}_Performance_Report.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setIsExporting(false);
  };

  const exportToPDF = () => {
    setIsExporting(true);
    const data = employee ? mockPerformanceData : mockTeamPerformanceData;
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Create header
    const headerRow = document.createElement("tr");
    Object.keys(data[0]).forEach((key) => {
      const th = document.createElement("th");
      th.textContent = key;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create body
    data.forEach((row) => {
      const tr = document.createElement("tr");
      Object.values(row).forEach((value) => {
        const td = document.createElement("td");
        td.textContent = String(value);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
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
      "<html><head><title>Performance Report</title></head><body>"
    );
    win!.document.write(
      `<h1>${employee ? "Individual" : "Team"} Performance Report</h1>`
    );
    win!.document.head.appendChild(style);
    win!.document.body.appendChild(table);
    win!.document.write("</body></html>");
    win!.document.close();
    win!.print();
    setIsExporting(false);
  };

  const renderIndividualReport = () => (
    <Card>
      <CardHeader>
        <CardTitle>{employee.name}'s Performance Report</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const renderTeamReport = () => (
    <Card>
      <CardHeader>
        <CardTitle>Team Performance Report</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockTeamPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="productivity" fill="#8884d8" />
            <Bar dataKey="quality" fill="#82ca9d" />
            <Bar dataKey="teamwork" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Performance Report</DialogTitle>
        </DialogHeader>
        {employee ? renderIndividualReport() : renderTeamReport()}
        <DialogFooter>
          <Button onClick={exportToPDF} disabled={isExporting}>
            Export as PDF
          </Button>
          <Button onClick={exportToCSV} disabled={isExporting}>
            Export as CSV
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
