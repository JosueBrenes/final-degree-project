"use client";

import type React from "react";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface EmployeesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmployeesModal: React.FC<EmployeesModalProps> = ({ isOpen, onClose }) => {
  const [isDuplicate, setIsDuplicate] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
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

        {isDuplicate && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Employee already exists.</AlertDescription>
          </Alert>
        )}

        <form className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter employee name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="position">Position</Label>
            <Select>
              <SelectTrigger id="position">
                <SelectValue placeholder="Select Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general-manager">General Manager</SelectItem>
                <SelectItem value="administrative-manager">
                  Administrative Manager
                </SelectItem>
                <SelectItem value="operator-assistant">
                  Operator Assistant
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="department">Department</Label>
            <Input id="department" placeholder="Enter department" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" type="date" />
          </div>
          <Button type="submit" className="w-full">
            Add Employee
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeesModal;
