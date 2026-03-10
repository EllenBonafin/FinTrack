"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface CategoryTotal {
  name: string;
  total: number;
}

interface RecentTransaction {
  id: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  description?: string | null;
  category: { name: string };
  date: string;
}

interface Summary {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  byCategory: CategoryTotal[];
  recentTransactions: RecentTransaction[];
}

interface MonthlyPoint {
  month: number;
  income: number;
  expense: number;
}

const MONTH_LABELS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
                      "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function useDashboard(month: number, year: number) {
  const [summary, setSummary]     = useState<Summary | null>(null);
  const [monthly, setMonthly]     = useState<{ month: string; income: number; expense: number }[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        // Duas requisições em paralelo
        const [summaryRes, chartRes] = await Promise.all([
          api.get<Summary>("/transactions/summary", { params: { month, year } }),
          api.get<MonthlyPoint[]>("/transactions/monthly-chart", { params: { year } }),
        ]);

        setSummary(summaryRes.data);

        // Mapeia os 12 pontos para o label do mês e filtra só os que têm dados
        // (ou pega os últimos 6 meses para não poluir o gráfico)
        const relevant = chartRes.data
          .filter((p) => p.income > 0 || p.expense > 0)
          .map((p) => ({ month: MONTH_LABELS[p.month - 1], income: p.income, expense: p.expense }));

        setMonthly(relevant);
      } catch {
        setError("Erro ao carregar dashboard.");
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [month, year]);

  return { summary, monthly, loading, error };
}
