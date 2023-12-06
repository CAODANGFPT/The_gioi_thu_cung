import { Router } from "express";
import { getOrderUser, createOrderUser, getAllOrder, updateStatusOrder } from "../controllers/order";

const router = Router();

router.get("/getOrderUser", getOrderUser);
router.get("/getAllOrderUser", getAllOrder);
router.post("/createOrder", createOrderUser);
router.patch("/updateStatusOrder", updateStatusOrder);
export default router;
