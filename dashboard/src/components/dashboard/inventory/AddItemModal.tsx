"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { addInventoryItem, type InventoryItem } from "@/lib/inventory";

interface AddItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onItemAdded: () => void;
}

export default function AddItemModal({
  open,
  onOpenChange,
  onItemAdded,
}: AddItemModalProps) {
  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    id: "",
    name: "",
    category: "",
    stock: 0,
    minStock: 0,
    maxStock: 0,
    unit: "",
    location: "",
    supplier: "",
    status: "Disponible",
    lastUsed: new Date().toISOString().split("T")[0],
    expiryDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: keyof InventoryItem, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.id || !formData.name || !formData.category) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    setLoading(true);
    try {
      await addInventoryItem(formData as InventoryItem);
      onItemAdded();
      onOpenChange(false);
    } catch (error) {
      console.error("Error al agregar ítem:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[500px] p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Agregar Nuevo Ítem</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="id" className="text-sm font-medium">
              Código
            </Label>
            <Input
              id="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="Ej: HER-001"
              className="h-10"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nombre
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Llave Inglesa 12"
              className="h-10"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category" className="text-sm font-medium">
              Categoría
            </Label>
            <Select
              onValueChange={(val) => handleSelectChange("category", val)}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Herramientas">Herramientas</SelectItem>
                <SelectItem value="Lubricantes">Lubricantes</SelectItem>
                <SelectItem value="Tornillería">Tornillería</SelectItem>
                <SelectItem value="Eléctricos">Eléctricos</SelectItem>
                <SelectItem value="Seguridad">Seguridad</SelectItem>
                <SelectItem value="Motores">Motores</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2">
            <div className="grid gap-2">
              <Label htmlFor="stock" className="text-sm font-medium">
                Stock
              </Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                className="h-10"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unit" className="text-sm font-medium">
                Unidad
              </Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={handleChange}
                placeholder="Ej: Unidad, Litro, Metro"
                className="h-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2">
            <div className="grid gap-2">
              <Label htmlFor="minStock" className="text-sm font-medium">
                Stock Mínimo
              </Label>
              <Input
                id="minStock"
                type="number"
                value={formData.minStock}
                onChange={handleChange}
                placeholder="0"
                className="h-10"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxStock" className="text-sm font-medium">
                Stock Máximo
              </Label>
              <Input
                id="maxStock"
                type="number"
                value={formData.maxStock}
                onChange={handleChange}
                placeholder="0"
                className="h-10"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Ubicación
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ej: A-12-3"
              className="h-10"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="supplier" className="text-sm font-medium">
              Proveedor
            </Label>
            <Input
              id="supplier"
              value={formData.supplier}
              onChange={handleChange}
              placeholder="Ej: Suministros S.A."
              className="h-10"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="expiryDate" className="text-sm font-medium">
              Fecha de Expiración (Opcional)
            </Label>
            <Input
              id="expiryDate"
              type="date"
              value={formData.expiryDate || ""}
              onChange={handleChange}
              className="h-10"
            />
          </div>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="mt-2 w-full sm:w-auto sm:self-end"
          >
            {loading ? "Guardando..." : "Agregar Ítem"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
