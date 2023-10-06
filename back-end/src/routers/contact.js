import { Router } from "express";
import { list, show, create, update, destroy } from "../controllers/contact";
import { checkPermission } from "../middlewares/checkPermission";
const router = Router();

router.get("/contact", list);
router.get("/contact/:id", show);
router.post("/contact", checkPermission, create);
router.patch("/contact/:id", checkPermission, update);
router.delete("/contact/:id", checkPermission, destroy);
export default router;
