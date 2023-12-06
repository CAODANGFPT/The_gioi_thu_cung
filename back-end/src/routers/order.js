import { Router } from "express";
import { getOrderUser, createOrderUser, getAllOrder } from "../controllers/order";

const router = Router();

router.get("/getOrderUser", getOrderUser);
router.get("/getAllOrderUser", getAllOrder);
router.post("/createOrder", createOrderUser);
export default router;
