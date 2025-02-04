"use client";

import { useState } from "react";
import {
  Plus,
  Plane,
  Pencil,
  Trash2,
  Bell,
  DollarSign,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EmployeesModal from "./EmployeesModal";
import ApprovalDialog from "./ApprovalDialog";
import SalaryManagementModal from "./SalaryManagementModal";
import PerformanceReportModal from "./PerformanceReportModal";
import AttendanceLog from "./AttendanceLog";

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  status: string;
  startDate: string;
  salary: number;
  team: string;
}

const initialEmployees: Employee[] = [
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
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
  const [isPerformanceReportOpen, setIsPerformanceReportOpen] = useState(false);
  const [isAttendanceLogOpen, setIsAttendanceLogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const router = useRouter();

  const handleSalaryClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsSalaryModalOpen(true);
  };

  const handleSalaryUpdate = (updatedEmployee: Employee) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === updatedEmployee.id
          ? { ...emp, salary: updatedEmployee.salary }
          : emp
      )
    );
  };

  const handlePerformanceReportClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setSelectedTeam(null);
    setIsPerformanceReportOpen(true);
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
      <CardContent>
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
          <Button
            onClick={() => setIsAttendanceLogOpen(true)}
            className="border border-red-500"
          >
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
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={() => handleSalaryClick(employee)}
                  >
                    <DollarSign className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={() => handlePerformanceReportClick(employee)}
                  >
                    <BarChart className="h-4 w-4" />
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
      <ApprovalDialog
        isOpen={isApprovalDialogOpen}
        onClose={() => setIsApprovalDialogOpen(false)}
      />
      <SalaryManagementModal
        isOpen={isSalaryModalOpen}
        onClose={() => setIsSalaryModalOpen(false)}
        employee={selectedEmployee}
        onSalaryUpdate={handleSalaryUpdate}
      />
      <PerformanceReportModal
        isOpen={isPerformanceReportOpen}
        onClose={() => setIsPerformanceReportOpen(false)}
        employee={selectedEmployee}
        team={selectedTeam}
      />
      <Dialog open={isAttendanceLogOpen} onOpenChange={setIsAttendanceLogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Attendance Log</DialogTitle>
          </DialogHeader>
          <AttendanceLog />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
