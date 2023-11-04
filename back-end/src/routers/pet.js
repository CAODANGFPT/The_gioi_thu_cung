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
router.get("/pets/:id", showPet);
router.post("/pets", createPet);
router.patch("/pets/:id", checkPermission, updatePet);
router.delete("/pets/:id", checkPermission, deletePet);
export default router;
