import { render, screen, fireEvent } from "@testing-library/react";
import AlertList from "../AlertList";
import type { EvaluatedAlert } from "@/hooks/useAlerts";

const alerts: EvaluatedAlert[] = [
  { id: "a1", category: "Alimentação", categoryId: "cat-3", limit: 1000, spent: 500,  month: 3, year: 2026 },
  { id: "a2", category: "Lazer",       categoryId: "cat-6", limit: 500,  spent: 430,  month: 3, year: 2026 },
  { id: "a3", category: "Saúde",       categoryId: "cat-5", limit: 300,  spent: 350,  month: 3, year: 2026 },
];

describe("AlertList", () => {
  it("exibe estado vazio quando não há alertas", () => {
    render(<AlertList alerts={[]} onDelete={jest.fn()} />);
    expect(screen.getByText(/nenhum alerta definido/i)).toBeInTheDocument();
  });

  it("renderiza o nome de cada categoria", () => {
    render(<AlertList alerts={alerts} onDelete={jest.fn()} />);
    expect(screen.getByText("Alimentação")).toBeInTheDocument();
    expect(screen.getByText("Lazer")).toBeInTheDocument();
    expect(screen.getByText("Saúde")).toBeInTheDocument();
  });

  it("exibe ✅ quando gasto está abaixo de 80%", () => {
    render(<AlertList alerts={[alerts[0]]} onDelete={jest.fn()} />);
    expect(screen.getByText("✅")).toBeInTheDocument();
  });

  it("exibe ⚠️ quando gasto está entre 80% e 100%", () => {
    // Lazer: 430/500 = 86%
    render(<AlertList alerts={[alerts[1]]} onDelete={jest.fn()} />);
    expect(screen.getByText("⚠️")).toBeInTheDocument();
  });

  it("exibe 🚨 quando gasto ultrapassou o limite", () => {
    // Saúde: 350/300 = 116%
    render(<AlertList alerts={[alerts[2]]} onDelete={jest.fn()} />);
    expect(screen.getByText("🚨")).toBeInTheDocument();
  });

  it("chama onDelete com o id correto ao remover", () => {
    const onDelete = jest.fn();
    render(<AlertList alerts={alerts} onDelete={onDelete} />);

    const buttons = screen.getAllByTitle("Remover alerta");
    fireEvent.click(buttons[0]);

    expect(onDelete).toHaveBeenCalledWith("a1");
  });
});
