interface Alert {
  category: string;
  spent: number;
  limit: number;
}

interface Props {
  alerts: Alert[];
}

export default function AlertBanner({ alerts }: Props) {
  const triggered = alerts.filter((a) => a.spent / a.limit >= 0.8);
  if (!triggered.length) return null;

  return (
    <div className="space-y-2">
      {triggered.map((alert) => {
        const pct = Math.round((alert.spent / alert.limit) * 100);
        const isOver = pct >= 100;
        return (
          <div
            key={alert.category}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium border ${
              isOver
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-amber-50 border-amber-200 text-amber-700"
            }`}
          >
            <span className="text-lg">{isOver ? "🚨" : "⚠️"}</span>
            <span>
              {isOver
                ? `Limite de ${alert.category} ultrapassado! (${pct}%)`
                : `${alert.category}: ${pct}% do limite mensal atingido.`}
            </span>
            <span className="ml-auto font-semibold">
              R$ {alert.spent.toFixed(2)} / R$ {alert.limit.toFixed(2)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
