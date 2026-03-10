import { formatCurrency } from "@/lib/utils";

interface Props {
  balance: number;
  totalIncome: number;
  totalExpense: number;
}

export default function BalanceCard({ balance, totalIncome, totalExpense }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Saldo */}
      <div className="card col-span-1 sm:col-span-1 bg-gradient-to-br from-brand-600 to-brand-700 text-white border-0">
        <p className="text-sm font-medium opacity-80">Saldo Atual</p>
        <p className="text-3xl font-bold mt-1">{formatCurrency(balance)}</p>
        <p className="text-xs opacity-70 mt-2">Março 2026</p>
      </div>

      {/* Receitas */}
      <div className="card border-l-4 border-l-emerald-400">
        <p className="text-sm text-gray-500 font-medium">Receitas</p>
        <p className="text-2xl font-bold text-emerald-600 mt-1">
          {formatCurrency(totalIncome)}
        </p>
        <p className="text-xs text-gray-400 mt-2">Este mês</p>
      </div>

      {/* Despesas */}
      <div className="card border-l-4 border-l-red-400">
        <p className="text-sm text-gray-500 font-medium">Despesas</p>
        <p className="text-2xl font-bold text-red-500 mt-1">
          {formatCurrency(totalExpense)}
        </p>
        <p className="text-xs text-gray-400 mt-2">Este mês</p>
      </div>
    </div>
  );
}
