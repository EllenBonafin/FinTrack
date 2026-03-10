import { render, screen } from "@testing-library/react";
import BalanceCard from "../BalanceCard";

describe("BalanceCard", () => {
  const props = {
    balance: 3450,
    totalIncome: 7500,
    totalExpense: 4050,
  };

  it("renders balance value", () => {
    render(<BalanceCard {...props} />);
    expect(screen.getByText(/R\$\s*3\.450/)).toBeInTheDocument();
  });

  it("renders income value", () => {
    render(<BalanceCard {...props} />);
    expect(screen.getByText(/R\$\s*7\.500/)).toBeInTheDocument();
  });

  it("renders expense value", () => {
    render(<BalanceCard {...props} />);
    expect(screen.getByText(/R\$\s*4\.050/)).toBeInTheDocument();
  });

  it("renders section labels", () => {
    render(<BalanceCard {...props} />);
    expect(screen.getByText("Saldo Atual")).toBeInTheDocument();
    expect(screen.getByText("Receitas")).toBeInTheDocument();
    expect(screen.getByText("Despesas")).toBeInTheDocument();
  });
});
