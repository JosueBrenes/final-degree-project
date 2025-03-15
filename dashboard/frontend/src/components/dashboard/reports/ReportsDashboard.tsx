"use client";

import { useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  Eye,
  Download,
  Archive,
  CalendarIcon,
} from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import ReportScheduler from "./ReportScheduler";

interface Report {
  id: string;
  title: string;
  date: string;
  format: "PDF" | "Excel";
  status: "Generated" | "Pending";
}

export default function ReportsDashboard() {
  const [activeTab, setActiveTab] = useState("recent");
  const [date, setDate] = useState<Date>();

  const allReports: Report[] = [
    // Recent Reports (Last Month)
    {
      id: "REP-001",
      title: "Sales Report",
      date: "2024-02-20",
      format: "PDF",
      status: "Generated",
    },
    {
      id: "REP-002",
      title: "Employee Performance",
      date: "2024-02-15",
      format: "Excel",
      status: "Generated",
    },
    {
      id: "REP-003",
      title: "Monthly Summary",
      date: "2024-02-01",
      format: "PDF",
      status: "Generated",
    },
    // Archived Reports
    {
      id: "REP-004",
      title: "Annual Report 2023",
      date: "2023-12-31",
      format: "PDF",
      status: "Generated",
    },
    {
      id: "REP-005",
      title: "Q4 Performance",
      date: "2023-12-15",
      format: "Excel",
      status: "Generated",
    },
  ];

  // Filter reports based on date and active tab
  const filteredReports = allReports.filter((report) => {
    const reportDate = new Date(report.date);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    if (date) {
      const searchDate = date.toISOString().split("T")[0];
      return report.date === searchDate;
    }

    if (activeTab === "recent") {
      return reportDate >= oneMonthAgo;
    } else {
      return reportDate < oneMonthAgo;
    }
  });

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
            <ReportScheduler /> 
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recent" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger
                value="recent"
                onClick={() => setActiveTab("recent")}
              >
                Recent Reports
              </TabsTrigger>
              <TabsTrigger
                value="archived"
                onClick={() => setActiveTab("archived")}
              >
                <Archive className="mr-2 h-4 w-4" />
                Archived Reports
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Search by date..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {date && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDate(undefined)}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          <TabsContent value="recent" className="space-y-4">
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
                {filteredReports.map((report) => (
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
                {filteredReports.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No reports found for the selected criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="archived" className="space-y-4">
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
                {filteredReports.map((report) => (
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
                {filteredReports.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No archived reports found for the selected criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
