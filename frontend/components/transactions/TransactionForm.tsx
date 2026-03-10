"use client";

import { useState } from "react";
import { mockCategories } from "@/lib/mockData";
import type { NewTransaction } from "@/hooks/useTransactions";

interface Props {
  onSubmit: (data: NewTransaction) => void;
  onClose: () => void;
}

const today = new Date().toISOString().split("T")[0];

export default function TransactionForm({ onSubmit, onClose }: Props) {
  const [type, setType]               = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [amount, setAmount]           = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId]   = useState("");
  const [date, setDate]               = useState(today);

  // Mostra só categorias compatíveis com o tipo selecionado
  const filteredCategories = mockCategories.filter(
    (cat) => cat.type === null || cat.type === type
  );

  function handleTypeChange(newType: "INCOME" | "EXPENSE") {
    setType(newType);
    setCategoryId(""); // reseta categoria ao trocar o tipo
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      type,
      amount: parseFloat(amount),
      description,
      categoryId,
      date: new Date(date + "T12:00:00").toISOString(),
    });
    onClose();
  }

  return (
    // Overlay
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Nova Transação</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tipo */}
          <div className="flex gap-2">
            {(["EXPENSE", "INCOME"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleTypeChange(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                  type === t
                    ? t === "INCOME"
                      ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                      : "bg-red-50 border-red-400 text-red-700"
                    : "bg-white border-gray-200 text-gray-400 hover:border-gray-300"
                }`}
              >
                {t === "INCOME" ? "💰 Receita" : "💸 Despesa"}
              </button>
            ))}
          </div>

          {/* Valor */}
          <div>
            <label className="label">Valor (R$)</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              className="input"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="label">Descrição</label>
            <input
              type="text"
              className="input"
              placeholder="Ex: Supermercado"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Categoria — filtrada pelo tipo */}
          <div>
            <label className="label">Categoria</label>
            <select
              className="input"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              {filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Data */}
          <div>
            <label className="label">Data</label>
            <input
              type="date"
              className="input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" className="btn-secondary flex-1" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary flex-1">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
