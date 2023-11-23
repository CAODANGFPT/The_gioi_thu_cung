import { Router } from "express";
import {
  createPet,
  deletePet,
  listPet,
  listUserPet,
  showPet,
  updatePet,
  userPet,
} from "../controllers/pet";
const router = Router();

router.get("/pets", listPet);
router.get("/ListUserPets", listUserPet);
router.get("/pets/:id", showPet);
router.post("/pets", createPet);
router.patch("/pets/:id", updatePet);
router.delete("/pets/:id", deletePet);
router.patch("/userPet", userPet);
export default router;
