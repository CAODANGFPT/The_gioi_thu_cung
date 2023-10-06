import { Router } from "express";
import {
  createBreed,
  listBreed,
  deleteBreed,
  showBreed,
  updateBreed,
} from "../controllers/breed";
import { checkPermission } from "../middlewares/checkPermission";
const router = Router();

router.get("/breeds", listBreed);
router.get("/breed/:id", showBreed);
router.post("/breed",checkPermission, createBreed);
router.patch("/breed/:id",checkPermission, updateBreed);
router.delete("/breed/:id",checkPermission, deleteBreed);
export default router;
