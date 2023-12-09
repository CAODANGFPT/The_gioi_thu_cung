import express from "express";
import {
  getIDInvoices,
  createInvoice,
  updateStatusCash,
  getInvoiceByAppointmentID,
} from "../controllers/PrintInvoice";

const router = express.Router();

router.get("/invoices/:id", getIDInvoices);
router.post("/createInvoice", createInvoice);
router.put("/updateStatusCash/:appointments_id", updateStatusCash);
router.get(
  "/getInvoiceByAppointmentID/:appointments_id",
  getInvoiceByAppointmentID
);
export default router;
