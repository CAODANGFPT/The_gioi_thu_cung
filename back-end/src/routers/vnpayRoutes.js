// routers.js
import express from "express";
import { createPayment } from "../controllers/vnpayController";

const router = express.Router();

router.post("/create-payment", createPayment);

export default router;
