import { Router } from "express";
import { checkPermission } from "../middlewares/checkPermission";
import { list } from "../controllers/dashboard";
const router = Router();

router.get("/dashboard", checkPermission, list);

export default router;
