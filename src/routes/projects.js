import express from "express";
import Project from "../models/Project.js";
import { protect } from "../middleware/authMiddleware.js";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

const router = express.Router();

// Create project (clone repo)
router.post("/create", protect, async (req, res) => {
  const { repoUrl, name } = req.body;
  const userId = req.user;

  try {
    const projectPath = `/workspace/${userId}/${name}`;
    fs.mkdirSync(projectPath, { recursive: true });

    exec(`git clone ${repoUrl} ${projectPath}`, (err) => {
      if (err) return res.status(500).json({ success: false, message: "Git clone failed" });

      const project = new Project({ user: userId, repoUrl, name, path: projectPath, history: [] });
      project.save();

      res.json({ success: true, project });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get user projects
router.get("/", protect, async (req, res) => {
  const projects = await Project.find({ user: req.user });
  res.json({ success: true, projects });
});

export default router;
