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

export default function ConfigureAlertModal({
  isOpen,
  onClose,
  product,
  onUpdateMinStockLevel,
}) {
  const [minStockLevel, setMinStockLevel] = useState(
    product?.minStockLevel || 0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateMinStockLevel(product.id, Number.parseInt(minStockLevel, 10));
    onClose();
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
              onChange={(e) => setMinStockLevel(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
