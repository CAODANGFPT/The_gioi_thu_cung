import express from "express";

import { checkPermission } from "./../middlewares/checkPermission";
import { getById, list, listUsersRole, resetPassword, updateIsDelete, updateRole } from "../controllers/user";
const router = express.Router();

router.get("/getAll", list);
router.get("/getAllUserRole", listUsersRole);
router.get("/getById/:id", getById);
router.put("/updateRole", checkPermission, updateRole);
router.post("/password/reset", resetPassword);
router.patch("/user/block", checkPermission, updateIsDelete)
router.patch("/user/role", checkPermission, updateRole)



export default router;  
