"use client";

import { useEffect, useState } from "react";
import { updateEmployee } from "@/lib/employees";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Employee {
  id: string;
  cedula: string;
  nombre: string;
  posicion: string;
  departamento: string;
  fechaInicio: string;
  salario: number;
  status: string;
}

interface EmployeesEditProps {
  isOpen: boolean;
  onClose: () => void;
  onEmployeeUpdated: () => void;
  employee: Employee | null;
}

const EmployeesEdit: React.FC<EmployeesEditProps> = ({
  isOpen,
  onClose,
  onEmployeeUpdated,
  employee,
}) => {
  const [formData, setFormData] = useState<Employee>({
    id: "",
    cedula: "",
    nombre: "",
    posicion: "",
    departamento: "",
    fechaInicio: "",
    salario: 0,
    status: "Activo",
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { id, value } = e.target;
    if (id === "salario") value = value.replace(/[^0-9]/g, ""); // Solo números en salario
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (employee) {
      await updateEmployee({
        ...formData,
        salario: Number(formData.salario),
      });
    }
    onEmployeeUpdated();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Empleado</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* ✅ Cédula (No editable) */}
          <div>
            <Label>Cédula</Label>
            <Input id="cedula" value={formData.cedula} disabled />
          </div>

          {/* ✅ Nombre */}
          <div>
            <Label>Nombre</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* ✅ Posición */}
          <div>
            <Label>Posición</Label>
            <Select
              value={formData.posicion}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, posicion: val }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar Posición" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gerente General">Gerente General</SelectItem>
                <SelectItem value="Operador">Operador</SelectItem>
                <SelectItem value="Recepcionista">Recepcionista</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ✅ Departamento */}
          <div>
            <Label>Departamento</Label>
            <Select
              value={formData.departamento}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, departamento: val }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar Departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gerencia">Gerencia</SelectItem>
                <SelectItem value="Administración">Administración</SelectItem>
                <SelectItem value="Operaciones">Operaciones</SelectItem>
                <SelectItem value="Producción">Producción</SelectItem>
                <SelectItem value="Finanzas">Finanzas</SelectItem>
                <SelectItem value="Taller">Taller</SelectItem>
                <SelectItem value="Almacén">Almacén</SelectItem>
                <SelectItem value="Mecánica">Mecánica</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ✅ Fecha de Inicio */}
          <div>
            <Label>Fecha de Inicio</Label>
            <Input
              id="fechaInicio"
              type="date"
              value={formData.fechaInicio}
              onChange={handleChange}
              required
            />
          </div>

          {/* ✅ Salario */}
          <div>
            <Label>Salario</Label>
            <Input
              id="salario"
              type="number"
              value={formData.salario}
              onChange={handleChange}
              required
            />
          </div>

          {/* ✅ Botones */}
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Actualizar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeesEdit;
