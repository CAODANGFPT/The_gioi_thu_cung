import { Router } from "express";
import { list, show, create, update, destroy } from "../controllers/appointments";
import { checkPermission } from "../middlewares/checkPermission";
const router = Router();

router.get("/appointments", list);
router.get("/appointment/:id", show);
router.post("/appointment", checkPermission, create);
router.patch("/appointment/:id", checkPermission, update);
router.delete("/appointment/:id", checkPermission, destroy);
export default router;