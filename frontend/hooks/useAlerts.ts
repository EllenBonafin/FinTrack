"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";

export interface EvaluatedAlert {
  id: string;
  category: string;
  categoryId: string;
  limit: number;
  spent: number;
  month: number;
  year: number;
}

export interface NewAlert {
  categoryId: string;
  limitAmount: number;
  month: number;
  year: number;
}

export function useAlerts(month: number, year: number) {
  const [alerts, setAlerts]   = useState<EvaluatedAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<EvaluatedAlert[]>("/alerts/evaluated", {
        params: { month, year },
      });
      setAlerts(data);
    } catch {
      setError("Erro ao carregar alertas.");
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  async function saveAlert(data: NewAlert) {
    await api.post("/alerts", data);
    await fetchAlerts();
  }

  async function removeAlert(id: string) {
    await api.delete(`/alerts/${id}`);
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }

  return { alerts, loading, error, saveAlert, removeAlert };
}
