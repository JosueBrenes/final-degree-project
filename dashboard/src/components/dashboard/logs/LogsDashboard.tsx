"use client";

import React, { useState } from "react";
import { Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const logs = [
  {
    id: "LOG-001",
    user: "Admin",
    action: "Created new user",
    date: "2023-12-01",
    severity: "Info",
  },
  {
    id: "LOG-002",
    user: "John Doe",
    action: "Updated settings",
    date: "2023-12-02",
    severity: "Warning",
  },
  {
    id: "LOG-003",
    user: "Jane Smith",
    action: "Deleted a record",
    date: "2023-12-03",
    severity: "Critical",
  },
  {
    id: "LOG-004",
    user: "System",
    action: "Backup completed",
    date: "2023-12-04",
    severity: "Info",
  },
  {
    id: "LOG-005",
    user: "Admin",
    action: "Reset password",
    date: "2023-12-05",
    severity: "Warning",
  },
];

export default function LogsDashboard() {
  const [filters, setFilters] = useState({
    user: "",
    severity: "All", // Changed default value here
    date: "",
  });

  const handleFilterChange = (name: string, value: string) => {
    setFilters({ ...filters, [name]: value });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Logs</CardTitle>
          <Button>
            <Filter className="mr-2 h-4 w-4" /> Apply Filters
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="user">User</Label>
            <Input
              id="user"
              placeholder="Search by user"
              value={filters.user}
              onChange={(e) => handleFilterChange("user", e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="severity">Severity</Label>
            <Select
              value={filters.severity}
              onValueChange={(value) => handleFilterChange("severity", value)}
            >
              <SelectTrigger id="severity">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Info">Info</SelectItem>
                <SelectItem value="Warning">Warning</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={filters.date}
              onChange={(e) => handleFilterChange("date", e.target.value)}
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Log ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Severity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.id}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.date}</TableCell>
                <TableCell>
                  <span
                    className={
                      log.severity === "Critical"
                        ? "text-red-500"
                        : log.severity === "Warning"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }
                  >
                    {log.severity}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
