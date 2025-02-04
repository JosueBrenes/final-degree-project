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

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  startDate: string;
  salary: string;
}

interface EmployeesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Employee) => void;
  employee?: Employee;
}

interface FormErrors {
  name?: string;
  position?: string;
  department?: string;
  startDate?: string;
  salary?: string;
}

const EmployeesModal: React.FC<EmployeesModalProps> = ({
  isOpen,
  onClose,
  onSave,
  employee,
}) => {
  const [formData, setFormData] = useState<Employee>(
    employee || {
      id: "",
      name: "",
      position: "",
      department: "",
      startDate: "",
      salary: "",
    }
  );
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.position) newErrors.position = "Position is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.startDate) newErrors.startDate = "Start Date is required";
    if (!formData.salary) newErrors.salary = "Salary is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {employee ? "Edit Employee" : "Add New Employee"}
          </DialogTitle>
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
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={formData.name} onChange={handleChange} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="position">Position</Label>
            <Select
              onValueChange={(val) =>
                setFormData({ ...formData, position: val })
              }
            >
              <SelectTrigger id="position">
                <SelectValue placeholder="Select Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General Manager">General Manager</SelectItem>
                <SelectItem value="Administrative Manager">
                  Administrative Manager
                </SelectItem>
                <SelectItem value="Operator Assistant">
                  Operator Assistant
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.position && (
              <p className="text-red-500 text-sm">{errors.position}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={formData.department}
              onChange={handleChange}
            />
            {errors.department && (
              <p className="text-red-500 text-sm">{errors.department}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="salary">Salary</Label>
            <Input
              id="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
            />
            {errors.salary && (
              <p className="text-red-500 text-sm">{errors.salary}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            {employee ? "Update Employee" : "Add Employee"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeesModal;
