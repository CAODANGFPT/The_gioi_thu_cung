import { Router } from "express";
import {
  create,
  getAppointmentUser,
  list,
  listAppointmentData,
  show,
  update,
  updateAppointmentStatus,
} from "../controllers/appointments";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/appointments", list);
router.get("/appointment/:id", show);
router.get("/getAllAppointmentData", listAppointmentData);
router.get("/getAppointmentUser", checkPermission, getAppointmentUser);
router.post("/appointment", create);
router.patch("/appointment/:id", update);
router.patch("/appointmentStatus/:id", updateAppointmentStatus);
export default router;
