import { Router } from "express";
import {
  createPet,
  deletePet,
  listPet,
  listUserPet,
  showPet,
  updatePet,
} from "../controllers/pet";
const router = Router();

router.get("/pets", listPet);
router.get("/ListUserPets/:id", listUserPet);
router.get("/pets/:id", showPet);
router.post("/pets", createPet);
router.patch("/pets/:id", updatePet);
router.delete("/pets/:id", deletePet);
export default router;
