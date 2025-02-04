"use client";

import React, { useState } from "react";
import { Calculator, FileText, Download } from "lucide-react";
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

export default function PayrollDashboard() {
  const [payroll] = useState([
    {
      id: "EMP-001",
      name: "Carlos Pérez",
      position: "General Manager",
      salary: 5000,
      bonus: 200,
      deductions: 300,
      netPay: 4900,
    },
    {
      id: "EMP-002",
      name: "María López",
      position: "Administrative Manager",
      salary: 4000,
      bonus: 150,
      deductions: 200,
      netPay: 3950,
    },
    {
      id: "EMP-003",
      name: "Jorge Castillo",
      position: "Operations Manager",
      salary: 4500,
      bonus: 250,
      deductions: 300,
      netPay: 4450,
    },
  ]);

  const totalSalary = payroll.reduce((acc, emp) => acc + emp.salary, 0);
  const totalBonus = payroll.reduce((acc, emp) => acc + emp.bonus, 0);
  const totalDeductions = payroll.reduce((acc, emp) => acc + emp.deductions, 0);
  const totalNetPay = payroll.reduce((acc, emp) => acc + emp.netPay, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payroll Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-muted-foreground">
                Total Salary
              </dt>
              <dd className="text-2xl font-semibold">
                ${totalSalary.toFixed(2)}
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-muted-foreground">
                Total Bonuses
              </dt>
              <dd className="text-2xl font-semibold">
                ${totalBonus.toFixed(2)}
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-muted-foreground">
                Total Deductions
              </dt>
              <dd className="text-2xl font-semibold">
                ${totalDeductions.toFixed(2)}
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-muted-foreground">
                Total Net Pay
              </dt>
              <dd className="text-2xl font-semibold">
                ${totalNetPay.toFixed(2)}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <div className="flex flex-wrap justify-center gap-4">
        <Button className="w-48">
          <Calculator className="mr-2 h-4 w-4" /> Calculate Payroll
        </Button>
        <Button variant="destructive" className="w-48">
          <FileText className="mr-2 h-4 w-4" /> Generate PDF
        </Button>
        <Button variant="secondary" className="w-48">
          <Download className="mr-2 h-4 w-4" /> Export to Excel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Payroll Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Bonus</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Pay</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payroll.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>${employee.salary.toFixed(2)}</TableCell>
                  <TableCell>${employee.bonus.toFixed(2)}</TableCell>
                  <TableCell>${employee.deductions.toFixed(2)}</TableCell>
                  <TableCell className="font-bold">
                    ${employee.netPay.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Download Receipt"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
