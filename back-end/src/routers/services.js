import { Router } from "express";
import {
  list,
  showById,
  create,
  update,
  updateIsDelete,
  getTop4Services,
} from "../controllers/services";
import { checkPermission } from "../middlewares/checkPermission";
const router = Router();

router.get("/services", list);
router.get("/services/:id", showById);
router.post("/services", checkPermission, create);
router.put("/services/:id", checkPermission, update);
router.patch("/services/block", checkPermission, updateIsDelete);
router.get("/servicesTop4", getTop4Services);

export default router;
