import { Router } from "express";
import { list, show, create, update, destroy, listMenuMenuType } from "../controllers/menu";
import { checkPermission } from "../middlewares/checkPermission";
const router = Router();

router.get("/menu", list);
router.get("/getMenuMenuType", listMenuMenuType);
router.get("/menu/:id", show);
router.post("/menu", checkPermission, create);
router.put("/edit/:id", checkPermission, update);
router.delete("/menu/:id", destroy);
export default router;
