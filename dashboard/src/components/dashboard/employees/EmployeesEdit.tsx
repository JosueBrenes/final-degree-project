"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { updateEmployee } from "@/lib/employees";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validar = (): boolean => {
    const nuevosErrores: Record<string, string> = {};
    if (!formData.nombre) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!formData.posicion)
      nuevosErrores.posicion = "La posición es obligatoria";
    if (!formData.departamento)
      nuevosErrores.departamento = "El departamento es obligatorio";
    if (!formData.fechaInicio)
      nuevosErrores.fechaInicio = "La fecha de inicio es obligatoria";
    if (!formData.salario) nuevosErrores.salario = "El salario es obligatorio";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validar()) return;

    setLoading(true);
    try {
      await updateEmployee({
        ...formData,
        salario: Number(formData.salario),
      });
      onEmployeeUpdated();
      onClose();
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Empleado</DialogTitle>
          <DialogDescription>
            Actualiza los datos del empleado.
          </DialogDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </Button>
        </DialogHeader>

        <form className="grid gap-4 py-2" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="cedula">Cédula</Label>
            <Input id="cedula" value={formData.cedula} disabled />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre completo"
            />
            {errores.nombre && (
              <p className="text-red-500 text-sm">{errores.nombre}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="posicion">Posición</Label>
            <Select
              value={formData.posicion}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, posicion: val }))
              }
            >
              <SelectTrigger id="posicion">
                <SelectValue placeholder="Seleccionar Posición" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general-manager">Gerente General</SelectItem>
                <SelectItem value="admin-financial-manager">
                  Gerente Financiero
                </SelectItem>
                <SelectItem value="operations-manager">
                  Gerente de Operaciones
                </SelectItem>
                <SelectItem value="plant-manager">Gerente de Planta</SelectItem>
                <SelectItem value="admin-assistant">
                  Asistente Administrativo
                </SelectItem>
                <SelectItem value="warehouse-staff">
                  Personal de Almacén
                </SelectItem>
                <SelectItem value="operators">Operador</SelectItem>
              </SelectContent>
            </Select>
            {errores.posicion && (
              <p className="text-red-500 text-sm">{errores.posicion}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="departamento">Departamento</Label>
            <Select
              value={formData.departamento}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, departamento: val }))
              }
            >
              <SelectTrigger id="departamento">
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
            {errores.departamento && (
              <p className="text-red-500 text-sm">{errores.departamento}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
            <Input
              id="fechaInicio"
              type="date"
              value={formData.fechaInicio}
              onChange={handleChange}
            />
            {errores.fechaInicio && (
              <p className="text-red-500 text-sm">{errores.fechaInicio}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="salario">Salario</Label>
            <Input
              id="salario"
              type="number"
              value={formData.salario}
              onChange={handleChange}
              placeholder="0.00"
            />
            {errores.salario && (
              <p className="text-red-500 text-sm">{errores.salario}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">Estado</Label>
            <Select
              value={formData.status}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, status: val }))
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Seleccionar Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Actualizar Empleado"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeesEdit;
