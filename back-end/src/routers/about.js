import { Router } from "express";
import { show, update } from "../controllers/about";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/about/:id", show);
router.patch("/about/:id", checkPermission, update);
export default router;
