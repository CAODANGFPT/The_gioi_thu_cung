import { Router } from "express";
import {
  create,
  getProductsCate,
  getTop8,
  list,
  remote,
  show,
  update,
} from "../controllers/products";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/products", list);
router.get("/productsTop8", getTop8);
router.get("/product/:id", show);
router.get("/productCate/:id", getProductsCate);
router.post("/products", checkPermission, create);
router.put("/product/:id", checkPermission, update);
router.delete("/product/:id", checkPermission, remote);
export default router;
