"use client";

import React from "react";
import {
  Users,
  FileText,
  ClipboardCheck,
  Package,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-auto">
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Empleados</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cotizaciones Pendientes
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">35</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tareas Completadas
              </CardTitle>
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Artículos en Inventario
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">400</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Tareas Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Circle className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Revisar informes mensuales</span>
                </li>
                <li className="flex items-center">
                  <Circle className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Actualizar inventario de seguridad</span>
                </li>
                <li className="flex items-center">
                  <Circle className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Preparar presentación para la junta directiva</span>
                </li>
                <li className="flex items-center">
                  <Circle className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Coordinar capacitación de nuevos empleados</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Proyectos en Curso</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  <span>Implementación de nuevo sistema ERP</span>
                </li>
                <li className="flex items-center">
                  <Circle className="h-4 w-4 mr-2 text-yellow-500" />
                  <span>Expansión de la planta de producción</span>
                </li>
                <li className="flex items-center">
                  <Circle className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Desarrollo de nueva línea de productos</span>
                </li>
                <li className="flex items-center">
                  <Circle className="h-4 w-4 mr-2 text-red-500" />
                  <span>Optimización de la cadena de suministro</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente de Empleados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Carlos Pérez completó la capacitación</span>
                  <span className="text-green-500">Hoy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>María López envió un informe</span>
                  <span className="text-muted-foreground">Hace 2 días</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Actualizaciones de Inventario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Nuevos cascos añadidos al equipo de seguridad</span>
                  <span className="text-green-500">+30</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Bajo stock en Cintas Transportadoras</span>
                  <span className="text-red-500">-10</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rendimiento de Empleados</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empleado</TableHead>
                  <TableHead>Tareas Completadas</TableHead>
                  <TableHead>Satisfacción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Carlos Pérez</TableCell>
                  <TableCell>95%</TableCell>
                  <TableCell className="text-green-500">Alta</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>María López</TableCell>
                  <TableCell>88%</TableCell>
                  <TableCell className="text-yellow-500">Media</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
