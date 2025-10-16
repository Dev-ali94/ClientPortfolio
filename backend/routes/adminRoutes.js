import express from "express";
import { adminLogin,adminLogout, isAuthenticated } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout",adminLogout );
router.get("/auth",isAuthenticated)
export default router;
