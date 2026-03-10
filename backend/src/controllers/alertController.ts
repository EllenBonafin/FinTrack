import { Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../middlewares/authMiddleware";

export async function getEvaluatedAlerts(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user!.userId;
  const now = new Date();
  const month = Number(req.query.month ?? now.getMonth() + 1);
  const year  = Number(req.query.year  ?? now.getFullYear());

  const alerts = await prisma.alert.findMany({
    where: { userId, month, year },
    include: { category: true },
  });

  if (alerts.length === 0) {
    res.json([]);
    return;
  }

  // Busca o total gasto por categoria no mês — uma query só
  const start = new Date(year, month - 1, 1);
  const end   = new Date(year, month, 0, 23, 59, 59);

  const transactions = await prisma.transaction.findMany({
    where: { userId, type: "EXPENSE", date: { gte: start, lte: end } },
    select: { categoryId: true, amount: true },
  });

  // Agrega gastos por categoryId
  const spentMap = transactions.reduce<Record<string, number>>((acc, tx) => {
    acc[tx.categoryId] = (acc[tx.categoryId] ?? 0) + Number(tx.amount);
    return acc;
  }, {});

  const evaluated = alerts.map((alert) => ({
    id:          alert.id,
    category:    alert.category.name,
    categoryId:  alert.categoryId,
    limit:       Number(alert.limitAmount),
    spent:       spentMap[alert.categoryId] ?? 0,
    month:       alert.month,
    year:        alert.year,
  }));

  res.json(evaluated);
}

export async function upsertAlert(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user!.userId;
  const { categoryId, limitAmount, month, year } = req.body;

  if (!categoryId || !limitAmount || !month || !year) {
    res.status(400).json({ message: "categoryId, limitAmount, month e year são obrigatórios." });
    return;
  }

  const alert = await prisma.alert.upsert({
    where: {
      userId_categoryId_month_year: {
        userId,
        categoryId,
        month: Number(month),
        year:  Number(year),
      },
    },
    create: {
      userId,
      categoryId,
      limitAmount: Number(limitAmount),
      month: Number(month),
      year:  Number(year),
    },
    update: { limitAmount: Number(limitAmount) },
    include: { category: true },
  });

  res.status(201).json(alert);
}

export async function deleteAlert(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user!.userId;
  const { id }  = req.params;

  const alert = await prisma.alert.findUnique({ where: { id } });

  if (!alert || alert.userId !== userId) {
    res.status(404).json({ message: "Alerta não encontrado." });
    return;
  }

  await prisma.alert.delete({ where: { id } });
  res.status(204).send();
}
