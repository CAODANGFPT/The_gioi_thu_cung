import express from "express";
import {
  getAll,
  getById,
  add,
  update,
  remote,
} from "../controllers/status_pet";

const router = express.Router();

router.get("/status_pet", getAll);
router.get("/status_pet/:id", getById);
router.post("/status_pet", add);
router.put("/status_pet/:id", update);
router.delete("/status_pet/:id", remote);

export default router;
