import { render, screen, fireEvent } from "@testing-library/react";
import TransactionForm from "../TransactionForm";

const onSubmit = jest.fn();
const onClose  = jest.fn();

beforeEach(() => jest.clearAllMocks());

describe("TransactionForm", () => {
  it("renderiza o formulário", () => {
    render(<TransactionForm onSubmit={onSubmit} onClose={onClose} />);
    expect(screen.getByText("Nova Transação")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("0,00")).toBeInTheDocument();
  });

  it("categorias de despesa aparecem quando tipo é EXPENSE", () => {
    render(<TransactionForm onSubmit={onSubmit} onClose={onClose} />);
    // EXPENSE é o padrão — verifica categorias de gasto
    expect(screen.getByText("Alimentação")).toBeInTheDocument();
    expect(screen.getByText("Transporte")).toBeInTheDocument();
  });

  it("ao trocar para INCOME mostra só categorias de receita", () => {
    render(<TransactionForm onSubmit={onSubmit} onClose={onClose} />);

    fireEvent.click(screen.getByText("💰 Receita"));

    expect(screen.getByText("Salário")).toBeInTheDocument();
    expect(screen.getByText("Freelance")).toBeInTheDocument();
    expect(screen.queryByText("Alimentação")).not.toBeInTheDocument();
  });

  it("chama onClose ao clicar em Cancelar", () => {
    render(<TransactionForm onSubmit={onSubmit} onClose={onClose} />);
    fireEvent.click(screen.getByText("Cancelar"));
    expect(onClose).toHaveBeenCalled();
  });
});
