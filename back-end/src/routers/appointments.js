import { Router } from "express";
import {
  list,
  show,
  create,
  update,
  destroy,
} from "../controllers/appointments";

const router = Router();

router.get("/appointments", list);
router.get("/appointment/:id", show);
router.post("/appointment", create);
router.patch("/appointment/:id", update);
router.delete("/appointment/:id", destroy);
export default router;
