import Project from "../models/projectModel.js";
import slugify from "slugify";

export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      hero,
      overview,
      results,
      process,
      relatedArticles,
    } = req.body;
    // check title exist 
    if (!title) {
      return res.json({ success: false, message: "title is required" })
    }
    // Generate slug
    const slug = slugify(title, { lower: true, strict: true });
    // Check if slug already exists
    const existSlug = await Project.findOne({ slug });
    if (existSlug) {
      return res.json({
        success: false,
        message: "A project with this title already exists",
      });
    }

    // Build new Project 
    const project = new Project({
      title,
      slug,
      description,
      image,
      hero,
      overview,
      results,
      process,
      relatedArticles,
    });

    // Save to DB
    await project.save();

    res.json({
      success: true,
      message: "Project created successfully",
      data: project
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.json({
        success: false,
        message: "Project not found",
      });
    }
    await Project.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting project",
    });
  }
};
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().lean();
    if (!projects || projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No projects found",
      });
    }
    return res.status(200).json({
      success: true,
      count: projects.length,
      projectData: projects,
    });
  } catch (error) {
    console.error("Error in getAllProjects:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

