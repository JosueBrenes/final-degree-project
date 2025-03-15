"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RegistroAsistencia {
  id: string;
  empleadoId: string;
  empleadoNombre: string;
  departamento: string;
  entrada: string | null;
  salida: string | null;
  estado: "presente" | "ausente" | "tarde" | "completado";
}

// Datos de ejemplo
const registrosIniciales: RegistroAsistencia[] = [
  {
    id: "REG-001",
    empleadoId: "EMP-001",
    empleadoNombre: "Carlos Pérez",
    departamento: "Gerencia",
    entrada: "2024-03-11T08:00:00",
    salida: "2024-03-11T17:00:00",
    estado: "completado",
  },
  {
    id: "REG-002",
    empleadoId: "EMP-002",
    empleadoNombre: "María López",
    departamento: "Administración",
    entrada: "2024-03-11T08:15:00",
    salida: null,
    estado: "presente",
  },
  {
    id: "REG-003",
    empleadoId: "EMP-003",
    empleadoNombre: "Jorge Castillo",
    departamento: "Operaciones",
    entrada: "2024-03-11T08:45:00",
    salida: null,
    estado: "tarde",
  },
  // Agrega más registros según necesites
];

export default function AttendanceLog() {
  const [registros, setRegistros] =
    useState<RegistroAsistencia[]>(registrosIniciales);
  const [filtro, setFiltro] = useState("");
  const [departamento, setDepartamento] = useState("");

  const formatearHora = (fecha: string) => {
    return new Date(fecha).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "presente":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-green-500" />
            Presente
          </Badge>
        );
      case "ausente":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <XCircle className="h-3 w-3 text-red-500" />
            Ausente
          </Badge>
        );
      case "tarde":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-amber-500" />
            Tarde
          </Badge>
        );
      case "completado":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-blue-500" />
            Completado
          </Badge>
        );
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  const registrosFiltrados = registros.filter((registro) => {
    const coincideFiltro =
      registro.empleadoNombre.toLowerCase().includes(filtro.toLowerCase()) ||
      registro.empleadoId.toLowerCase().includes(filtro.toLowerCase());
    const coincideDepartamento =
      !departamento || registro.departamento === departamento;
    return coincideFiltro && coincideDepartamento;
  });

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold">
          Registro de Asistencia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o ID..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={departamento} onValueChange={setDepartamento}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrar por departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los departamentos</SelectItem>
              <SelectItem value="Gerencia">Gerencia</SelectItem>
              <SelectItem value="Administración">Administración</SelectItem>
              <SelectItem value="Operaciones">Operaciones</SelectItem>
              <SelectItem value="Producción">Producción</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            Hoy
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-purple-500" />
            Filtros
          </Button>
        </div>

        <ScrollArea className="h-[400px] rounded-md border">
          <Table>
            <TableHeader className="bg-muted/50 sticky top-0">
              <TableRow>
                <TableHead>Empleado</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Entrada</TableHead>
                <TableHead>Salida</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrosFiltrados.map((registro) => (
                <TableRow key={registro.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {registro.empleadoNombre}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {registro.empleadoId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{registro.departamento}</Badge>
                  </TableCell>
                  <TableCell>
                    {registro.entrada && formatearFecha(registro.entrada)}
                  </TableCell>
                  <TableCell>
                    {registro.entrada && formatearHora(registro.entrada)}
                  </TableCell>
                  <TableCell>
                    {registro.salida ? formatearHora(registro.salida) : "--:--"}
                  </TableCell>
                  <TableCell>{getEstadoBadge(registro.estado)}</TableCell>
                  <TableCell className="text-right">
                    {!registro.salida && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Clock className="h-4 w-4 text-green-500" />
                        Registrar Salida
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div>Mostrando {registrosFiltrados.length} registros</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 text-green-500" />
              <span>Presente</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 text-amber-500" />
              <span>Tarde</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3 text-blue-500" />
              <span>Completado</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="h-3 w-3 text-red-500" />
              <span>Ausente</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
