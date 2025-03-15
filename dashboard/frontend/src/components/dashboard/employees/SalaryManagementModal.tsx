"use client";

import { useState, useEffect } from "react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

interface Empleado {
  id: string;
  name: string;
  salary: number;
  benefits: string;
}

interface ModalGestionSalarioProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Empleado | null;
  onSalaryUpdate: (updatedEmployee: Empleado) => void;
}

export default function ModalGestionSalario({
  isOpen,
  onClose,
  employee,
  onSalaryUpdate,
}: ModalGestionSalarioProps) {
  const [salary, setSalary] = useState<string>("");
  const [benefits, setBenefits] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    if (employee) {
      setSalary(employee.salary.toString());
      setBenefits(employee.benefits);
    }
  }, [employee]);

  const handleSave = () => {
    if (employee) {
      const empleadoActualizado: Empleado = {
        ...employee,
        salary: Number.parseFloat(salary),
        benefits: benefits,
      };
      onSalaryUpdate(empleadoActualizado);

      // Simular guardado
      setTimeout(() => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          onClose();
        }, 2000);
      }, 1000);
    }
  };

  if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Gestionar Salario y Beneficios</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              value={employee.name}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="salary" className="text-right">
              Salario
            </Label>
            <Input
              id="salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
