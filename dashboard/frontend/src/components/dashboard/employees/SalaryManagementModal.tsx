import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

interface SalaryManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: any;
  onSalaryUpdate: (updatedEmployee: any) => void;
}

export default function SalaryManagementModal({
  isOpen,
  onClose,
  employee,
  onSalaryUpdate,
}: SalaryManagementModalProps) {
  const [salary, setSalary] = useState("");
  const [benefits, setBenefits] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [month, setMonth] = useState("");
  const [isGeneratingPayroll, setIsGeneratingPayroll] = useState(false);
  const [payrollSuccess, setPayrollSuccess] = useState(false);

  useEffect(() => {
    if (employee) {
      setSalary(employee.salary || "");
      setBenefits(employee.benefits || "");
    }
  }, [employee]);

  const handleSave = () => {
    const updatedEmployee = { ...employee, salary: Number.parseFloat(salary) };
    onSalaryUpdate(updatedEmployee);

    // Simulate saving
    setTimeout(() => {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  const handleGeneratePayroll = async () => {
    if (!month) {
      alert("Por favor selecciona un mes.");
      return;
    }

    setIsGeneratingPayroll(true);
    try {
      const response = await fetch("/api/generatePayroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month }),
      });

      if (!response.ok) throw new Error("Error al generar la planilla");

      setPayrollSuccess(true);
      setTimeout(() => {
        setPayrollSuccess(false);
      }, 3000);
    } catch (error) {
      alert("Hubo un error al generar la planilla.");
    }
    setIsGeneratingPayroll(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Gestión de Salario y Planilla</DialogTitle>
        </DialogHeader>
        
        {employee && (
          <div className="grid gap-4 py-4">
            {/* Nombre */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nombre</Label>
              <Input id="name" value={employee.name} className="col-span-3" disabled />
            </div>

            {/* Salario */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salary" className="text-right">Salario</Label>
              <Input
                id="salary"
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Beneficios */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="benefits" className="text-right">Beneficios</Label>
              <Textarea
                id="benefits"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Generación de Planilla */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="month" className="text-right">Mes</Label>
              <Input
                id="month"
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button onClick={handleSave}>Guardar Cambios</Button>
          <Button 
            onClick={handleGeneratePayroll} 
            disabled={isGeneratingPayroll} 
            variant="outline"
          >
            {isGeneratingPayroll ? "Generando..." : "Generar Planilla"}
          </Button>
        </DialogFooter>

        {/* Alertas de Éxito */}
        {showAlert && (
          <Alert className="mt-4">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Éxito</AlertTitle>
            <AlertDescription>Salario y beneficios actualizados correctamente.</AlertDescription>
          </Alert>
        )}

        {payrollSuccess && (
          <Alert className="mt-4">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Planilla Generada</AlertTitle>
            <AlertDescription>La planilla del mes seleccionado ha sido generada con éxito.</AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}
