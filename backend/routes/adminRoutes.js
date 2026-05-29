// routes/adminRoutes.js

import express from "express";

import authAdmin from "../middleware/authAdmin.js";

import {
  loginAdmin,
  addProject,
  deleteProject,
  getMessages,
  editProject,
  getMessageById,
  markMessageAsRead,
  deleteMessage,
} from "../controllers/adminController.js";

const adminRouter = express.Router();


// Public Route
adminRouter.post("/login", loginAdmin);


// Protected Routes
adminRouter.post("/add-project", authAdmin, addProject);

adminRouter.delete("/delete-project/:id", authAdmin, deleteProject);

adminRouter.get("/messages", authAdmin, getMessages);

adminRouter.get("/messages/:id", authAdmin, getMessageById);

adminRouter.put("/messages/:id/read", authAdmin, markMessageAsRead);

adminRouter.delete("/messages/:id", authAdmin, deleteMessage);

adminRouter.put("/edit-project/:id", authAdmin, editProject);

export default adminRouter;