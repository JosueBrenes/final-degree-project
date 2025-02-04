"use client";

import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  salary: number;
  benefits: string;
}

interface SalaryManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  onSalaryUpdate: (updatedEmployee: Employee) => void;
}

export default function SalaryManagementModal({
  isOpen,
  onClose,
  employee,
  onSalaryUpdate,
}: SalaryManagementModalProps) {
  const [salary, setSalary] = useState<string>("");
  const [benefits, setBenefits] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    if (employee) {
      setSalary(employee.salary.toString());
      setBenefits(employee.benefits);
    }
  }, [employee]);

  const handleSave = () => {
    if (employee) {
      const updatedEmployee: Employee = {
        ...employee,
        salary: Number.parseFloat(salary),
        benefits: benefits,
      };
      onSalaryUpdate(updatedEmployee);

      // Simulate saving
      setTimeout(() => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          onClose();
        }, 2000);
      }, 1000);
    }
  };

  if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Salary and Benefits</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={employee.name}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="salary" className="text-right">
              Salary
            </Label>
            <Input
              id="salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="benefits" className="text-right">
              Benefits
            </Label>
            <Textarea
              id="benefits"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
        {showAlert && (
          <Alert className="mt-4">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Salary and benefits updated successfully. Employee will be
              notified.
            </AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}
