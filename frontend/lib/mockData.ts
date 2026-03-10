export const mockCategories = [
  { id: "cat-1", name: "Salário",      type: "INCOME"  },
  { id: "cat-2", name: "Freelance",    type: "INCOME"  },
  { id: "cat-3", name: "Alimentação",  type: "EXPENSE" },
  { id: "cat-4", name: "Transporte",   type: "EXPENSE" },
  { id: "cat-5", name: "Saúde",        type: "EXPENSE" },
  { id: "cat-6", name: "Lazer",        type: "EXPENSE" },
  { id: "cat-7", name: "Outros",       type: null      },
] as const;

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
  { name: "Transporte",  total: 650  },
  { name: "Saúde",       total: 400  },
  { name: "Lazer",       total: 800  },
  { name: "Outros",      total: 1000 },
];

export type MockTransaction = {
  id: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  description: string;
  categoryId: string;
  category: { name: string };
  date: string;
};

export const mockTransactions: MockTransaction[] = [
  { id: "1", type: "INCOME",  amount: 7500.00, description: "Salário março",    categoryId: "cat-1", category: { name: "Salário"     }, date: "2026-03-05T08:00:00Z" },
  { id: "2", type: "EXPENSE", amount: 89.90,   description: "Supermercado",     categoryId: "cat-3", category: { name: "Alimentação" }, date: "2026-03-08T10:00:00Z" },
  { id: "3", type: "EXPENSE", amount: 45.00,   description: "Uber",             categoryId: "cat-4", category: { name: "Transporte"  }, date: "2026-03-04T19:30:00Z" },
  { id: "4", type: "EXPENSE", amount: 120.00,  description: "Academia",         categoryId: "cat-5", category: { name: "Saúde"       }, date: "2026-03-03T07:00:00Z" },
  { id: "5", type: "EXPENSE", amount: 59.90,   description: "Netflix + Spotify", categoryId: "cat-6", category: { name: "Lazer"       }, date: "2026-03-01T00:00:00Z" },
  { id: "6", type: "INCOME",  amount: 1200.00, description: "Freelance site",   categoryId: "cat-2", category: { name: "Freelance"   }, date: "2026-02-20T14:00:00Z" },
  { id: "7", type: "EXPENSE", amount: 350.00,  description: "Farmácia",         categoryId: "cat-5", category: { name: "Saúde"       }, date: "2026-02-18T11:00:00Z" },
  { id: "8", type: "EXPENSE", amount: 200.00,  description: "Show de música",   categoryId: "cat-6", category: { name: "Lazer"       }, date: "2026-02-15T21:00:00Z" },
  { id: "9", type: "INCOME",  amount: 7500.00, description: "Salário fevereiro", categoryId: "cat-1", category: { name: "Salário"    }, date: "2026-02-05T08:00:00Z" },
];

export const mockRecentTransactions = mockTransactions.slice(0, 5);

export const mockAlerts = [
  { category: "Lazer",       spent: 800,  limit: 900  },
  { category: "Alimentação", spent: 1200, limit: 1300 },
];
