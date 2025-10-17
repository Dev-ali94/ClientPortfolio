import express from "express";
import { contact,deleteContact,getAllContact } from "../controllers/ContactController.js";


const router = express.Router();

router.post("/create-contact", contact);
router.get("/get-all-contact",getAllContact);
router.delete("/:id", deleteContact);
export default router;
