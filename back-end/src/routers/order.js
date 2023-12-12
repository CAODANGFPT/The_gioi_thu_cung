import { Router } from "express";
import { getOrderUser, createOrderUser, getAllOrder, updateStatusOrder, searchOrderAdmin, updateStatusPaymentOrder } from "../controllers/order";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/getOrderUser", getOrderUser);
router.get("/getAllOrderUser", getAllOrder);
router.post("/createOrder", createOrderUser);
router.patch("/updateStatusOrder",checkPermission, updateStatusOrder);
router.patch("/updateStatusPaymentOrder",checkPermission, updateStatusPaymentOrder);
router.post("/searchOrder", searchOrderAdmin);
export default router;
