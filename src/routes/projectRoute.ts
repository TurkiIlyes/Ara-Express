import express from "express";
import {
  createProjectValidator,
  updateProjectValidator,
  deleteProjectValidator,
} from "../utils/validators/projectValidator";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";
import { protect, allowedTo } from "../services/authService";
import {
  resizeProjectImage,
  uploadProjectImage,
} from "../middlewares/uploadImage/uploadProjectImage";

const router = express.Router();

/**
 * @route   GET /projects
 * @desc    Get all projects
 * @access  Public
 */

router
  .route("/")
  .get(getProjects)

  /**
   * @route   POST /projects
   * @desc    Create a new project
   * @access  Private (admin only)
   */
  .post(
    protect,
    allowedTo("admin"),
    uploadProjectImage,
    resizeProjectImage,
    createProjectValidator,
    createProject
  );

/**
 * @route   DELETE /projects/:id
 * @desc    Delete a project by ID
 * @access  Private (admin only)
 */

router
  .route("/:id")
  .delete(protect, allowedTo("admin"), deleteProjectValidator, deleteProject)
  .put(
    protect,
    allowedTo("admin"),
    uploadProjectImage,
    resizeProjectImage,
    updateProjectValidator,
    updateProject
  );

export default router;
