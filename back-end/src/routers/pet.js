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
import { checkPermission } from "../middlewares/checkPermission";
const router = Router();

router.get("/pets", listPet);
router.get("/ListUserPets", listUserPet);
router.get("/pets/:id", showPet);
router.post("/pets", checkPermission,createPet);
router.put("/pets/:id",checkPermission, updatePet);
router.delete("/pets/:id", checkPermission,deletePet);
router.patch("/userPet", checkPermission,userPet);
export default router;
