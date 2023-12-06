import express from "express";
import {
  getIDInvoices,
  createInvoice,
  updateStatusCash,
} from "../controllers/PrintInvoice";

const router = express.Router();

router.get("/invoices/:id", getIDInvoices);
router.post("/createInvoice", createInvoice);
router.put("/updateStatusCash/:appointments_id", updateStatusCash);

export default router;
