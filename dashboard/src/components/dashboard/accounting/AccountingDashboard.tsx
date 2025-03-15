"use client";

import { useState } from "react";
import { FileText, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Payment {
  id: string;
  entity: string;
  amount: number;
  type: "receivable" | "payable";
  date: string;
  status: "pending" | "paid";
}

interface Account {
  id: string;
  entity: string;
  totalAmount: number;
  pendingAmount: number;
  type: "receivable" | "payable";
}

const AccountingDashboard = () => {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "PAY-001",
      entity: "Client A",
      amount: 1500,
      type: "receivable",
      date: "2025-02-22",
      status: "paid",
    },
    {
      id: "PAY-002",
      entity: "Supplier B",
      amount: 2500,
      type: "payable",
      date: "2025-02-21",
      status: "pending",
    },
  ]);

  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "ACC-001",
      entity: "Client A",
      totalAmount: 5000,
      pendingAmount: 3500,
      type: "receivable",
    },
    {
      id: "ACC-002",
      entity: "Supplier B",
      totalAmount: 4000,
      pendingAmount: 2500,
      type: "payable",
    },
  ]);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [paymentAmount, setPaymentAmount] = useState<string>("");

  const handlePayment = (type: "receivable" | "payable") => {
    if (!selectedAccount || !paymentAmount) return;

    const account = accounts.find((acc) => acc.id === selectedAccount);
    if (!account) return;

    // Create new payment
    const newPayment: Payment = {
      id: `PAY-${payments.length + 1}`.padStart(7, "0"),
      entity: account.entity,
      amount: Number.parseFloat(paymentAmount),
      type: type,
      date: new Date().toISOString().split("T")[0],
      status: "paid",
    };

    // Update accounts
    const updatedAccounts = accounts.map((acc) => {
      if (acc.id === selectedAccount) {
        return {
          ...acc,
          pendingAmount: Math.max(
            0,
            acc.pendingAmount - Number.parseFloat(paymentAmount)
          ),
        };
      }
      return acc;
    });

    setPayments((prev) => [...prev, newPayment]);
    setAccounts(updatedAccounts);
    setSelectedAccount("");
    setPaymentAmount("");
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payment Management</h1>
        <div className="flex gap-2">
          <Button onClick={() => {}}>
            <FileText className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      {showSuccessAlert && (
        <Alert>
          <AlertDescription className="text-green-600">
            Payment registered successfully
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="payments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payments">Payment Registration</TabsTrigger>
          <TabsTrigger value="accounts">Account Status</TabsTrigger>
          <TabsTrigger value="report">Payment Report</TabsTrigger>
        </TabsList>

        <TabsContent value="payments">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Supplier Payment Registration */}
            <Card>
              <CardHeader>
                <CardTitle>Supplier Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Supplier</Label>
                  <Select onValueChange={setSelectedAccount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts
                        .filter(
                          (acc) =>
                            acc.type === "payable" && acc.pendingAmount > 0
                        )
                        .map((acc) => (
                          <SelectItem key={acc.id} value={acc.id}>
                            {acc.entity} - ${acc.pendingAmount}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={() => handlePayment("payable")}
                  disabled={!selectedAccount || !paymentAmount}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Register Payment
                </Button>
              </CardContent>
            </Card>

            {/* Client Payment Registration */}
            <Card>
              <CardHeader>
                <CardTitle>Client Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Client</Label>
                  <Select onValueChange={setSelectedAccount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts
                        .filter(
                          (acc) =>
                            acc.type === "receivable" && acc.pendingAmount > 0
                        )
                        .map((acc) => (
                          <SelectItem key={acc.id} value={acc.id}>
                            {acc.entity} - ${acc.pendingAmount}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={() => handlePayment("receivable")}
                  disabled={!selectedAccount || !paymentAmount}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Register Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accounts">
          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Pending Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>{account.id}</TableCell>
                      <TableCell>{account.entity}</TableCell>
                      <TableCell>
                        {account.type === "receivable"
                          ? "Receivable"
                          : "Payable"}
                      </TableCell>
                      <TableCell>${account.totalAmount}</TableCell>
                      <TableCell>${account.pendingAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="report">
          <Card>
            <CardHeader>
              <CardTitle>Payment Report</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.id}</TableCell>
                      <TableCell>{payment.entity}</TableCell>
                      <TableCell>
                        {payment.type === "receivable"
                          ? "Receivable"
                          : "Payable"}
                      </TableCell>
                      <TableCell>${payment.amount}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <span
                          className={
                            payment.status === "paid"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }
                        >
                          {payment.status === "paid" ? "Paid" : "Pending"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountingDashboard;
