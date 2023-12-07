import { Router } from "express";
import { create, list, deleteLogo, showLogoById, update } from "../controllers/logo";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/logo", list);
router.get("/logo/:id", showLogoById);
router.post("/logo", checkPermission, create);
router.patch("/editLogo", checkPermission, update);
router.delete("/logo/:id", checkPermission, deleteLogo);
export default router;
