import { Router } from "express";
import { list , showById , create , update , deleteSe} from "../controllers/services";

const router = Router();

router.get("/services", list);
router.get("/services/:id", showById);
router.post("/services", create);
router.put("/services/:id", update);
router.delete("/services/:id", deleteSe);

export default router;
