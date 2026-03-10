import { formatCurrency, formatDate } from "@/lib/utils";
import type { MockTransaction } from "@/lib/mockData";

interface Props {
  transactions: MockTransaction[];
  onDelete: (id: string) => void;
}

export default function TransactionTable({ transactions, onDelete }: Props) {
  if (transactions.length === 0) {
    return (
      <div className="card text-center py-12 text-gray-400">
        <p className="text-4xl mb-3">💸</p>
        <p className="font-medium">Nenhuma transação encontrada</p>
        <p className="text-sm mt-1">Tente outro filtro ou adicione uma nova transação.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden p-0">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 text-left text-gray-500 font-medium">
            <th className="px-6 py-3">Descrição</th>
            <th className="px-6 py-3">Categoria</th>
            <th className="px-6 py-3">Data</th>
            <th className="px-6 py-3 text-right">Valor</th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span>{tx.type === "INCOME" ? "💰" : "💸"}</span>
                  <span className="font-medium text-gray-800">{tx.description}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-500">{tx.category.name}</td>
              <td className="px-6 py-4 text-gray-500">{formatDate(tx.date)}</td>
              <td className={`px-6 py-4 text-right font-semibold ${
                tx.type === "INCOME" ? "text-emerald-600" : "text-red-500"
              }`}>
                {tx.type === "INCOME" ? "+" : "-"}{formatCurrency(tx.amount)}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onDelete(tx.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors text-lg"
                  title="Excluir"
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
