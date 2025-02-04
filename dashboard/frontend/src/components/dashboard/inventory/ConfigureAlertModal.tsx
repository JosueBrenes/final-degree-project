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

interface Product {
  id: string;
  name: string;
  minStockLevel?: number;
}

interface ConfigureAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onUpdateMinStockLevel: (productId: string, minStockLevel: number) => void;
}

export default function ConfigureAlertModal({
  isOpen,
  onClose,
  product,
  onUpdateMinStockLevel,
}: ConfigureAlertModalProps) {
  const [minStockLevel, setMinStockLevel] = useState<number>(
    product?.minStockLevel || 0
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (product) {
      onUpdateMinStockLevel(product.id, minStockLevel);
      onClose();
    }
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Configure Low Stock Alert for {product.name}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Label htmlFor="minStockLevel">Minimum Stock Level</Label>
            <Input
              id="minStockLevel"
              type="number"
              value={minStockLevel}
              onChange={(e) => setMinStockLevel(Number(e.target.value))}
              min={0}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
