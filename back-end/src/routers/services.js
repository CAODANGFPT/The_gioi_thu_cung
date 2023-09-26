import { Router } from "express";
import { list , showById , create , update , deleteSe} from "../controllers/services";
import { checkPermission } from "../middlewares/checkPermission";
const router = Router();

router.get("/services", list);
router.get("/services/:id", showById);
router.post("/services",checkPermission, create);
router.put("/services/:id",checkPermission, update);
router.delete("/services/:id",checkPermission, deleteSe);

export default router;
