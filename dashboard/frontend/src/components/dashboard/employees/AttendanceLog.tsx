"use client";

import React, { useState } from "react";
import {
  Plus,
  Plane,
  Trash2,
  Bell,
  BarChart,
  ClipboardList,
} from "lucide-react";
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
import ApprovalDialog from "./ApprovalDialog";
import PerformanceReportModal from "./PerformanceReportModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  clockIn: string | null;
  clockOut: string | null;
}

const initialEmployees = [
  {
    id: "EMP-001",
    name: "Carlos Pérez",
    position: "General Manager",
    department: "Management",
    status: "Active",
    startDate: "2015-01-15",
    salary: 120000,
    team: "Management",
  },
  {
    id: "EMP-002",
    name: "María López",
    position: "Administrative/Financial Manager",
    department: "Administration",
    status: "Active",
    startDate: "2017-03-01",
    salary: 95000,
    team: "Administration",
  },
  {
    id: "EMP-003",
    name: "Jorge Castillo",
    position: "Operations Manager",
    department: "Operations",
    status: "Active",
    startDate: "2018-05-12",
    salary: 90000,
    team: "Operations",
  },
  {
    id: "EMP-004",
    name: "Luisa Sánchez",
    position: "BonAqua Manager",
    department: "Production",
    status: "Active",
    startDate: "2019-07-22",
    salary: 85000,
    team: "Production",
  },
  {
    id: "EMP-005",
    name: "Ana Morales",
    position: "Administrative Assistant 3M/BonAqua",
    department: "Administration",
    status: "Active",
    startDate: "2020-08-15",
    salary: 45000,
    team: "Administration",
  },
  {
    id: "EMP-006",
    name: "Pedro Gutiérrez",
    position: "BonAqua Operator",
    department: "Production",
    status: "Active",
    startDate: "2021-02-10",
    salary: 50000,
    team: "Production",
  },
  {
    id: "EMP-007",
    name: "Diego Vargas",
    position: "3M Operator",
    department: "Production",
    status: "Active",
    startDate: "2021-02-10",
    salary: 50000,
    team: "Production",
  },
  {
    id: "EMP-008",
    name: "Clara Fernández",
    position: "Accounting Manager",
    department: "Finance",
    status: "Active",
    startDate: "2016-04-05",
    salary: 80000,
    team: "Finance",
  },
  {
    id: "EMP-009",
    name: "Laura Ortiz",
    position: "Receptionist",
    department: "Administration",
    status: "Active",
    startDate: "2022-06-25",
    salary: 40000,
    team: "Administration",
  },
  {
    id: "EMP-010",
    name: "Ricardo Gómez",
    position: "Workshop Manager",
    department: "Workshop",
    status: "Active",
    startDate: "2018-11-01",
    salary: 75000,
    team: "Workshop",
  },
  {
    id: "EMP-011",
    name: "Juan Martínez",
    position: "Welder",
    department: "Workshop",
    status: "Active",
    startDate: "2020-09-14",
    salary: 60000,
    team: "Workshop",
  },
  {
    id: "EMP-012",
    name: "Sofía Rojas",
    position: "Warehouse Manager",
    department: "Warehouse",
    status: "Active",
    startDate: "2017-02-28",
    salary: 70000,
    team: "Warehouse",
  },
  {
    id: "EMP-013",
    name: "Andrés Blanco",
    position: "Mechanics Manager",
    department: "Mechanics",
    status: "Active",
    startDate: "2019-10-10",
    salary: 70000,
    team: "Mechanics",
  },
  ...Array.from({ length: 19 }, (_, i) => ({
    id: `EMP-${14 + i}`,
    name: `Assistant ${i + 1}`,
    position: "Operator Assistant",
    department: "Production",
    status: "Active",
    startDate: `2023-${(i % 12) + 1}-15`,
    salary: 48000,
    team: "Production",
  })),
];

export default function EmployeesTable() {
  const [employees] = useState(initialEmployees);
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [isPerformanceReportOpen, setIsPerformanceReportOpen] = useState(false);
  const [isAttendanceLogOpen, setIsAttendanceLogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const router = useRouter();

  const handleClockIn = (employeeId: string, employeeName: string) => {
    const existingRecord = attendanceRecords.find(
      (record) => record.employeeId === employeeId && !record.clockOut
    );

    if (existingRecord) {
      alert(`El empleado ${employeeName} ya ha registrado su entrada.`);
      return;
    }

    const newRecord: AttendanceRecord = {
      id: `ATT-${Date.now()}`,
      employeeId,
      employeeName,
      clockIn: new Date().toISOString(),
      clockOut: null,
    };

    setAttendanceRecords((prevRecords) => [...prevRecords, newRecord]);
    console.log(`Empleado ${employeeName} ha registrado su entrada.`);
  };

  const handleClockOut = (recordId: string) => {
    setAttendanceRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === recordId
          ? { ...record, clockOut: new Date().toISOString() }
          : record
      )
    );
    console.log(`El empleado ha registrado su salida.`);
  };

  const handleTeamPerformanceReportClick = (team: string) => {
    setSelectedTeam(team);
    setSelectedEmployee(null);
    setIsPerformanceReportOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employees</CardTitle>
        <CardDescription>
          Manage employees, their positions, departments, and performance.
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[600px]">
        <div className="flex justify-end space-x-4 mb-4">
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Employee
          </Button>
          <Button onClick={() => setIsApprovalDialogOpen(true)}>
            <Bell className="mr-2 h-4 w-4" /> Approval Requests
          </Button>
          <Button onClick={() => router.push("/admin/employees/vacations")}>
            <Plane className="mr-2 h-4 w-4" /> Vacations
          </Button>
          <Button onClick={() => setIsAttendanceLogOpen(true)}>
            <ClipboardList className="mr-2 h-4 w-4" /> Attendance Log
          </Button>
          <Button onClick={() => handleTeamPerformanceReportClick("All")}>
            <BarChart className="mr-2 h-4 w-4" /> Team Performance
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
              <TableHead>Salary</TableHead>
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
                <TableCell>${employee.salary.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="mr-2"
                        onClick={() =>
                          handleClockIn(employee.id, employee.name)
                        }
                      >
                        <ClipboardList className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Registrar Entrada</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleClockOut(employee.id)}
                      >
                        <ClipboardList className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Registrar Salida</TooltipContent>
                  </Tooltip>
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
        onSave={(employee) => {
          console.log("Employee saved:", employee);
        }}
      />
      <ApprovalDialog
        isOpen={isApprovalDialogOpen}
        onClose={() => setIsApprovalDialogOpen(false)}
      />
      <PerformanceReportModal
        isOpen={isPerformanceReportOpen}
        onClose={() => setIsPerformanceReportOpen(false)}
        employee={selectedEmployee}
        team={selectedTeam}
      />
      <Dialog open={isAttendanceLogOpen} onOpenChange={setIsAttendanceLogOpen}>
        <DialogContent className="sm:max-w-[800px] overflow-auto max-h-[400px]">
          <DialogHeader>
            <DialogTitle>Attendance Log</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empleado</TableHead>
                <TableHead>Entrada</TableHead>
                <TableHead>Salida</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.employeeName}</TableCell>
                  <TableCell>
                    {record.clockIn
                      ? new Date(record.clockIn).toLocaleString()
                      : "--"}
                  </TableCell>
                  <TableCell>
                    {record.clockOut
                      ? new Date(record.clockOut).toLocaleString()
                      : "--"}
                  </TableCell>
                  <TableCell>
                    {!record.clockOut ? (
                      <Button onClick={() => handleClockOut(record.id)}>
                        Registrar Salida
                      </Button>
                    ) : (
                      <span>Completo</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
