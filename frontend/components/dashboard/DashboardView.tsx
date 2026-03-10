"use client";

import BalanceCard from "./BalanceCard";
import MonthlyBarChart from "./MonthlyBarChart";
import CategoryPieChart from "./CategoryPieChart";
import RecentTransactions from "./RecentTransactions";
import AlertBanner from "./AlertBanner";
import {
  mockSummary,
  mockMonthlyData,
  mockCategoryData,
  mockRecentTransactions,
  mockAlerts,
} from "@/lib/mockData";

export default function DashboardView() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-0.5">Março 2026</p>
      </div>

      {/* Alerts */}
      <AlertBanner alerts={mockAlerts} />

      {/* Balance cards */}
      <BalanceCard
        balance={mockSummary.balance}
        totalIncome={mockSummary.totalIncome}
        totalExpense={mockSummary.totalExpense}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyBarChart data={mockMonthlyData} />
        <CategoryPieChart data={mockCategoryData} />
      </div>

      {/* Recent transactions */}
      <RecentTransactions transactions={mockRecentTransactions} />
    </div>
  );
}
