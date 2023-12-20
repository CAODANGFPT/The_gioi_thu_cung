import { Router } from "express";
import { checkPermission } from "../middlewares/checkPermission";
import {
  getCountUserDay,
  getRevenueAppointmentsDay,
  getRevenueAppointmentsThisMonth,
  getRevenueThisMonth,
  getRevenueToday,
  list,
  total,
  totalRevenue,
} from "../controllers/dashboard";
const router = Router();

router.get("/dashboard", checkPermission, list);
router.get("/dashboardTotal", checkPermission, total);
router.get("/totalRevenue", totalRevenue);
router.get("/getRevenueToday", getRevenueToday);
router.get("/getRevenueThisMonth", getRevenueThisMonth);
router.get("/getCountUserDay", getCountUserDay);

// Appointments
router.get("/getRevenueAppointmentsThisMonth", getRevenueAppointmentsThisMonth);
router.get("/getRevenueAppointmentsDay", getRevenueAppointmentsDay);
export default router;
