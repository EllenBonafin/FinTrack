import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  getDashboardSummary,
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

export default router;
