"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function VacationRequest() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Solicitar Vacaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employee-name">Nombre del Empleado</Label>
              <Input
                id="employee-name"
                placeholder="Ingrese su nombre completo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-date">Fecha de Inicio</Label>
              <Input type="date" id="start-date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">Fecha de Fin</Label>
              <Input type="date" id="end-date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Motivo</Label>
              <Textarea
                id="reason"
                placeholder="Escriba el motivo de la solicitud"
                rows={4}
              />
            </div>
            <Button className="w-full">Enviar Solicitud</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estado de Solicitudes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Solicitud</TableHead>
                <TableHead>Empleado</TableHead>
                <TableHead>Fecha Inicio</TableHead>
                <TableHead>Fecha Fin</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>VAC-001</TableCell>
                <TableCell>Carlos Pérez</TableCell>
                <TableCell>2024-01-10</TableCell>
                <TableCell>2024-01-20</TableCell>
                <TableCell>
                  <Badge variant="default">Pendiente</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>VAC-002</TableCell>
                <TableCell>María López</TableCell>
                <TableCell>2024-02-01</TableCell>
                <TableCell>2024-02-10</TableCell>
                <TableCell>
                  <Badge variant="default">Aprobado</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>VAC-003</TableCell>
                <TableCell>Jorge Castillo</TableCell>
                <TableCell>2024-03-01</TableCell>
                <TableCell>2024-03-10</TableCell>
                <TableCell>
                  <Badge variant="destructive">Rechazado</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
