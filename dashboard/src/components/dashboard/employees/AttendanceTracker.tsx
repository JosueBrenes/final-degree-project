"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  clockIn: string | null;
  clockOut: string | null;
}

const AttendanceTracker: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  const handleClockIn = (employeeId: string, employeeName: string) => {
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
        record.id === recordId ? { ...record, clockOut: new Date().toISOString() } : record
      )
    );
    console.log(`El empleado ha registrado su salida.`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro Automático de Asistencia</CardTitle>
        <CardDescription>Registra la entrada y salida de los empleados.</CardDescription>
      </CardHeader>
      <CardContent>
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
                <TableCell>{record.clockIn ? new Date(record.clockIn).toLocaleString() : "--"}</TableCell>
                <TableCell>{record.clockOut ? new Date(record.clockOut).toLocaleString() : "--"}</TableCell>
                <TableCell>
                  {!record.clockOut ? (
                    <Button onClick={() => handleClockOut(record.id)}>Registrar Salida</Button>
                  ) : (
                    <span>Completo</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          className="mt-4"
          onClick={() => handleClockIn("EMP-001", "John Doe")}
        >
          Registrar Entrada (John Doe)
        </Button>
      </CardContent>
    </Card>
  );
};

export default AttendanceTracker;
