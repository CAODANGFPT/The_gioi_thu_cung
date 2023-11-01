import { Router } from "express";
import {
  create,
  list,
  listAppointmentData,
  show,
  update,
  updateAppointmentStatus,
} from "../controllers/appointments";

const router = Router();

router.get("/appointments", list);
router.get("/appointment/:id", show);
router.get("/getAllAppointmentData", listAppointmentData);
router.post("/appointment", create);
router.patch("/appointment/:id", update);
router.patch("/appointmentStatus/:id", updateAppointmentStatus);
export default router;
