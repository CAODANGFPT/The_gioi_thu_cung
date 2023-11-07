import { Router } from "express";
import { list, show, create, update, destroy } from "../controllers/menu";
import { checkPermission } from "../middlewares/checkPermission";
const router = Router();

router.get("/menu", list);
router.get("/menu/:id", show);
router.post("/menu", checkPermission, create);
router.patch("/menu/:id", checkPermission, update);
router.delete("/menu/:id", destroy);
export default router;
