import express from "express";
import { createComments,getAllComments,createReplay } from "../controllers/commentController.js";

const router = express.Router();

router.post("/create-comment", createComments);
router.post("/create-replay", createReplay);
router.get("/get-all-comment", getAllComments);
export default router;
