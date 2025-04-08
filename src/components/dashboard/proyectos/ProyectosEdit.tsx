"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Proyecto, updateProyecto } from "@/lib/proyectos";

interface ProyectosEditProps {
  isOpen: boolean;
  onClose: () => void;
  onProyectoUpdated: () => void;
  proyecto: Proyecto;
}

export default function ProyectosEdit({
  isOpen,
  onClose,
  onProyectoUpdated,
  proyecto,
}: ProyectosEditProps) {
  const [formData, setFormData] = useState<Proyecto>({
    id: "",
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "activo",
    cliente: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (proyecto) {
      setFormData(proyecto);
    }
  }, [proyecto]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validaciones básicas
      if (!formData.nombre || !formData.fechaInicio || !formData.cliente) {
        throw new Error("Por favor complete todos los campos requeridos.");
      }

      await updateProyecto({
        ...formData,
        estado: formData.estado as "activo" | "completado" | "cancelado",
      });
      onProyectoUpdated();
      onClose();
    } catch (error) {
      console.error("Error al actualizar proyecto:", error);
      setError(
        error instanceof Error ? error.message : "Error al actualizar proyecto"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Editar Proyecto
          </DialogTitle>
          <DialogDescription>
            Modifique los detalles del proyecto. Todos los campos marcados con *
            son obligatorios.
          </DialogDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">
                Nombre del Proyecto <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Construcción Edificio Central"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cliente">
                Cliente <span className="text-red-500">*</span>
              </Label>
              <Input
                id="cliente"
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
                placeholder="Ej: Empresa ABC"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Describa brevemente el proyecto..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fechaInicio">
                  Fecha de Inicio <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fechaInicio"
                  name="fechaInicio"
                  type="date"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fechaFin">Fecha de Finalización</Label>
                <Input
                  id="fechaFin"
                  name="fechaFin"
                  type="date"
                  value={formData.fechaFin}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estado">
                Estado <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.estado}
                onValueChange={(value) => handleSelectChange("estado", value)}
              >
                <SelectTrigger id="estado">
                  <SelectValue placeholder="Seleccione un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="completado">Completado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></span>
                  Actualizando...
                </span>
              ) : (
                "Guardar Cambios"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
