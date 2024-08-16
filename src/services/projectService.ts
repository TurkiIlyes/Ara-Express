import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Project from "../models/Project";
import ApiError from "../utils/ApiError";

// @desc    Get list of project
// @route   GET /api/v1/project
// @access  Public
export const getProjects = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const projects = await Project.find();
    res.status(200).json({ data: projects });
  }
);

// @desc    Create project
// @route   POST  /api/v1/project
// @access  Private/Admin-Manager
export const createProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newProject = await Project.create(req.body);
    res.status(201).json({ data: newProject });
  }
);

export const updateProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProject) {
      return next(new ApiError("Project not found", 404));
    }

    res.status(200).json({ data: updatedProject });
  }
);

// @desc    Delete project
// @route   DELETE /api/v1/project/:id
// @access  Private/Admin
export const deleteProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return next(new ApiError("No project found with that ID", 404));
    }
    res.status(204).json({ data: null });
  }
);
