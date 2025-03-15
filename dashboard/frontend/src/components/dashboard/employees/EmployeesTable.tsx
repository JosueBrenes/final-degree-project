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
  AlertTriangle,
  Clock,
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
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  salaryReview?: boolean;
}

const initialEmployees: Employee[] = [
  {
    id: "EMP-001",
    name: "Carlos Pérez",
    position: "Gerente General",
    department: "Gerencia",
    status: "Activo",
    startDate: "2015-01-15",
    salary: 120000,
    team: "Gerencia",
  },
  {
    id: "EMP-002",
    name: "María López",
    position: "Gerente Administrativo/Financiero",
    department: "Administración",
    status: "Activo",
    startDate: "2017-03-01",
    salary: 95000,
    team: "Administración",
  },
  {
    id: "EMP-003",
    name: "Jorge Castillo",
    position: "Gerente de Operaciones",
    department: "Operaciones",
    status: "Activo",
    startDate: "2018-05-12",
    salary: 90000,
    team: "Operaciones",
  },
  {
    id: "EMP-004",
    name: "Luisa Sánchez",
    position: "Gerente BonAqua",
    department: "Producción",
    status: "Activo",
    startDate: "2019-07-22",
    salary: 85000,
    team: "Producción",
  },
  {
    id: "EMP-005",
    name: "Ana Morales",
    position: "Asistente Administrativo 3M/BonAqua",
    department: "Administración",
    status: "Activo",
    startDate: "2020-08-15",
    salary: 45000,
    team: "Administración",
  },
  {
    id: "EMP-006",
    name: "Pedro Gutiérrez",
    position: "Operador BonAqua",
    department: "Producción",
    status: "Activo",
    startDate: "2021-02-10",
    salary: 50000,
    team: "Producción",
  },
  {
    id: "EMP-007",
    name: "Diego Vargas",
    position: "Operador 3M",
    department: "Producción",
    status: "Activo",
    startDate: "2021-02-10",
    salary: 50000,
    team: "Producción",
    salaryReview: true,
  },
  {
    id: "EMP-008",
    name: "Clara Fernández",
    position: "Gerente de Contabilidad",
    department: "Finanzas",
    status: "Activo",
    startDate: "2016-04-05",
    salary: 80000,
    team: "Finanzas",
  },
  {
    id: "EMP-009",
    name: "Laura Ortiz",
    position: "Recepcionista",
    department: "Administración",
    status: "Activo",
    startDate: "2022-06-25",
    salary: 40000,
    team: "Administración",
  },
  {
    id: "EMP-010",
    name: "Ricardo Gómez",
    position: "Gerente de Taller",
    department: "Taller",
    status: "Activo",
    startDate: "2018-11-01",
    salary: 75000,
    team: "Taller",
  },
  {
    id: "EMP-011",
    name: "Juan Martínez",
    position: "Soldador",
    department: "Taller",
    status: "Activo",
    startDate: "2020-09-14",
    salary: 60000,
    team: "Taller",
  },
  {
    id: "EMP-012",
    name: "Sofía Rojas",
    position: "Gerente de Almacén",
    department: "Almacén",
    status: "Activo",
    startDate: "2017-02-28",
    salary: 70000,
    team: "Almacén",
  },
  {
    id: "EMP-013",
    name: "Andrés Blanco",
    position: "Gerente de Mecánica",
    department: "Mecánica",
    status: "Activo",
    startDate: "2019-10-10",
    salary: 70000,
    team: "Mecánica",
  },
  ...Array.from({ length: 19 }, (_, i) => ({
    id: `EMP-${14 + i}`,
    name: `Asistente ${i + 1}`,
    position: "Asistente de Operador",
    department: "Producción",
    status: "Activo",
    startDate: `2023-${(i % 12) + 1}-15`,
    salary: 48000,
    team: "Producción",
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
  const [showSalaryAlert, setShowSalaryAlert] = useState(false);
  const router = useRouter();

  const handleSalaryClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsSalaryModalOpen(true);
  };

  const handleSalaryUpdate = (updatedEmployee: Employee) => {
    const newEmployees = employees.map((emp) =>
      emp.id === updatedEmployee.id
        ? { ...emp, salary: updatedEmployee.salary, salaryReview: true }
        : emp
    );
    setEmployees(newEmployees);
    setShowSalaryAlert(true);

    // Ocultar la alerta después de 5 segundos
    setTimeout(() => {
      setShowSalaryAlert(false);
    }, 5000);
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

  const pendingReviewCount = employees.filter((emp) => emp.salaryReview).length;

  return (
    <Card className="shadow-md">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">Empleados</CardTitle>
            <CardDescription>
              Gestione empleados, sus posiciones, departamentos y desempeño.
            </CardDescription>
          </div>
          {pendingReviewCount > 0 && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-amber-500" />
              {pendingReviewCount}{" "}
              {pendingReviewCount === 1 ? "revisión" : "revisiones"} pendiente
              {pendingReviewCount !== 1 ? "s" : ""}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {showSalaryAlert && (
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertTitle>Cambio de salario en revisión</AlertTitle>
            <AlertDescription>
              El cambio de salario ha sido registrado y está pendiente de
              aprobación por Recursos Humanos. El proceso puede tardar hasta 48
              horas hábiles.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-wrap justify-end gap-3 mb-6">
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Agregar Empleado
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsApprovalDialogOpen(true)}
          >
            <Bell className="mr-2 h-4 w-4 text-amber-500" /> Solicitudes de
            Aprobación
            {pendingReviewCount > 0 && (
              <Badge variant="outline" className="ml-2">
                {pendingReviewCount}
              </Badge>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/admin/employees/vacations")}
          >
            <Plane className="mr-2 h-4 w-4 text-blue-500" /> Vacaciones
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsAttendanceLogOpen(true)}
          >
            <ClipboardList className="mr-2 h-4 w-4 text-green-500" /> Registro
            de Asistencia
          </Button>
          <Button
            variant="outline"
            onClick={() => handleTeamPerformanceReportClick("All")}
          >
            <BarChart className="mr-2 h-4 w-4 text-purple-500" /> Desempeño del
            Equipo
          </Button>
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Nombre</TableHead>
                <TableHead className="font-semibold">Posición</TableHead>
                <TableHead className="font-semibold">Departamento</TableHead>
                <TableHead className="font-semibold">Estado</TableHead>
                <TableHead className="font-semibold">Fecha de Inicio</TableHead>
                <TableHead className="font-semibold">Salario</TableHead>
                <TableHead className="text-right font-semibold">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell
                    className="max-w-[200px] truncate"
                    title={employee.position}
                  >
                    {employee.position}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{employee.department}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{employee.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(employee.startDate).toLocaleDateString("es-ES")}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      ${employee.salary.toLocaleString()}
                      {employee.salaryReview && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Clock className="h-4 w-4 text-amber-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>En revisión por Recursos Humanos</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="mr-1">
                            <Pencil className="h-4 w-4 text-slate-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Editar empleado</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="mr-1"
                            onClick={() => handleSalaryClick(employee)}
                            disabled={employee.salaryReview}
                          >
                            <DollarSign className="h-4 w-4 text-blue-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {employee.salaryReview
                              ? "Salario en revisión"
                              : "Gestionar salario"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="mr-1"
                            onClick={() =>
                              handlePerformanceReportClick(employee)
                            }
                          >
                            <BarChart className="h-4 w-4 text-purple-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Ver informe de desempeño</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Eliminar empleado</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="border-t py-3 flex justify-between">
        <div className="text-sm text-slate-500">
          Mostrando {employees.length} empleados
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-amber-500" />
            <span>En revisión por RRHH</span>
          </div>
        </div>
      </CardFooter>
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
            <DialogTitle>Registro de Asistencia</DialogTitle>
          </DialogHeader>
          <AttendanceLog />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
