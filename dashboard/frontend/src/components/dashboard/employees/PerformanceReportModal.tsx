import React, { useState } from "react";
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

  const handleExport = (format: "pdf" | "excel") => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      console.log(
        `Exporting ${team ? "team" : "individual"} report in ${format} format`
      );
      setIsExporting(false);
      onClose();
    }, 2000);
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
          <Button onClick={() => handleExport("pdf")} disabled={isExporting}>
            Export as PDF
          </Button>
          <Button onClick={() => handleExport("excel")} disabled={isExporting}>
            Export as Excel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
