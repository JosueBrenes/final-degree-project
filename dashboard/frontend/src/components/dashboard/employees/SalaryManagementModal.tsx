import React, { useState, useEffect } from "react";
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

interface SalaryManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: any;
  onSalaryUpdate: (updatedEmployee: any) => void;
}

export default function SalaryManagementModal({
  isOpen,
  onClose,
  employee,
  onSalaryUpdate,
}: SalaryManagementModalProps) {
  const [salary, setSalary] = useState("");
  const [benefits, setBenefits] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [month, setMonth] = useState("");
  const [isGeneratingPayroll, setIsGeneratingPayroll] = useState(false);
  const [payrollSuccess, setPayrollSuccess] = useState(false);
  const [isPaymentSchedulerOpen, setIsPaymentSchedulerOpen] = useState(false); // Estado para abrir PaymentScheduler

  useEffect(() => {
    if (employee) {
      setSalary(employee.salary || "");
      setBenefits(employee.benefits || "");
    }
  }, [employee]);

  const handleSave = () => {
    const updatedEmployee = { ...employee, salary: Number.parseFloat(salary) };
    onSalaryUpdate(updatedEmployee);

    // Simulate saving
    setTimeout(() => {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  const handleGeneratePayroll = async () => {
    if (!month) {
      alert("Please select a month.");
      return;
    }

    setIsGeneratingPayroll(true);
    try {
      const response = await fetch("/api/generatePayroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month }),
      });

      if (!response.ok) throw new Error("Error generating payroll");

      setPayrollSuccess(true);
      setTimeout(() => {
        setPayrollSuccess(false);
      }, 3000);
    } catch (error) {
      alert("An error occurred while generating the payroll.");
    }
    setIsGeneratingPayroll(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Salary and Payroll Management</DialogTitle>
        </DialogHeader>
        
        {employee && (
          <div className="grid gap-4 py-4">
            {/* Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={employee.name} className="col-span-3" disabled />
            </div>

            {/* Salary */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salary" className="text-right">Salary</Label>
              <Input
                id="salary"
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="benefits" className="text-right">Benefits</Label>
              <Textarea
                id="benefits"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Payroll Generation */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="month" className="text-right">Month</Label>
              <Input
                id="month"
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
          <Button 
            onClick={handleGeneratePayroll} 
            disabled={isGeneratingPayroll} 
            variant="outline"
          >
            {isGeneratingPayroll ? "Generating..." : "Generate Payroll"}
          </Button>
          <Button 
            onClick={() => setIsPaymentSchedulerOpen(true)} // Botón para abrir PaymentScheduler
            variant="outline"
          >
            Schedule Payment
          </Button>
        </DialogFooter>

        {/* Success Alerts */}
        {showAlert && (
          <Alert className="mt-4">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Salary and benefits updated successfully.</AlertDescription>
          </Alert>
        )}

        {payrollSuccess && (
          <Alert className="mt-4">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Payroll Generated</AlertTitle>
            <AlertDescription>The payroll for the selected month has been successfully generated.</AlertDescription>
          </Alert>
        )}
        
      </DialogContent>
    </Dialog>
  );
}
