import { Router } from "express";
import {
  createPet,
  listPet,
  destroyPet,
  showPet,
  updatePet,
} from "../controllers/pet";

const router = Router();

router.get("/pets", listPet);
router.get("/pets/:id", showPet);
router.post("/pets", createPet);
router.patch("/pets/:id", updatePet);
router.delete("/pets/:id", destroyPet);
export default router;
