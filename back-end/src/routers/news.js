import { Router } from "express";
import { create, list, show, update, remote, listNewsUsers } from "../controllers/news";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/news", list);
router.get("/getNewsUsers", listNewsUsers);
router.get("/news/:id", show);
router.post("/news", checkPermission, create);
router.put("/news/:id", checkPermission, update);
router.delete("/news/:id", checkPermission, remote);
export default router;
