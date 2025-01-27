"use client";

import React, { useState } from "react";
import { Plus, Plane, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmployeesModal from "./EmployeesModal";

const employees = [
  {
    id: "EMP-001",
    name: "Carlos Pérez",
    position: "General Manager",
    department: "Management",
    status: "Active",
    startDate: "2015-01-15",
  },
  {
    id: "EMP-002",
    name: "María López",
    position: "Administrative/Financial Manager",
    department: "Administration",
    status: "Active",
    startDate: "2017-03-01",
  },
  {
    id: "EMP-003",
    name: "Jorge Castillo",
    position: "Operations Manager",
    department: "Operations",
    status: "Active",
    startDate: "2018-05-12",
  },
  {
    id: "EMP-004",
    name: "Luisa Sánchez",
    position: "BonAqua Manager",
    department: "Production",
    status: "Active",
    startDate: "2019-07-22",
  },
  {
    id: "EMP-005",
    name: "Ana Morales",
    position: "Administrative Assistant 3M/BonAqua",
    department: "Administration",
    status: "Active",
    startDate: "2020-08-15",
  },
  {
    id: "EMP-006",
    name: "Pedro Gutiérrez",
    position: "BonAqua Operator",
    department: "Production",
    status: "Active",
    startDate: "2021-02-10",
  },
  {
    id: "EMP-007",
    name: "Diego Vargas",
    position: "3M Operator",
    department: "Production",
    status: "Active",
    startDate: "2021-02-10",
  },
  {
    id: "EMP-008",
    name: "Clara Fernández",
    position: "Accounting Manager",
    department: "Finance",
    status: "Active",
    startDate: "2016-04-05",
  },
  {
    id: "EMP-009",
    name: "Laura Ortiz",
    position: "Receptionist",
    department: "Administration",
    status: "Active",
    startDate: "2022-06-25",
  },
  {
    id: "EMP-010",
    name: "Ricardo Gómez",
    position: "Workshop Manager",
    department: "Workshop",
    status: "Active",
    startDate: "2018-11-01",
  },
  {
    id: "EMP-011",
    name: "Juan Martínez",
    position: "Welder",
    department: "Workshop",
    status: "Active",
    startDate: "2020-09-14",
  },
  {
    id: "EMP-012",
    name: "Sofía Rojas",
    position: "Warehouse Manager",
    department: "Warehouse",
    status: "Active",
    startDate: "2017-02-28",
  },
  {
    id: "EMP-013",
    name: "Andrés Blanco",
    position: "Mechanics Manager",
    department: "Mechanics",
    status: "Active",
    startDate: "2019-10-10",
  },
  ...Array.from({ length: 19 }, (_, i) => ({
    id: `EMP-${14 + i}`,
    name: `Assistant ${i + 1}`,
    position: "Operator Assistant",
    department: "Production",
    status: "Active",
    startDate: `2023-${(i % 12) + 1}-15`,
  })),
];

export default function EmployeesTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employees</CardTitle>
        <CardDescription>
          Manage employees, their positions, and departments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end space-x-4 mb-4">
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Employee
          </Button>
          <Button onClick={() => router.push("/admin/employees/vacations")}>
            <Plane className="mr-2 h-4 w-4" /> Vacations
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.status}</TableCell>
                <TableCell>{employee.startDate}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <EmployeesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Card>
  );
}
