import express from "express";
import { adminLogin, adminLogout } from "../controllers/adminController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", adminLogout);

// Protect any route with adminAuth
router.get("/auth", adminAuth, (req, res) => {
  return res.json({ success: true });
});

export default router;
