// controllers/adminController.js

import jwt from "jsonwebtoken";
import validator from "validator";

import projectModel from "../models/projectModel.js";
import contactModel from "../models/contactModel.js";


// ======================
// COMMON VALIDATION
// ======================

const validateProjectData = ({
  title,
  description,
  domain,
  githubLink,
  liveLink,
}) => {

  // ======================
  // TITLE VALIDATION
  // ======================

  if (!title || validator.isEmpty(title.trim())) {
    return "Title is required";
  }

  if (
    !validator.isLength(title.trim(), {
      min: 3,
      max: 100,
    })
  ) {
    return "Title must be between 3 and 100 characters";
  }

  // ======================
  // DESCRIPTION VALIDATION
  // ======================

  if (
    !description ||
    validator.isEmpty(description.trim())
  ) {
    return "Description is required";
  }

  if (
    !validator.isLength(description.trim(), {
      min: 20,
      max: 2000,
    })
  ) {
    return "Description must be between 20 and 2000 characters";
  }

  // ======================
  // DOMAIN VALIDATION
  // ======================

  if (!domain || validator.isEmpty(domain.trim())) {
    return "Domain is required";
  }

  const validDomains = ["Web Development", "AI/ML"];
  if (!validDomains.includes(domain.trim())) {
    return "Domain must be either 'Web Development' or 'AI/ML'";
  }

  // ======================
  // GITHUB LINK VALIDATION
  // ======================

  if (
    !githubLink ||
    validator.isEmpty(githubLink.trim())
  ) {
    return "GitHub link is required";
  }

  if (
    !validator.isURL(githubLink, {
      protocols: ["http", "https"],
      require_protocol: true,
    })
  ) {
    return "Invalid GitHub URL";
  }

  // Only allow Soham-Lodh repositories
  const githubPattern =
    /^https?:\/\/(www\.)?github\.com\/Soham-Lodh\/.+$/;

  if (!githubPattern.test(githubLink)) {
    return "GitHub link must belong to Soham-Lodh";
  }

  // ======================
  // LIVE LINK VALIDATION
  // ======================

  if (
    !liveLink ||
    validator.isEmpty(liveLink.trim())
  ) {
    return "Live project link is required";
  }

  if (
    !validator.isURL(liveLink, {
      protocols: ["http", "https"],
      require_protocol: true,
    })
  ) {
    return "Invalid live project URL";
  }

  return null;
};


// ======================
// ADMIN LOGIN
// ======================

export const loginAdmin = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.trim();
    password = password?.trim();

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill all details",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      token,
    });

  } catch (err) {
    console.error("Login error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};


// ======================
// ADD PROJECT
// ======================

export const addProject = async (req, res) => {
  try {

    let {
      title,
      description,
      domain,
      technologies,
      githubLink,
      liveLink,
    } = req.body;

    title = validator.escape(title.trim());
    description = validator.escape(
      description.trim()
    );

    domain = domain?.trim();
    githubLink = githubLink.trim();
    liveLink = liveLink.trim();

    const validationError =
      validateProjectData({
        title,
        description,
        domain,
        githubLink,
        liveLink,
      });

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const existingProject =
      await projectModel.findOne({
        githubLink,
      });

    if (existingProject) {
      return res.status(409).json({
        success: false,
        message:
          "Project with this GitHub link already exists",
      });
    }

    const project = new projectModel({
      title,
      description,
      domain,
      technologies: Array.isArray(technologies) ? technologies : [],
      githubLink,
      liveLink,
    });

    await project.save();

    return res.status(201).json({
      success: true,
      message: "Project added successfully",
      project,
    });

  } catch (err) {
    console.error("Add project error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};


// ======================
// EDIT PROJECT
// ======================

export const editProject = async (req, res) => {
  try {

    const { id } = req.params;

    let {
      title,
      description,
      domain,
      technologies,
      githubLink,
      liveLink,
    } = req.body;

    const existingProject =
      await projectModel.findById(id);

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    title =
      title !== undefined
        ? validator.escape(title.trim())
        : existingProject.title;

    description =
      description !== undefined
        ? validator.escape(description.trim())
        : existingProject.description;

    domain =
      domain !== undefined
        ? domain.trim()
        : existingProject.domain;

    technologies =
      technologies !== undefined
        ? Array.isArray(technologies) ? technologies : []
        : existingProject.technologies;

    githubLink =
      githubLink !== undefined
        ? githubLink.trim()
        : existingProject.githubLink;

    liveLink =
      liveLink !== undefined
        ? liveLink.trim()
        : existingProject.liveLink;

    const validationError =
      validateProjectData({
        title,
        description,
        domain,
        githubLink,
        liveLink,
      });

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    existingProject.title = title;
    existingProject.description =
      description;
    existingProject.domain = domain;
    existingProject.technologies = technologies;
    existingProject.githubLink =
      githubLink;
    existingProject.liveLink =
      liveLink;

    await existingProject.save();

    return res.status(200).json({
      success: true,
      message:
        "Project updated successfully",
      project: existingProject,
    });

  } catch (err) {
    console.error("Edit project error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};


// ======================
// DELETE PROJECT
// ======================

export const deleteProject = async (req, res) => {
  try {

    const { id } = req.params;

    if (!validator.isMongoId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const project =
      await projectModel.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await projectModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message:
        "Project deleted successfully",
    });

  } catch (err) {
    console.error("Delete project error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};


// ======================
// GET CONTACT MESSAGES
// ======================

export const getMessages = async (req, res) => {
  try {

    const messages =
      await contactModel
        .find({})
        .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });

  } catch (err) {
    console.error("Fetch messages error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};


// ======================
// GET MESSAGE BY ID
// ======================

export const getMessageById = async (req, res) => {
  try {

    const { id } = req.params;

    if (!validator.isMongoId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID",
      });
    }

    const message =
      await contactModel.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    if (!message.isRead) {
      message.isRead = true;
      await message.save();
    }

    return res.status(200).json({
      success: true,
      message,
    });

  } catch (err) {
    console.error("Fetch message error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};


// ======================
// MARK MESSAGE AS READ
// ======================

export const markMessageAsRead = async (req, res) => {
  try {

    const { id } = req.params;

    if (!validator.isMongoId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID",
      });
    }

    const message =
      await contactModel.findByIdAndUpdate(
        id,
        { isRead: true },
        { new: true }
      );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message marked as read",
      message: message,
    });

  } catch (err) {
    console.error("Mark message error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};


// ======================
// DELETE MESSAGE
// ======================

export const deleteMessage = async (req, res) => {
  try {

    const { id } = req.params;

    if (!validator.isMongoId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID",
      });
    }

    const message =
      await contactModel.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    await contactModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });

  } catch (err) {
    console.error("Delete message error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};