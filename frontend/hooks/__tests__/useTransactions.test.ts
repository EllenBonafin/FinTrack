import { renderHook, waitFor, act } from "@testing-library/react";
import { useTransactions } from "../useTransactions";

jest.mock("@/lib/api", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

import api from "@/lib/api";

const mockTransactions = [
  { id: "1", type: "EXPENSE", amount: 100, description: "Test", categoryId: "cat-3", category: { name: "Alimentação" }, date: "2026-03-01T00:00:00Z" },
  { id: "2", type: "INCOME",  amount: 500, description: "Sal",  categoryId: "cat-1", category: { name: "Salário"     }, date: "2026-03-05T00:00:00Z" },
];

beforeEach(() => {
  jest.clearAllMocks();
  (api.get as jest.Mock).mockResolvedValue({ data: mockTransactions });
});

describe("useTransactions", () => {
  it("busca transações ao montar", async () => {
    const { result } = renderHook(() => useTransactions());

    await waitFor(() => {
      expect(result.current.transactions).toHaveLength(2);
    });

    expect(api.get).toHaveBeenCalledWith("/transactions", expect.objectContaining({
      params: expect.objectContaining({ month: expect.any(String), year: expect.any(String) }),
    }));
  });

  it("mostra loading durante o fetch", async () => {
    const { result } = renderHook(() => useTransactions());
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
  });

  it("expõe error quando a API falha", async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error("network error"));

    const { result } = renderHook(() => useTransactions());

    await waitFor(() => {
      expect(result.current.error).toBe("Erro ao carregar transações.");
    });
  });

  it("addTransaction chama POST e refaz o fetch", async () => {
    (api.post as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useTransactions());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.addTransaction({
        type: "EXPENSE", amount: 50, description: "Uber",
        categoryId: "cat-4", date: "2026-03-10T00:00:00Z",
      });
    });

    expect(api.post).toHaveBeenCalledWith("/transactions", expect.objectContaining({ amount: 50 }));
    expect(api.get).toHaveBeenCalledTimes(2); // mount + após add
  });

  it("deleteTransaction remove da lista imediatamente", async () => {
    (api.delete as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useTransactions());
    await waitFor(() => expect(result.current.transactions).toHaveLength(2));

    await act(async () => {
      await result.current.deleteTransaction("1");
    });

    expect(result.current.transactions).toHaveLength(1);
    expect(result.current.transactions[0].id).toBe("2");
  });
});
