import { render, screen } from "@testing-library/react";
import RecentTransactions from "../RecentTransactions";

const mockTransactions = [
  {
    id: "1",
    type: "EXPENSE" as const,
    amount: 89.9,
    description: "Supermercado",
    category: { name: "Alimentação" },
    date: "2026-03-08T10:00:00Z",
  },
  {
    id: "2",
    type: "INCOME" as const,
    amount: 7500,
    description: "Salário",
    category: { name: "Salário" },
    date: "2026-03-05T08:00:00Z",
  },
];

describe("RecentTransactions", () => {
  it("renders transaction descriptions", () => {
    render(<RecentTransactions transactions={mockTransactions} />);
    expect(screen.getByText("Supermercado")).toBeInTheDocument();
    expect(screen.getByText("Salário")).toBeInTheDocument();
  });

  it("shows negative sign for expenses", () => {
    render(<RecentTransactions transactions={mockTransactions} />);
    expect(screen.getByText(/-R\$\s*89/)).toBeInTheDocument();
  });

  it("shows positive sign for income", () => {
    render(<RecentTransactions transactions={mockTransactions} />);
    expect(screen.getByText(/\+R\$\s*7\.500/)).toBeInTheDocument();
  });
});
