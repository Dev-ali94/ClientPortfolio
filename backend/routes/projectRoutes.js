import express from "express";
import { createProject,deleteProject,getAllProjects } from "../controllers/projectController.js";
import { deleteContact } from "../controllers/ContactController.js";
const router = express.Router();

router.post("/create-project", createProject);
router.delete("/:id", deleteProject);
router.get("/get-all-project", getAllProjects);


export default router;
