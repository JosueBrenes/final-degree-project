"use client";

import type React from "react";
import { useState } from "react";
import { X, AlertTriangle, Clock, CalendarIcon } from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Empleado {
  id: string;
  nombre: string;
  posicion: string;
  departamento: string;
  fechaInicio: string;
  salario: string;
}

interface EmployeesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (empleado: Empleado) => void;
  empleado?: Empleado;
}

interface ErroresFormulario {
  nombre?: string;
  posicion?: string;
  departamento?: string;
  fechaInicio?: string;
  salario?: string;
}

const EmployeesModal: React.FC<EmployeesModalProps> = ({
  isOpen,
  onClose,
  onSave,
  empleado,
}) => {
  const [formData, setFormData] = useState<Empleado>(
    empleado || {
      id: "",
      nombre: "",
      posicion: "",
      departamento: "",
      fechaInicio: "",
      salario: "",
    }
  );
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [fecha, setFecha] = useState<Date | undefined>(
    formData.fechaInicio ? new Date(formData.fechaInicio) : undefined
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validar = (): boolean => {
    const nuevosErrores: ErroresFormulario = {};
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validar()) return;

    // Generar ID si es un nuevo empleado
    if (!formData.id) {
      const nuevoId = `EMP-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`;
      formData.id = nuevoId;
    }

    onSave(formData);
    onClose();
  };

  const handleFechaSeleccionada = (date: Date | undefined) => {
    setFecha(date);
    if (date) {
      setFormData({
        ...formData,
        fechaInicio: format(date, "yyyy-MM-dd"),
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {empleado ? "Editar Empleado" : "Agregar Nuevo Empleado"}
          </DialogTitle>
          <DialogDescription>
            Complete los datos del empleado. Todos los cambios serán revisados
            por Recursos Humanos.
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

        <Alert className="mb-4">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-500" />
            <span>
              Los cambios estarán en revisión por Recursos Humanos antes de ser
              aplicados.
            </span>
          </AlertDescription>
        </Alert>

        <form className="grid gap-4 py-2" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre completo del empleado"
            />
            {errores.nombre && (
              <p className="text-red-500 text-sm">{errores.nombre}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="posicion">Posición</Label>
            <Select
              onValueChange={(val) =>
                setFormData({ ...formData, posicion: val })
              }
              value={formData.posicion}
            >
              <SelectTrigger id="posicion">
                <SelectValue placeholder="Seleccionar Posición" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gerente General">Gerente General</SelectItem>
                <SelectItem value="Gerente Administrativo">
                  Gerente Administrativo
                </SelectItem>
                <SelectItem value="Gerente de Operaciones">
                  Gerente de Operaciones
                </SelectItem>
                <SelectItem value="Asistente de Operador">
                  Asistente de Operador
                </SelectItem>
                <SelectItem value="Operador">Operador</SelectItem>
                <SelectItem value="Recepcionista">Recepcionista</SelectItem>
              </SelectContent>
            </Select>
            {errores.posicion && (
              <p className="text-red-500 text-sm">{errores.posicion}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="departamento">Departamento</Label>
            <Select
              onValueChange={(val) =>
                setFormData({ ...formData, departamento: val })
              }
              value={formData.departamento}
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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !fecha && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
                  {fecha ? (
                    format(fecha, "PPP", { locale: es })
                  ) : (
                    <span>Seleccionar fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={fecha}
                  onSelect={handleFechaSeleccionada}
                  initialFocus
                  locale={es}
                />
              </PopoverContent>
            </Popover>
            {errores.fechaInicio && (
              <p className="text-red-500 text-sm">{errores.fechaInicio}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="salario">Salario</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5">$</span>
              <Input
                id="salario"
                type="number"
                value={formData.salario}
                onChange={handleChange}
                className="pl-7"
                placeholder="0.00"
              />
            </div>
            {errores.salario && (
              <p className="text-red-500 text-sm">{errores.salario}</p>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {empleado ? "Actualizar Empleado" : "Agregar Empleado"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeesModal;
