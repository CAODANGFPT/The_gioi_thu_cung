import { Router } from "express";
import { list, showById, create, update, deletePe } from "../controllers/pethouse";
import { checkPermission } from "../middlewares/checkPermission";
const router = Router();

router.get("/pethouse", list);
router.get("/pethouse/:id", showById);
router.post("/pethouse", checkPermission, create);
router.put("/pethouse/:id", checkPermission, update);
router.delete("/pethouse/:id", checkPermission, deletePe);

export default router;
