import { Router } from "express";
import {
  createPet,
  listPet,
  deletePet,
  showPet,
  updatePet,
} from "../controllers/pet";
import { checkPermission } from "../middlewares/checkPermission";
const router = Router();

router.get("/pets", listPet);
router.get("/pet/:id", showPet);
router.post("/pet", checkPermission, createPet);
router.patch("/pet/:id", checkPermission, updatePet);
router.delete("/pet/:id", checkPermission, deletePet);
export default router;
