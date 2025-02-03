"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye } from "lucide-react";

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  clockIn: string | null;
  clockOut: string | null;
}

const initialRecords: AttendanceRecord[] = [
  { id: "ATT-001", employeeId: "EMP-001", employeeName: "Carlos Pérez", clockIn: "2025-02-01T08:00:00", clockOut: "2025-02-01T17:00:00" },
  { id: "ATT-002", employeeId: "EMP-002", employeeName: "María López", clockIn: "2025-02-01T08:15:00", clockOut: "2025-02-01T16:45:00" },
  { id: "ATT-003", employeeId: "EMP-003", employeeName: "Jorge Castillo", clockIn: "2025-02-01T07:50:00", clockOut: "2025-02-01T17:10:00" },
];

export default function AttendanceReport() {
  const [attendanceRecords] = useState(initialRecords);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<AttendanceRecord | null>(null);

  const handleViewReport = (record: AttendanceRecord) => {
    setSelectedEmployee(record);
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Report</CardTitle>
        <CardDescription>View the attendance records of employees.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Employee Name</TableHead>
              <TableHead>Check-In Time</TableHead>
              <TableHead>Check-Out Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.id}</TableCell>
                <TableCell>{record.employeeName}</TableCell>
                <TableCell>{record.clockIn ? new Date(record.clockIn).toLocaleString() : "--"}</TableCell>
                <TableCell>{record.clockOut ? new Date(record.clockOut).toLocaleString() : "--"}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewReport(record)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Attendance Details</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div>
              <p><strong>Employee:</strong> {selectedEmployee.employeeName}</p>
              <p><strong>Check-In:</strong> {selectedEmployee.clockIn ? new Date(selectedEmployee.clockIn).toLocaleString() : "Not Checked In"}</p>
              <p><strong>Check-Out:</strong> {selectedEmployee.clockOut ? new Date(selectedEmployee.clockOut).toLocaleString() : "Not Checked Out"}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
