import { Router } from "express";
import cron from "node-cron";

import {
  cancelHistoryAppointment,
  create,
  getAppointmentTime,
  getAppointmentUser,
  list,
  listAppointmentData,
  show,
  update,
  updateAppointmentStatus,
  updateStatusCancelAppointment,
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
router.post("/appointmentTime", getAppointmentTime);
router.patch("/cancelHistoryAppointment", cancelHistoryAppointment);
router.get("/updateStatusCancelAppointment", updateStatusCancelAppointment);

cron.schedule("*/1 * * * *", async () => {
  console.log("cron job success");
  await updateStatusCancelAppointment();
});
export default router;
