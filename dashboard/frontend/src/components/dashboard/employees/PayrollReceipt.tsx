"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";

interface PayrollData {
  month: string;
  baseSalary: number;
  bonuses: {
    type: string;
    amount: number;
  }[];
  deductions: {
    type: string;
    amount: number;
  }[];
  netSalary: number;
}

const currentPayroll: PayrollData = {
  month: "February 2025",
  baseSalary: 5000,
  bonuses: [
    { type: "Performance Bonus", amount: 500 },
    { type: "Attendance Bonus", amount: 200 },
  ],
  deductions: [
    { type: "Income Tax", amount: 750 },
    { type: "Health Insurance", amount: 200 },
    { type: "Social Security", amount: 300 },
  ],
  netSalary: 4450,
};

export default function PayrollReceipt() {
  const [isAdjustmentDialogOpen, setIsAdjustmentDialogOpen] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState("");
  const [adjustmentRequest, setAdjustmentRequest] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmitAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adjustment request submitted:", {
      bonus: selectedBonus,
      request: adjustmentRequest,
    });
    setIsAdjustmentDialogOpen(false);
    setSelectedBonus("");
    setAdjustmentRequest("");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Payroll Receipt</CardTitle>
        <CardDescription>
          {currentPayroll.month} - Detailed Payment Breakdown
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Base Salary */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Base Salary</h3>
          <p className="text-2xl">${currentPayroll.baseSalary.toFixed(2)}</p>
        </div>

        <Separator />

        {/* Bonuses */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Bonuses</h3>
          <div className="space-y-2">
            {currentPayroll.bonuses.map((bonus) => (
              <div
                key={bonus.type}
                className="flex justify-between items-center"
              >
                <span>{bonus.type}</span>
                <span className="text-green-600">
                  +${bonus.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Deductions */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Deductions</h3>
          <div className="space-y-2">
            {currentPayroll.deductions.map((deduction) => (
              <div
                key={deduction.type}
                className="flex justify-between items-center"
              >
                <span>{deduction.type}</span>
                <span className="text-red-600">
                  -${deduction.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Net Salary */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Net Salary</h3>
          <p className="text-3xl font-bold">
            ${currentPayroll.netSalary.toFixed(2)}
          </p>
        </div>

        {showAlert && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your bonus adjustment request has been sent to the manager for
              review.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>

      <CardFooter className="flex justify-end">
        <Dialog
          open={isAdjustmentDialogOpen}
          onOpenChange={setIsAdjustmentDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>Request Bonus Adjustment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Bonus Adjustment</DialogTitle>
              <DialogDescription>
                Select the bonus you want to adjust and describe your request.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitAdjustment}>
              <div className="space-y-4">
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedBonus}
                  onChange={(e) => setSelectedBonus(e.target.value)}
                  required
                >
                  <option value="">Select bonus type</option>
                  {currentPayroll.bonuses.map((bonus) => (
                    <option key={bonus.type} value={bonus.type}>
                      {bonus.type}
                    </option>
                  ))}
                </select>
                <Textarea
                  placeholder="Describe why you're requesting an adjustment..."
                  value={adjustmentRequest}
                  onChange={(e) => setAdjustmentRequest(e.target.value)}
                  className="min-h-[100px]"
                  required
                />
              </div>
              <DialogFooter className="mt-4">
                <Button
                  type="submit"
                  disabled={!selectedBonus || !adjustmentRequest}
                >
                  Submit Request
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
