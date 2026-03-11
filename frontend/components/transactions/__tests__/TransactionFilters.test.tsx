import { render, screen, fireEvent } from "@testing-library/react";
import TransactionFilters from "../TransactionFilters";
import type { TransactionFilters as Filters } from "@/hooks/useTransactions";

const defaultFilters: Filters = { month: 3, year: 2026, categoryId: "" };

describe("TransactionFilters", () => {
  it("renderiza os três selects", () => {
    render(<TransactionFilters filters={defaultFilters} onChange={jest.fn()} />);
    expect(screen.getByDisplayValue("Março")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2026")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Todas as categorias")).toBeInTheDocument();
  });

  it("chama onChange ao trocar o mês", () => {
    const onChange = jest.fn();
    render(<TransactionFilters filters={defaultFilters} onChange={onChange} />);

    fireEvent.change(screen.getByDisplayValue("Março"), { target: { value: "5" } });

    expect(onChange).toHaveBeenCalledWith({ ...defaultFilters, month: 5 });
  });

  it("chama onChange ao trocar o ano", () => {
    const onChange = jest.fn();
    render(<TransactionFilters filters={defaultFilters} onChange={onChange} />);

    fireEvent.change(screen.getByDisplayValue("2026"), { target: { value: "2025" } });

    expect(onChange).toHaveBeenCalledWith({ ...defaultFilters, year: 2025 });
  });

  it("chama onChange ao selecionar uma categoria", () => {
    const onChange = jest.fn();
    render(<TransactionFilters filters={defaultFilters} onChange={onChange} />);

    fireEvent.change(screen.getByDisplayValue("Todas as categorias"), { target: { value: "cat-3" } });

    expect(onChange).toHaveBeenCalledWith({ ...defaultFilters, categoryId: "cat-3" });
  });
});
