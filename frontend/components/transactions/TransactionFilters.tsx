"use client";

import { mockCategories } from "@/lib/mockData";
import type { TransactionFilters } from "@/hooks/useTransactions";

interface Props {
  filters: TransactionFilters;
  onChange: (filters: TransactionFilters) => void;
}

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const YEARS = [2024, 2025, 2026];

export default function TransactionFilters({ filters, onChange }: Props) {
  function update(partial: Partial<TransactionFilters>) {
    onChange({ ...filters, ...partial });
  }

  return (
    <div className="flex flex-wrap gap-3">
      <select
        className="input w-auto"
        value={filters.month}
        onChange={(e) => update({ month: Number(e.target.value) })}
      >
        {MONTHS.map((name, i) => (
          <option key={i + 1} value={i + 1}>{name}</option>
        ))}
      </select>

      <select
        className="input w-auto"
        value={filters.year}
        onChange={(e) => update({ year: Number(e.target.value) })}
      >
        {YEARS.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      <select
        className="input w-auto"
        value={filters.categoryId}
        onChange={(e) => update({ categoryId: e.target.value })}
      >
        <option value="">Todas as categorias</option>
        {mockCategories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
    </div>
  );
}
