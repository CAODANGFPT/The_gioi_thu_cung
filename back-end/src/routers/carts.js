import { Router } from "express";
import {
  getIDlistCarts,
  createCarts,
  updateQuantityCarts,
  increaseQuantityCarts,
  decreaseQuantityCarts,
  deleteIDCarts,
} from "../controllers/carts";

const router = Router();

router.get("/getUserListCarts", getIDlistCarts);
router.post("/addCarts", createCarts);
router.patch("/updateCarts/:id", updateQuantityCarts);
router.patch("/increaseQuantityCarts/:id", increaseQuantityCarts);
router.patch("/decreaseQuantityCarts/:id", decreaseQuantityCarts);
router.delete("/deleteIDCarts", deleteIDCarts);

export default router;
