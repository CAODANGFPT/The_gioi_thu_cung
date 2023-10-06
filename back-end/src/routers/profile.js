import { Router } from "express";
import { list, show, create, update, destroy } from "../controllers/profile";
import { checkPermission } from "../middlewares/checkPermission";
const router = Router();

router.get("/profile", list);
router.get("/profile/:id", show);
router.post("/profile", checkPermission, create);
router.patch("/profile/:id", checkPermission, update);
router.delete("/profile/:id", checkPermission, destroy);
export default router;
