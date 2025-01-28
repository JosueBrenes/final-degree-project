import React, { useState } from "react";
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

export default function InventoryMovementModal({
  isOpen,
  onClose,
  product,
  type,
  onUpdateInventory,
}) {
  const [quantity, setQuantity] = useState(0);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const movementQuantity = Number.parseInt(quantity);

    if (type === "out" && movementQuantity > product.quantity) {
      toast({
        title: "Error",
        description:
          "Insufficient stock. The requested quantity exceeds the available stock.",
        variant: "destructive",
      });
      return;
    }

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
                onChange={(e) => setQuantity(e.target.value)}
                className="col-span-3"
                min="1"
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
