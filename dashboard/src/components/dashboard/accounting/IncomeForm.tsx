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
import { DollarSign, PlusCircle, Tag, FileText, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";

const incomeCategories = [
  { value: "salary", label: "Salario" },
  { value: "investment", label: "Inversiones" },
  { value: "freelance", label: "Trabajo Freelance" },
  { value: "gift", label: "Regalo" },
  { value: "refund", label: "Reembolso" },
  { value: "other", label: "Otro" },
];

interface AddIncomeModalProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function AddIncomeModal({ trigger, onSuccess }: AddIncomeModalProps) {
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
        type: "income",
        amount: Number.parseFloat(amount),
        category,
        date: new Date().toISOString(),
        description,
        status: "active",
      });

      toast({
        title: "Éxito",
        description: "Ingreso registrado correctamente.",
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
        description: "Error al registrar el ingreso.",
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
          <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Ingreso
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[500px] p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              Registrar Ingreso
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
            Añade un nuevo ingreso a tu registro financiero
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
                  {incomeCategories.map((cat) => (
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
                placeholder="Añade detalles sobre este ingreso"
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
            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            onClick={handleSubmit}
            disabled={isSubmitting || !amount || !category}
          >
            {isSubmitting ? (
              "Procesando..."
            ) : (
              <span className="flex items-center">
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Ingreso
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
