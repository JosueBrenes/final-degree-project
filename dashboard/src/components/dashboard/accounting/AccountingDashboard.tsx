"use client";

import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
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
    <div className="space-y-6 p-4 md:p-6 bg-background transition-colors duration-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Panel de Finanzas
          </h1>
          <p className="text-muted-foreground">
            Gestiona y visualiza tus finanzas personales
          </p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="[&>button]:bg-white [&>button]:text-black [&>button:hover]:bg-gray-100 [&>button_svg]:text-green-500 [&>button]:border-green-500 dark:[&>button]:bg-background dark:[&>button]:text-foreground dark:[&>button:hover]:bg-muted dark:[&>button]:border-green-0">
            <AddIncomeModal onSuccess={() => window.location.reload()} />
          </div>
          <div className="[&>button]:bg-white [&>button]:text-black [&>button:hover]:bg-gray-100 [&>button_svg]:text-red-500 [&>button]:border-red-500 dark:[&>button]:bg-background dark:[&>button]:text-foreground dark:[&>button:hover]:bg-muted dark:[&>button]:border-red-500">
            <AddExpenseModal onSuccess={() => window.location.reload()} />
          </div>
          <Button
            onClick={exportToExcel}
            variant="outline"
            className="bg-green-600 hover:bg-green-700 text-white border-green-600 dark:bg-green-700 dark:hover:bg-green-800 dark:border-green-700"
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Exportar</span> Excel
          </Button>
          <Button
            onClick={exportToPDF}
            variant="outline"
            className="bg-red-600 hover:bg-red-700 text-white border-red-600 dark:bg-red-700 dark:hover:bg-red-800 dark:border-red-700"
          >
            <FileText className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Exportar</span> PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-l-4 border-l-blue-500 shadow-sm hover:shadow transition-shadow duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Balance Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-foreground">
                {formatCurrency(summary.balance)}
              </div>
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-green-500 shadow-sm hover:shadow transition-shadow duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ingresos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(summary.totalIncome)}
              </div>
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-red-500 shadow-sm hover:shadow transition-shadow duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Egresos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {formatCurrency(summary.totalExpenses)}
              </div>
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900">
                <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-purple-500 shadow-sm hover:shadow transition-shadow duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ahorros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatCurrency(summary.balance > 0 ? summary.balance : 0)}
              </div>
              <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
                <Wallet className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm hover:shadow transition-shadow duration-200">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-foreground">
            <span>Transacciones Recientes</span>
            <Badge
              variant="outline"
              className="ml-2 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
            >
              <Clock className="mr-1 h-3 w-3" />
              Últimas 5
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      className={
                        transaction.type === "income"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-400"
                      }
                    >
                      <AvatarFallback>
                        {transaction.createdBy.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none text-foreground">
                        {transaction.description || "Sin descripción"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(transaction.date)} • {transaction.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`font-medium ${
                        transaction.type === "income"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {transaction.type === "income" ? "Ingreso" : "Egreso"}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay transacciones recientes.
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0 border-t flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            Ver todas las transacciones
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
