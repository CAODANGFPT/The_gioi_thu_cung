import express from "express";
import { getAll, getById, add, update, remote } from "../controllers/status";

import { checkPermission } from "./../middlewares/checkPermission";
const router = express.Router();

router.get("/status", getAll);
router.get("/status/:id", getById);
router.post("/status/", checkPermission, add);
router.put("/status/:id", checkPermission, update);
router.delete("/status/:id", checkPermission, remote);

export default router;
