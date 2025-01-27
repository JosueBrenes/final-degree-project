"use client";

import React, { useState } from "react";
import { FileText, FileSpreadsheet, Eye, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ReportsDashboard() {
  const [reports, setReports] = useState([
    {
      id: "REP-001",
      title: "Sales Report",
      date: "2023-12-01",
      format: "PDF",
      status: "Generated",
    },
    {
      id: "REP-002",
      title: "Employee Performance",
      date: "2023-12-02",
      format: "Excel",
      status: "Pending",
    },
    {
      id: "REP-003",
      title: "Annual Summary",
      date: "2023-12-03",
      format: "PDF",
      status: "Generated",
    },
  ]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <CardTitle>Reports</CardTitle>
          <div className="flex flex-wrap gap-4">
            <Button variant="destructive">
              <FileText className="mr-2 h-4 w-4" /> Generate PDF
            </Button>
            <Button variant="secondary">
              <FileSpreadsheet className="mr-2 h-4 w-4" /> Generate Excel
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">Generated Reports</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.id}</TableCell>
                <TableCell>{report.title}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.format}</TableCell>
                <TableCell>
                  <span
                    className={
                      report.status === "Generated"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }
                  >
                    {report.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
