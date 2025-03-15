"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";

interface DatosNomina {
  mes: string;
  salarioBase: number;
  bonificaciones: {
    tipo: string;
    monto: number;
  }[];
  deducciones: {
    tipo: string;
    monto: number;
  }[];
  salarioNeto: number;
}

const nominaActual: DatosNomina = {
  mes: "Febrero 2025",
  salarioBase: 5000,
  bonificaciones: [
    { tipo: "Bono de rendimiento", monto: 500 },
    { tipo: "Bono de asistencia", monto: 200 },
  ],
  deducciones: [
    { tipo: "Impuesto sobre la renta", monto: 750 },
    { tipo: "Seguro de salud", monto: 200 },
    { tipo: "Seguridad social", monto: 300 },
  ],
  salarioNeto: 4450,
};

export default function ReciboNomina() {
  const [isAdjustmentDialogOpen, setIsAdjustmentDialogOpen] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState("");
  const [adjustmentRequest, setAdjustmentRequest] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmitAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Solicitud de ajuste enviada:", {
      bono: selectedBonus,
      solicitud: adjustmentRequest,
    });
    setIsAdjustmentDialogOpen(false);
    setSelectedBonus("");
    setAdjustmentRequest("");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Recibo de Nómina</CardTitle>
        <CardDescription>
          {nominaActual.mes} - Desglose detallado del pago
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Salario Base */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Salario Base</h3>
          <p className="text-2xl">${nominaActual.salarioBase.toFixed(2)}</p>
        </div>

        <Separator />

        {/* Bonificaciones */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Bonificaciones</h3>
          <div className="space-y-2">
            {nominaActual.bonificaciones.map((bono) => (
              <div
                key={bono.tipo}
                className="flex justify-between items-center"
              >
                <span>{bono.tipo}</span>
                <span className="text-green-600">
                  +${bono.monto.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Deducciones */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Deducciones</h3>
          <div className="space-y-2">
            {nominaActual.deducciones.map((deduccion) => (
              <div
                key={deduccion.tipo}
                className="flex justify-between items-center"
              >
                <span>{deduccion.tipo}</span>
                <span className="text-red-600">
                  -${deduccion.monto.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Salario Neto */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Salario Neto</h3>
          <p className="text-3xl font-bold">
            ${nominaActual.salarioNeto.toFixed(2)}
          </p>
        </div>

        {showAlert && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Éxito</AlertTitle>
            <AlertDescription>
              Tu solicitud de ajuste de bonificación ha sido enviada al gerente
              para su revisión.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>

      <CardFooter className="flex justify-end">
        <Dialog
          open={isAdjustmentDialogOpen}
          onOpenChange={setIsAdjustmentDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>Solicitar Ajuste de Bonificación</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Solicitar Ajuste de Bonificación</DialogTitle>
              <DialogDescription>
                Selecciona la bonificación que deseas ajustar y describe tu
                solicitud.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitAdjustment}>
              <div className="space-y-4">
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedBonus}
                  onChange={(e) => setSelectedBonus(e.target.value)}
                  required
                >
                  <option value="">Selecciona el tipo de bonificación</option>
                  {nominaActual.bonificaciones.map((bono) => (
                    <option key={bono.tipo} value={bono.tipo}>
                      {bono.tipo}
                    </option>
                  ))}
                </select>
                <Textarea
                  placeholder="Describe por qué solicitas un ajuste..."
                  value={adjustmentRequest}
                  onChange={(e) => setAdjustmentRequest(e.target.value)}
                  className="min-h-[100px]"
                  required
                />
              </div>
              <DialogFooter className="mt-4">
                <Button
                  type="submit"
                  disabled={!selectedBonus || !adjustmentRequest}
                >
                  Enviar Solicitud
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
