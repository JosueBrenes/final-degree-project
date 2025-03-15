"use client";

import React from "react";
import { Check, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const vacationRequests = [
  {
    id: "VAC-001",
    employee: "Carlos Pérez",
    startDate: "2023-12-15",
    endDate: "2023-12-22",
    daysRequested: 7,
    status: "Pending",
  },
  {
    id: "VAC-002",
    employee: "María López",
    startDate: "2024-01-10",
    endDate: "2024-01-15",
    daysRequested: 5,
    status: "Approved",
  },
  {
    id: "VAC-003",
    employee: "Jorge Castillo",
    startDate: "2023-12-01",
    endDate: "2023-12-05",
    daysRequested: 4,
    status: "Rejected",
  },
];

const VacationsTable = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Vacations</CardTitle>
        <CardDescription>
          Manage vacation requests, including approvals and cancellations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Days Requested</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vacationRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.employee}</TableCell>
                <TableCell>{request.startDate}</TableCell>
                <TableCell>{request.endDate}</TableCell>
                <TableCell>{request.daysRequested}</TableCell>
                <TableCell>
                  <span
                    className={
                      request.status === "Approved"
                        ? "text-green-500"
                        : request.status === "Rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }
                  >
                    {request.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-500 hover:text-green-600 hover:bg-green-100"
                      title="Approve"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-100"
                      title="Reject"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default VacationsTable;
