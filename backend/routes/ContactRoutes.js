import express from "express";
import { contact,deleteContact,getAllContact } from "../controllers/ContactController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/create-contact", contact);
router.get("/get-all-contact",adminAuth,getAllContact);
router.delete("/:id", deleteContact);
export default router;
