import { Router } from "express";
import { create, list, show, remote } from "../controllers/reviews";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/reviews", list);
router.get("/review/:id", show);
router.post("/review", checkPermission, create);
router.delete("/review/:id", checkPermission, remote);

export default router;
