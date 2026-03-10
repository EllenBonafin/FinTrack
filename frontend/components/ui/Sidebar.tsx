"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/dashboard/transactions", label: "Transações", icon: "💳" },
  { href: "/dashboard/alerts", label: "Alertas", icon: "🔔" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col min-h-screen shadow-sm">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100">
        <span className="text-2xl font-bold text-brand-700">FinTrack</span>
        <p className="text-xs text-gray-400 mt-0.5">Dashboard Financeiro</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-brand-50 text-brand-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-100">
        <button className="btn-secondary w-full text-sm">Sair</button>
      </div>
    </aside>
  );
}
