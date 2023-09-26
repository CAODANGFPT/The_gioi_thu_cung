import { Router } from "express";
import {
  createBreed,
  listBreed,
  destroyBreed,
  showBreed,
  updateBreed,
} from "../controllers/breed";

const router = Router();

router.get("/breed", listBreed);
router.get("/breed/:id", showBreed);
router.post("/breed", createBreed);
router.patch("/breed/:id", updateBreed);
router.delete("/breed/:id", destroyBreed);
export default router;
