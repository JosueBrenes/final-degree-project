"use client";

import { useEffect, useState } from "react";
import { getFinanceSummary } from "@/lib/finances";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FinanceCard = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      const data = await getFinanceSummary();
      setSummary(data);
    };
    fetchSummary();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Ingresos</CardTitle>
        </CardHeader>
        <CardContent className="text-green-500 text-xl font-bold">
          ₡{summary.totalIncome}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Egresos</CardTitle>
        </CardHeader>
        <CardContent className="text-red-500 text-xl font-bold">
          ₡{summary.totalExpenses}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Balance</CardTitle>
        </CardHeader>
        <CardContent
          className={`text-xl font-bold ${
            summary.balance >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ₡{summary.balance}
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceCard;
