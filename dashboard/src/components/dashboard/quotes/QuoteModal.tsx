"use client";

import type React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Quote</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="client">Client</Label>
            <Input id="client" placeholder="Enter client name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="total">Total</Label>
            <Input id="total" type="number" placeholder="$0.00" />
          </div>
          <Button type="submit">Add Quote</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;
