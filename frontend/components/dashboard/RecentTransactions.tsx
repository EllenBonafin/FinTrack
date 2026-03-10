import { formatCurrency, formatDate } from "@/lib/utils";

interface Transaction {
  id: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  description?: string | null;
  category: { name: string };
  date: string;
}

interface Props {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: Props) {
  return (
    <div className="card">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        Últimas Transações
      </h2>
      <ul className="divide-y divide-gray-50">
        {transactions.map((tx) => (
          <li key={tx.id} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">
                {tx.type === "INCOME" ? "💰" : "💸"}
              </span>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {tx.description ?? tx.category.name}
                </p>
                <p className="text-xs text-gray-400">
                  {tx.category.name} · {formatDate(tx.date)}
                </p>
              </div>
            </div>
            <span
              className={
                tx.type === "INCOME"
                  ? "text-emerald-600 font-semibold text-sm"
                  : "text-red-500 font-semibold text-sm"
              }
            >
              {tx.type === "INCOME" ? "+" : "-"}
              {formatCurrency(tx.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
