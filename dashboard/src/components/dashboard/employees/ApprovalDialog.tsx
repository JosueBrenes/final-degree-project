"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

interface SolicitudAprobacion {
  id: string;
  nombreEmpleado: string;
  campo: string;
  valorActual: string;
  valorSolicitado: string;
  tipo: "salario" | "posicion" | "departamento" | "otro";
}

const solicitudesEjemplo: SolicitudAprobacion[] = [
  {
    id: "SOL-001",
    nombreEmpleado: "Carlos Pérez",
    campo: "Salario",
    valorActual: "$120,000",
    valorSolicitado: "$135,000",
    tipo: "salario",
  },
  {
    id: "SOL-002",
    nombreEmpleado: "María López",
    campo: "Posición",
    valorActual: "Asistente Administrativo",
    valorSolicitado: "Coordinador Administrativo",
    tipo: "posicion",
  },
  {
    id: "SOL-003",
    nombreEmpleado: "Jorge Castillo",
    campo: "Departamento",
    valorActual: "Operaciones",
    valorSolicitado: "Gerencia",
    tipo: "departamento",
  },
  {
    id: "SOL-004",
    nombreEmpleado: "Diego Vargas",
    campo: "Salario",
    valorActual: "$50,000",
    valorSolicitado: "$55,000",
    tipo: "salario",
  },
];

interface ApprovalDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApprovalDialog({
  isOpen,
  onClose,
}: ApprovalDialogProps) {
  const [solicitudes, setSolicitudes] =
    useState<SolicitudAprobacion[]>(solicitudesEjemplo);

  const handleAprobar = (id: string) => {
    // Aquí normalmente harías una llamada a la API para actualizar los datos del empleado
    console.log(`Solicitud aprobada ${id}`);
    setSolicitudes(solicitudes.filter((sol) => sol.id !== id));
  };

  const handleRechazar = (id: string) => {
    // Aquí normalmente harías una llamada a la API para notificar al empleado
    console.log(`Solicitud rechazada ${id}`);
    setSolicitudes(solicitudes.filter((sol) => sol.id !== id));
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "salario":
        return (
          <Badge variant="outline" className="mb-2">
            <Clock className="h-3 w-3 mr-1 text-amber-500" />
            Cambio de Salario
          </Badge>
        );
      case "posicion":
        return (
          <Badge variant="outline" className="mb-2">
            <Clock className="h-3 w-3 mr-1 text-blue-500" />
            Cambio de Posición
          </Badge>
        );
      case "departamento":
        return (
          <Badge variant="outline" className="mb-2">
            <Clock className="h-3 w-3 mr-1 text-purple-500" />
            Cambio de Departamento
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="mb-2">
            <Clock className="h-3 w-3 mr-1" />
            Solicitud de Cambio
          </Badge>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Solicitudes de Aprobación</DialogTitle>
          <DialogDescription>
            Revise y apruebe o rechace las solicitudes de cambio de datos de
            empleados.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[350px] w-full rounded-md border p-4">
          {solicitudes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No hay solicitudes pendientes de aprobación.
            </div>
          ) : (
            solicitudes.map((solicitud) => (
              <div
                key={solicitud.id}
                className="mb-4 p-3 border rounded-md shadow-sm"
              >
                {getTipoBadge(solicitud.tipo)}
                <p className="font-medium text-base">
                  {solicitud.nombreEmpleado}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  Solicita cambiar su {solicitud.campo.toLowerCase()}:
                </p>
                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  <div className="p-2 bg-muted rounded-md">
                    <p className="text-xs text-muted-foreground">
                      Valor Actual:
                    </p>
                    <p>{solicitud.valorActual}</p>
                  </div>
                  <div className="p-2 bg-muted rounded-md">
                    <p className="text-xs text-muted-foreground">
                      Valor Solicitado:
                    </p>
                    <p>{solicitud.valorSolicitado}</p>
                  </div>
                </div>
                <div className="mt-2 flex justify-end space-x-2">
                  <Button
                    onClick={() => handleRechazar(solicitud.id)}
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <XCircle className="h-4 w-4 mr-1 text-red-500" />
                    Rechazar
                  </Button>
                  <Button
                    onClick={() => handleAprobar(solicitud.id)}
                    size="sm"
                    className="flex items-center"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Aprobar
                  </Button>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
        <DialogFooter>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
