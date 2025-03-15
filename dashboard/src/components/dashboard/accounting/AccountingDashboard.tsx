"use client";

import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  BarChart3,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Wallet,
  ArrowUpRight,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getFinanceSummary, getTransactions } from "@/lib/finances";
import { AddIncomeModal } from "./IncomeForm";
import { AddExpenseModal } from "./ExpenseForm";
import autoTable from "jspdf-autotable";

export function AccountingDashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const financeData = await getFinanceSummary();
      setSummary(financeData);

      const transactionData = await getTransactions();
      setTransactions(transactionData.slice(0, 5));
    };

    fetchData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      transactions.map((t) => ({
        Fecha: formatDate(t.date),
        Tipo: t.type === "income" ? "Ingreso" : "Egreso",
        Monto: t.amount,
        Categoría: t.category,
        Descripción: t.description || "N/A",
        "Realizado por": t.createdBy,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transacciones");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(data, "Reporte_Finanzas.xlsx");
  };

  const exportToPDF = () => {
    if (transactions.length === 0) {
      alert("No hay transacciones para exportar.");
      return;
    }

    const doc = new jsPDF();

    const logoPath = "/img/logo.png";
    doc.addImage(logoPath, "PNG", 160, 10, 30, 30);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 150, 243);
    doc.text("Reporte de Finanzas", 14, 20);

    const tableColumn = [
      "Fecha",
      "Tipo",
      "Monto (CRC)",
      "Categoría",
      "Descripción",
      "Realizado por",
    ];
    const tableRows = transactions.map((t) => [
      formatDate(t.date),
      t.type === "income" ? "Ingreso" : "Egreso",
      formatCurrency(t.amount).replace("₡", ""),
      t.category,
      t.description || "N/A",
      t.createdBy,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [33, 150, 243],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      theme: "grid",
    });

    doc.save("Reporte_Finanzas.pdf");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Panel de Finanzas
          </h1>
          <p className="text-muted-foreground">
            Gestiona y visualiza tus finanzas personales
          </p>
        </div>
        <div className="flex gap-2">
          <AddIncomeModal onSuccess={() => window.location.reload()} />
          <AddExpenseModal onSuccess={() => window.location.reload()} />
          <Button onClick={exportToExcel} variant="outline">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
          <Button onClick={exportToPDF} variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Balance Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary.balance)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ingresos</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(summary.totalIncome)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Egresos</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(summary.totalExpenses)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ahorros</CardTitle>
            <Wallet className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(summary.balance > 0 ? summary.balance : 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transacciones Recientes</CardTitle>
          <CardDescription>
            <span className="flex items-center text-amber-600">
              <Clock className="mr-1 h-3 w-3" />
              Últimas 5 transacciones
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      className={
                        transaction.type === "income"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }
                    >
                      <AvatarFallback>
                        {transaction.createdBy.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {transaction.description || "Sin descripción"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No hay transacciones recientes.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
