import { Router } from "express";
import { getOrderUser, createOrderUser } from "../controllers/order";

const router = Router();

router.get("/getOrderUser", getOrderUser);
router.post("/createOrder", createOrderUser);
export default router;
