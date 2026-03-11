import { renderHook, waitFor } from "@testing-library/react";
import { useDashboard } from "../useDashboard";

jest.mock("@/lib/api", () => ({
  __esModule: true,
  default: { get: jest.fn() },
}));

import api from "@/lib/api";

const mockSummary = {
  balance: 3450,
  totalIncome: 7500,
  totalExpense: 4050,
  byCategory: [{ name: "Alimentação", total: 1200 }],
  recentTransactions: [],
};

const mockChart = Array.from({ length: 12 }, (_, i) => ({
  month: i + 1,
  income: i === 2 ? 7500 : 0,  // março com dados
  expense: i === 2 ? 4050 : 0,
}));

beforeEach(() => {
  jest.clearAllMocks();
  (api.get as jest.Mock)
    .mockResolvedValueOnce({ data: mockSummary }) // summary
    .mockResolvedValueOnce({ data: mockChart });  // monthly-chart
});

describe("useDashboard", () => {
  it("busca summary e chart em paralelo", async () => {
    const { result } = renderHook(() => useDashboard(3, 2026));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.summary).not.toBeNull();
    });

    expect(api.get).toHaveBeenCalledTimes(2);
    expect(api.get).toHaveBeenCalledWith("/transactions/summary", { params: { month: 3, year: 2026 } });
    expect(api.get).toHaveBeenCalledWith("/transactions/monthly-chart", { params: { year: 2026 } });
  });

  it("popula summary corretamente", async () => {
    const { result } = renderHook(() => useDashboard(3, 2026));

    await waitFor(() => expect(result.current.summary?.balance).toBe(3450));
  });

  it("filtra só meses com dados no gráfico", async () => {
    const { result } = renderHook(() => useDashboard(3, 2026));

    await waitFor(() => expect(result.current.loading).toBe(false));

    // Dos 12 meses, só março tem dados
    expect(result.current.monthly).toHaveLength(1);
    expect(result.current.monthly[0].month).toBe("Mar");
  });

  it("expõe error quando a API falha", async () => {
    (api.get as jest.Mock).mockReset();
    (api.get as jest.Mock).mockRejectedValue(new Error("fail"));

    const { result } = renderHook(() => useDashboard(3, 2026));

    await waitFor(() => {
      expect(result.current.error).toBe("Erro ao carregar dashboard.");
    });
  });
});
