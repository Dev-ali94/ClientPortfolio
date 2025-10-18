import express from "express";
import { adminLogin, adminLogout,isAuthenticated } from "../controllers/adminController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", adminLogout);
router.get("/auth", adminAuth,isAuthenticated);

export default router;
