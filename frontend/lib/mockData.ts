export const mockSummary = {
  balance: 3450.0,
  totalIncome: 7500.0,
  totalExpense: 4050.0,
};

export const mockMonthlyData = [
  { month: "Out", income: 7200, expense: 3800 },
  { month: "Nov", income: 7500, expense: 4200 },
  { month: "Dez", income: 8100, expense: 5100 },
  { month: "Jan", income: 7500, expense: 4050 },
];

export const mockCategoryData = [
  { name: "Alimentação", total: 1200 },
  { name: "Transporte", total: 650 },
  { name: "Saúde", total: 400 },
  { name: "Lazer", total: 800 },
  { name: "Outros", total: 1000 },
];

export const mockRecentTransactions = [
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
    amount: 7500.0,
    description: "Salário",
    category: { name: "Salário" },
    date: "2026-03-05T08:00:00Z",
  },
  {
    id: "3",
    type: "EXPENSE" as const,
    amount: 45.0,
    description: "Uber",
    category: { name: "Transporte" },
    date: "2026-03-04T19:30:00Z",
  },
  {
    id: "4",
    type: "EXPENSE" as const,
    amount: 120.0,
    description: "Academia",
    category: { name: "Saúde" },
    date: "2026-03-03T07:00:00Z",
  },
  {
    id: "5",
    type: "EXPENSE" as const,
    amount: 59.9,
    description: "Netflix + Spotify",
    category: { name: "Lazer" },
    date: "2026-03-01T00:00:00Z",
  },
];

export const mockAlerts = [
  { category: "Lazer", spent: 800, limit: 900 },
  { category: "Alimentação", spent: 1200, limit: 1300 },
];
