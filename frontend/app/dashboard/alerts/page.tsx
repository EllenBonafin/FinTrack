"use client";

import { useState } from "react";
import { useAlerts } from "@/hooks/useAlerts";
import AlertList from "@/components/alerts/AlertList";
import AlertForm from "@/components/alerts/AlertForm";

const now = new Date();

export default function AlertsPage() {
  const month = now.getMonth() + 1;
  const year  = now.getFullYear();

  const { alerts, loading, error, saveAlert, removeAlert } = useAlerts(month, year);
  const [showForm, setShowForm] = useState(false);

  const monthLabel = new Intl.DateTimeFormat("pt-BR", {
    month: "long", year: "numeric",
  }).format(new Date(year, month - 1));

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alertas</h1>
          <p className="text-gray-500 text-sm mt-0.5 capitalize">{monthLabel}</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + Novo limite
        </button>
      </div>

      {loading && (
        <p className="text-gray-400 animate-pulse">Carregando alertas…</p>
      )}

      {error && (
        <div className="card text-red-500 text-sm">{error}</div>
      )}

      {!loading && !error && (
        <AlertList alerts={alerts} onDelete={removeAlert} />
      )}

      {showForm && (
        <AlertForm
          month={month}
          year={year}
          onSubmit={saveAlert}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
