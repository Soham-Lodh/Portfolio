// routes/userRoutes.js

import express from "express";

import {
  getAllProjects,
  getProjectById,
  sendMessage,
  getPortfolioStats,
} from "../controllers/userController.js";

const userRouter = express.Router();

// Get portfolio stats
userRouter.get("/stats", getPortfolioStats);

// Get all projects
userRouter.get("/projects", getAllProjects);

// Get project by ID
userRouter.get("/projects/:id", getProjectById);

// Send contact message
userRouter.post("/contact", sendMessage);

export default userRouter;
