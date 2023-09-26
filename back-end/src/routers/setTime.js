import { Router } from "express";
import { create, list, show, update, remote } from "../controllers/setTime";

const router = Router();

router.get("/listSetTime", list);
router.get("/setTime/:id", show);
router.post("/setTime", create);
router.patch("/setTime/:id", update);
router.delete("/setTime/:id", remote);
export default router;
