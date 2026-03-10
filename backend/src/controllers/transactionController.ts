import { Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../middlewares/authMiddleware";

export async function getTransactions(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user!.userId;
  const { month, year, categoryId } = req.query;

  const where: Record<string, unknown> = { userId };

  if (month && year) {
    const start = new Date(Number(year), Number(month) - 1, 1);
    const end = new Date(Number(year), Number(month), 0, 23, 59, 59);
    where.date = { gte: start, lte: end };
  }

  if (categoryId) {
    where.categoryId = String(categoryId);
  }

  const transactions = await prisma.transaction.findMany({
    where,
    include: { category: true },
    orderBy: { date: "desc" },
  });

  res.json(transactions);
}

export async function createTransaction(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user!.userId;
  const { type, amount, description, categoryId, date } = req.body;

  if (!type || !amount || !categoryId || !date) {
    res.status(400).json({ message: "type, amount, categoryId e date são obrigatórios." });
    return;
  }

  const transaction = await prisma.transaction.create({
    data: {
      userId,
      type,
      amount,
      description,
      categoryId,
      date: new Date(date),
    },
    include: { category: true },
  });

  res.status(201).json(transaction);
}

export async function deleteTransaction(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user!.userId;
  const { id } = req.params;

  const tx = await prisma.transaction.findUnique({ where: { id } });

  if (!tx || tx.userId !== userId) {
    res.status(404).json({ message: "Transação não encontrada." });
    return;
  }

  await prisma.transaction.delete({ where: { id } });
  res.status(204).send();
}

export async function getDashboardSummary(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user!.userId;
  const now = new Date();
  const month = Number(req.query.month ?? now.getMonth() + 1);
  const year = Number(req.query.year ?? now.getFullYear());

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);

  const transactions = await prisma.transaction.findMany({
    where: { userId, date: { gte: start, lte: end } },
    include: { category: true },
  });

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const byCategory = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce<Record<string, { name: string; total: number }>>((acc, t) => {
      const key = t.categoryId;
      if (!acc[key]) acc[key] = { name: t.category.name, total: 0 };
      acc[key].total += Number(t.amount);
      return acc;
    }, {});

  const recent = await prisma.transaction.findMany({
    where: { userId },
    include: { category: true },
    orderBy: { date: "desc" },
    take: 5,
  });

  res.json({
    balance: totalIncome - totalExpense,
    totalIncome,
    totalExpense,
    byCategory: Object.values(byCategory),
    recentTransactions: recent,
  });
}
