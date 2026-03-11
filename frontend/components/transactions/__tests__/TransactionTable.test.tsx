import { render, screen, fireEvent } from "@testing-library/react";
import TransactionTable from "../TransactionTable";

const transactions = [
  { id: "1", type: "EXPENSE" as const, amount: 89.9,  description: "Supermercado", categoryId: "cat-3", category: { name: "Alimentação" }, date: "2026-03-08T10:00:00Z" },
  { id: "2", type: "INCOME"  as const, amount: 7500,  description: "Salário",      categoryId: "cat-1", category: { name: "Salário"     }, date: "2026-03-05T08:00:00Z" },
];

describe("TransactionTable", () => {
  it("renderiza as descrições das transações", () => {
    render(<TransactionTable transactions={transactions} onDelete={jest.fn()} />);
    expect(screen.getByText("Supermercado")).toBeInTheDocument();
    // "Salário" aparece na descrição e na categoria — verifica que há pelo menos um
    expect(screen.getAllByText("Salário").length).toBeGreaterThan(0);
  });

  it("exibe sinal negativo para despesas e positivo para receitas", () => {
    render(<TransactionTable transactions={transactions} onDelete={jest.fn()} />);
    expect(screen.getByText(/-R\$\s*89/)).toBeInTheDocument();
    expect(screen.getByText(/\+R\$\s*7\.500/)).toBeInTheDocument();
  });

  it("chama onDelete com o id correto ao clicar em ×", () => {
    const onDelete = jest.fn();
    render(<TransactionTable transactions={transactions} onDelete={onDelete} />);

    const buttons = screen.getAllByTitle("Excluir");
    fireEvent.click(buttons[0]);

    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("exibe estado vazio quando não há transações", () => {
    render(<TransactionTable transactions={[]} onDelete={jest.fn()} />);
    expect(screen.getByText(/nenhuma transação encontrada/i)).toBeInTheDocument();
  });
});
