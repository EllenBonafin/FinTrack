"use client";

import { useState } from "react";
import { useDashboard } from "@/hooks/useDashboard";
import BalanceCard from "./BalanceCard";
import MonthlyBarChart from "./MonthlyBarChart";
import CategoryPieChart from "./CategoryPieChart";
import RecentTransactions from "./RecentTransactions";
import AlertBanner from "./AlertBanner";
import { useAlerts } from "@/hooks/useAlerts";

const now = new Date();

export default function DashboardView() {
  const [month] = useState(now.getMonth() + 1);
  const [year]  = useState(now.getFullYear());

  const { summary, monthly, loading, error } = useDashboard(month, year);
  const { alerts } = useAlerts(month, year);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <span className="animate-pulse text-lg">Carregando dashboard…</span>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="card text-center py-12 text-red-500">
        <p className="text-4xl mb-3">⚠️</p>
        <p className="font-medium">{error ?? "Não foi possível carregar os dados."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(new Date(year, month - 1))}
        </p>
      </div>

      <AlertBanner alerts={alerts} />

      <BalanceCard
        balance={summary.balance}
        totalIncome={summary.totalIncome}
        totalExpense={summary.totalExpense}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyBarChart data={monthly} />
        <CategoryPieChart data={summary.byCategory} />
      </div>

      <RecentTransactions transactions={summary.recentTransactions} />
    </div>
  );
}
