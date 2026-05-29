// controllers/userController.js

import validator from "validator";
import projectModel from "../models/projectModel.js";
import contactModel from "../models/contactModel.js";


// ======================
// GET ALL PROJECTS
// ======================

export const getAllProjects = async (req, res) => {
  try {
    const { domain } = req.query;

    let query = {};
    
    if (domain && domain.trim() !== "") {
      const validDomains = ["Web Development", "AI/ML"];
      if (!validDomains.includes(domain.trim())) {
        return res.status(400).json({
          success: false,
          message: "Invalid domain. Must be 'Web Development' or 'AI/ML'",
        });
      }
      query.domain = domain.trim();
    }

    const projects = await projectModel.find(query);

    if (!projects || projects.length === 0) {
      return res.status(200).json({
        success: true,
        projects: [],
        message: "No projects found",
      });
    }

    return res.status(200).json({
      success: true,
      projects,
    });

  } catch (err) {
    console.error("Fetch projects error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};


// ======================
// GET PROJECT BY ID
// ======================

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validator.isMongoId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const project = await projectModel.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });

  } catch (err) {
    console.error("Fetch project error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};


// ======================
// SEND CONTACT MESSAGE
// ======================

export const sendMessage = async (req, res) => {
  try {
    let { name, email, message } = req.body;

    // Trim inputs
    name = name?.trim();
    email = email?.trim();
    message = message?.trim();

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate name
    if (!validator.isLength(name, { min: 2, max: 100 })) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 100 characters",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Validate message
    if (!validator.isLength(message, { min: 10, max: 5000 })) {
      return res.status(400).json({
        success: false,
        message: "Message must be between 10 and 5000 characters",
      });
    }

    // Escape inputs for security
    name = validator.escape(name);
    message = validator.escape(message);

    // Create new contact message
    const contact = new contactModel({
      name,
      email,
      message,
    });

    await contact.save();

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });

  } catch (err) {
    console.error("Send message error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};


// ======================
// GET PORTFOLIO STATS
// ======================

export const getPortfolioStats = async (req, res) => {
  try {
    const totalProjects = await projectModel.countDocuments({});
    
    const liveProjects = await projectModel.countDocuments({
      liveLink: { $exists: true, $ne: "" }
    });

    const webProjects = await projectModel.countDocuments({
      domain: "Web Development"
    });

    const mlProjects = await projectModel.countDocuments({
      domain: "AI/ML"
    });

    return res.status(200).json({
      success: true,
      stats: {
        totalProjects,
        liveProjects,
        webProjects,
        mlProjects,
      },
    });

  } catch (err) {
    console.error("Fetch stats error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};
