import { Router } from "express";
import {
  createPet,
  listPet,
  destroyPet,
  showPet,
  updatePet,
} from "../controllers/pet";
import { checkPermission } from "../middlewares/checkPermission";
const router = Router();

router.get("/pets", listPet);
router.get("/pet/:id", showPet);
router.post("/pet", checkPermission, createPet);
router.patch("/pet/:id", checkPermission, updatePet);
router.delete("/pet/:id", checkPermission, destroyPet);
export default router;
