import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { getEvaluatedAlerts, upsertAlert, deleteAlert } from "../controllers/alertController";

const router = Router();

router.use(authenticate);

// GET  /alerts/evaluated?month=X&year=Y
router.get("/evaluated", getEvaluatedAlerts);

// POST /alerts  (cria ou atualiza via upsert)
router.post("/", upsertAlert);

// DELETE /alerts/:id
router.delete("/:id", deleteAlert);

export default router;
