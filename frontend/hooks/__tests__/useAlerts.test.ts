import { renderHook, waitFor, act } from "@testing-library/react";
import { useAlerts } from "../useAlerts";

jest.mock("@/lib/api", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

import api from "@/lib/api";

const mockAlerts = [
  { id: "a1", category: "Alimentação", categoryId: "cat-3", limit: 1000, spent: 850, month: 3, year: 2026 },
  { id: "a2", category: "Lazer",       categoryId: "cat-6", limit: 500,  spent: 200, month: 3, year: 2026 },
];

beforeEach(() => {
  jest.clearAllMocks();
  (api.get as jest.Mock).mockResolvedValue({ data: mockAlerts });
});

describe("useAlerts", () => {
  it("busca alertas ao montar", async () => {
    const { result } = renderHook(() => useAlerts(3, 2026));

    await waitFor(() => {
      expect(result.current.alerts).toHaveLength(2);
    });

    expect(api.get).toHaveBeenCalledWith("/alerts/evaluated", {
      params: { month: 3, year: 2026 },
    });
  });

  it("saveAlert chama POST e refaz o fetch", async () => {
    (api.post as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useAlerts(3, 2026));
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.saveAlert({ categoryId: "cat-4", limitAmount: 300, month: 3, year: 2026 });
    });

    expect(api.post).toHaveBeenCalledWith("/alerts", expect.objectContaining({ limitAmount: 300 }));
    expect(api.get).toHaveBeenCalledTimes(2);
  });

  it("removeAlert remove da lista imediatamente", async () => {
    (api.delete as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useAlerts(3, 2026));
    await waitFor(() => expect(result.current.alerts).toHaveLength(2));

    await act(async () => {
      await result.current.removeAlert("a1");
    });

    expect(result.current.alerts).toHaveLength(1);
    expect(result.current.alerts[0].id).toBe("a2");
  });
});
