import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  getDashboardSummary,
  getMonthlyChart,
} from "../controllers/transactionController";

const router = Router();

router.use(authenticate);

// GET /transactions
router.get("/", getTransactions);

// POST /transactions
router.post("/", createTransaction);

// DELETE /transactions/:id
router.delete("/:id", deleteTransaction);

// GET /transactions/summary
router.get("/summary", getDashboardSummary);

// GET /transactions/monthly-chart
router.get("/monthly-chart", getMonthlyChart);

export default router;
