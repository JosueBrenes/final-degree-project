"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { updateQuote } from "@/lib/quotes";
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
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Quote {
  id: string;
  client: string;
  date: string;
  total: number;
  status: string;
  items: string;
  createdBy: string;
}

interface QuoteEditProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  quote: Quote | null;
}

const statusColors: Record<string, string> = {
  Pendiente: "bg-yellow-500 text-black",
  Aprobada: "bg-green-500 text-white",
  Rechazada: "bg-red-500 text-white",
  "En proceso": "bg-blue-500 text-white",
  Completada: "bg-purple-500 text-white",
};

const QuoteEdit: React.FC<QuoteEditProps> = ({
  isOpen,
  onClose,
  onSuccess,
  quote,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    client: "",
    date: "",
    total: "",
    status: "",
    items: "",
  });
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (quote) {
      setFormData({
        client: quote.client || "",
        date: quote.date || "",
        total: quote.total?.toString() || "",
        status: quote.status || "",
        items: quote.items?.toString() || "",
      });
    }
  }, [quote]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validar = (): boolean => {
    const nuevosErrores: Record<string, string> = {};
    if (!formData.client) nuevosErrores.client = "El cliente es obligatorio";
    if (!formData.date) nuevosErrores.date = "La fecha es obligatoria";
    if (!formData.total || Number.parseFloat(formData.total) <= 0)
      nuevosErrores.total = "El total debe ser mayor que cero";
    if (!formData.items || Number.parseInt(formData.items) <= 0)
      nuevosErrores.items = "El número de ítems debe ser mayor que cero";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validar() || !quote) return;

    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se encontró el usuario autenticado.",
        });
        return;
      }

      await updateQuote(quote.id, {
        client: formData.client,
        date: formData.date,
        total: Number.parseFloat(formData.total),
        status: formData.status,
        items: Number.parseInt(formData.items, 10),
      });

      toast({
        title: "Éxito",
        description: "Cotización actualizada correctamente.",
      });

      onSuccess();
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al actualizar la cotización.",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Cotización</DialogTitle>
          <DialogDescription>
            Modifica los datos de la cotización.
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
            <Label htmlFor="client">Cliente</Label>
            <Input
              id="client"
              value={formData.client}
              onChange={handleChange}
              placeholder="Nombre del cliente"
            />
            {errores.client && (
              <p className="text-red-500 text-sm">{errores.client}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
            {errores.date && (
              <p className="text-red-500 text-sm">{errores.date}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="total">Total</Label>
            <Input
              id="total"
              type="number"
              step="0.01"
              min="0"
              value={formData.total}
              onChange={handleChange}
              placeholder="0.00"
            />
            {errores.total && (
              <p className="text-red-500 text-sm">{errores.total}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="items">Número de ítems</Label>
            <Input
              id="items"
              type="number"
              min="1"
              value={formData.items}
              onChange={handleChange}
              placeholder="Cantidad de ítems"
            />
            {errores.items && (
              <p className="text-red-500 text-sm">{errores.items}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">Estado</Label>
            <Select
              value={formData.status}
              onValueChange={(val) => setFormData({ ...formData, status: val })}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Seleccionar estado">
                  {formData.status && (
                    <div className="flex items-center">
                      <Badge
                        className={
                          statusColors[formData.status] || "bg-gray-500"
                        }
                      >
                        {formData.status}
                      </Badge>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.keys(statusColors).map((status) => (
                  <SelectItem key={status} value={status}>
                    <Badge className={statusColors[status]}>{status}</Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Actualizar Cotización"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteEdit;
