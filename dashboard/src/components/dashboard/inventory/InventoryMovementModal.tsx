"use client";

import type React from "react";
import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  quantity: number;
}

interface InventoryMovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  type: "in" | "out";
  onUpdateInventory: (
    productId: string,
    quantity: number,
    type: "in" | "out"
  ) => void;
}

export default function InventoryMovementModal({
  isOpen,
  onClose,
  product,
  type,
  onUpdateInventory,
}: InventoryMovementModalProps) {
  const [quantity, setQuantity] = useState<number>(0);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const movementQuantity = Number(quantity);

    if (product && type === "out" && movementQuantity > product.quantity) {
      toast({
        title: "Error",
        description:
          "Insufficient stock. The requested quantity exceeds the available stock.",
        variant: "destructive",
      });
      return;
    }

    if (product) {
      onUpdateInventory(product.id, movementQuantity, type);
      toast({
        title: "Success",
        description: `${
          type === "in" ? "Entry" : "Exit"
        } of ${movementQuantity} units of ${
          product.name
        } registered successfully.`,
      });
      onClose();
    }
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "in" ? "Register Entry" : "Register Exit"} for{" "}
            {product.name}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="col-span-3"
                min={1}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              Confirm {type === "in" ? "Entry" : "Exit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
