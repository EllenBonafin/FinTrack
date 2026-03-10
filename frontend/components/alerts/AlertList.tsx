import { formatCurrency } from "@/lib/utils";
import type { EvaluatedAlert } from "@/hooks/useAlerts";

interface Props {
  alerts: EvaluatedAlert[];
  onDelete: (id: string) => void;
}

function ProgressBar({ spent, limit }: { spent: number; limit: number }) {
  const pct    = Math.min((spent / limit) * 100, 100);
  const isOver = spent >= limit;
  const isWarn = pct >= 80;

  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{formatCurrency(spent)} gasto</span>
        <span className={isOver ? "text-red-600 font-semibold" : isWarn ? "text-amber-600 font-semibold" : ""}>
          {Math.round(pct)}% de {formatCurrency(limit)}
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            isOver ? "bg-red-500" : isWarn ? "bg-amber-400" : "bg-emerald-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function AlertList({ alerts, onDelete }: Props) {
  if (alerts.length === 0) {
    return (
      <div className="card text-center py-12 text-gray-400">
        <p className="text-4xl mb-3">🔔</p>
        <p className="font-medium">Nenhum alerta definido</p>
        <p className="text-sm mt-1">Defina limites mensais por categoria para monitorar seus gastos.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {alerts.map((alert) => {
        const isOver = alert.spent >= alert.limit;
        const isWarn = alert.spent / alert.limit >= 0.8;

        return (
          <div
            key={alert.id}
            className={`card relative border-l-4 ${
              isOver ? "border-l-red-500" : isWarn ? "border-l-amber-400" : "border-l-emerald-400"
            }`}
          >
            <button
              onClick={() => onDelete(alert.id)}
              className="absolute top-4 right-4 text-gray-300 hover:text-red-400 transition-colors text-xl leading-none"
              title="Remover alerta"
            >
              ×
            </button>

            <div className="flex items-center gap-2 pr-6">
              <span className="text-xl">{isOver ? "🚨" : isWarn ? "⚠️" : "✅"}</span>
              <span className="font-semibold text-gray-800">{alert.category}</span>
            </div>

            <ProgressBar spent={alert.spent} limit={alert.limit} />
          </div>
        );
      })}
    </div>
  );
}
