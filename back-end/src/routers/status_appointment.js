import express from "express";
import { getAll, getById, add, update, remote } from "../controllers/status_appointment";

import { checkPermission } from "./../middlewares/checkPermission";
const router = express.Router();

router.get("/status_appointment", getAll);
router.get("/status_appointment/:id", getById);
router.post("/status_appointment/", checkPermission, add);
router.put("/status_appointment/:id", checkPermission, update);
router.delete("/status_appointment/:id", checkPermission, remote);

export default router;
