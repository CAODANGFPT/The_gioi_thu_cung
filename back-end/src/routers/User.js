import express from "express";

import { checkPermission } from "./../middlewares/checkPermission";
import { getById, list, listUsersRole, resetPassword, updateRole } from "../controllers/user";
const router = express.Router();

router.get("/getAll", list);
router.get("/getAllUserRole", listUsersRole);
router.get("/getById/:id", getById);
router.put("/updateRole/:id", checkPermission, updateRole);
router.post("/password/reset", resetPassword);



export default router;  
