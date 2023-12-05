import { Router } from "express";
import { checkPermission } from "../middlewares/checkPermission";
import { list, total } from "../controllers/dashboard";
const router = Router();

router.get("/dashboard", checkPermission, list);
router.get("/dashboardTotal", checkPermission, total);

export default router;
