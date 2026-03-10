"use client";

import { useState } from "react";
import { mockCategories } from "@/lib/mockData";
import type { NewAlert } from "@/hooks/useAlerts";

interface Props {
  month: number;
  year: number;
  onSubmit: (data: NewAlert) => Promise<void>;
  onClose: () => void;
}

export default function AlertForm({ month, year, onSubmit, onClose }: Props) {
  const [categoryId, setCategoryId] = useState("");
  const [limitAmount, setLimitAmount] = useState("");
  const [saving, setSaving] = useState(false);

  // Apenas categorias de despesa (alertas fazem sentido só para gastos)
  const expenseCategories = mockCategories.filter(
    (c) => c.type === "EXPENSE" || c.type === null
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit({ categoryId, limitAmount: parseFloat(limitAmount), month, year });
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Definir Limite</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Categoria</label>
            <select
              className="input"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              {expenseCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Limite mensal (R$)</label>
            <input
              type="number"
              min="1"
              step="0.01"
              className="input"
              placeholder="Ex: 500,00"
              value={limitAmount}
              onChange={(e) => setLimitAmount(e.target.value)}
              required
            />
          </div>

          <p className="text-xs text-gray-400">
            Você receberá um aviso quando atingir 80% deste limite em{" "}
            {new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(new Date(year, month - 1))}/{year}.
          </p>

          <div className="flex gap-3 pt-1">
            <button type="button" className="btn-secondary flex-1" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-primary flex-1" disabled={saving}>
              {saving ? "Salvando…" : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
