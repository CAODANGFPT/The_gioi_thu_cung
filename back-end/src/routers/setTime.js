import { Router } from "express";
import { create, list, show, update, remote } from "../controllers/setTime";
import {checkPermission} from "../middlewares/checkPermission";

const router = Router();

router.get("/listSetTime", list);
router.get("/setTime/:id", show);
router.post("/setTime",checkPermission, create);
router.patch("/setTime/:id",checkPermission, update);
router.delete("/setTime/:id",checkPermission, remote);
export default router;
