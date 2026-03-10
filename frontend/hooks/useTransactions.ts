"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";

export interface TransactionFilters {
  month: number;
  year: number;
  categoryId: string; // "" = todos
}

export interface Transaction {
  id: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  description?: string | null;
  categoryId: string;
  category: { name: string };
  date: string;
}

export interface NewTransaction {
  type: "INCOME" | "EXPENSE";
  amount: number;
  description: string;
  categoryId: string;
  date: string;
}

const now = new Date();

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TransactionFilters>({
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    categoryId: "",
  });

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string> = {
        month: String(filters.month),
        year: String(filters.year),
      };
      if (filters.categoryId) params.categoryId = filters.categoryId;

      const { data } = await api.get<Transaction[]>("/transactions", { params });
      setTransactions(data);
    } catch {
      setError("Erro ao carregar transações.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Re-busca sempre que os filtros mudam
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  async function addTransaction(data: NewTransaction) {
    await api.post("/transactions", data);
    await fetchTransactions(); // refetch para garantir consistência com o banco
  }

  async function deleteTransaction(id: string) {
    await api.delete(`/transactions/${id}`);
    setTransactions((prev) => prev.filter((tx) => tx.id !== id)); // remove local imediatamente
  }

  return { transactions, filters, setFilters, addTransaction, deleteTransaction, loading, error };
}
