import { Router } from "express";
import {
  cancelHistoryAppointment,
  create,
  getAppointmentTime,
  getAppointmentUser,
  getAppointmentUserStatus,
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
router.get("/getAppointmentUser", getAppointmentUser);
router.get("/getAppointmentUserStatus/:status_id", getAppointmentUserStatus);


router.post("/appointment", create);
router.patch("/appointment/:id", update);
router.patch("/appointmentStatus/:id", updateAppointmentStatus);
router.post("/appointmentTime", getAppointmentTime);
router.patch("/cancelHistoryAppointment", cancelHistoryAppointment);
export default router;
