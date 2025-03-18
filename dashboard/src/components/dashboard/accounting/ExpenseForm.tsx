"use client";

import type React from "react";

import { useState } from "react";
import { addTransaction } from "@/lib/finances";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, MinusCircle, Tag, FileText, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";

const expenseCategories = [
  { value: "food", label: "Alimentación" },
  { value: "housing", label: "Vivienda" },
  { value: "transport", label: "Transporte" },
  { value: "utilities", label: "Servicios" },
  { value: "entertainment", label: "Entretenimiento" },
  { value: "health", label: "Salud" },
  { value: "education", label: "Educación" },
  { value: "shopping", label: "Compras" },
  { value: "other", label: "Otro" },
];

interface AddExpenseModalProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function AddExpenseModal({ trigger, onSuccess }: AddExpenseModalProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setAmount("");
    setCategory("");
    setDescription("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Monto y categoría son obligatorios.",
      });
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Usuario no autenticado.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await addTransaction(user.uid, {
        // Ahora enviamos el `uid`
        type: "expense",
        amount: Number.parseFloat(amount),
        category,
        date: new Date().toISOString(),
        description,
        status: "active",
      });

      toast({
        title: "Éxito",
        description: "Egreso registrado correctamente.",
      });

      resetForm();
      setOpen(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al registrar el egreso.",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) resetForm();
      }}
    >
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 w-full sm:w-auto"
          >
            <MinusCircle className="mr-2 h-4 w-4" />
            Agregar Egreso
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[500px] p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              Registrar Egreso
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Añade un nuevo egreso a tu registro financiero
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="font-medium">
              Monto
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 h-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="font-medium">
              Categoría
            </Label>
            <div className="relative">
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category" className="w-full h-10">
                  <div className="flex items-center">
                    {category ? (
                      <>
                        <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Seleccionar categoría" />
                      </>
                    ) : (
                      <>
                        <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Seleccionar categoría
                        </span>
                      </>
                    )}
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-medium">
              Descripción
            </Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="description"
                placeholder="Añade detalles sobre este egreso"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[80px] pl-10 resize-none"
              />
            </div>
          </div>
        </form>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
            onClick={handleSubmit}
            disabled={isSubmitting || !amount || !category}
          >
            {isSubmitting ? (
              "Procesando..."
            ) : (
              <span className="flex items-center">
                <MinusCircle className="mr-2 h-4 w-4" />
                Agregar Egreso
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
