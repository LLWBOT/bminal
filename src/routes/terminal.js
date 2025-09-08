import express from "express";
import { runCommand } from "../utils/commandRunner.js";
import Project from "../models/Project.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Run command inside project
router.post("/run", protect, async (req, res) => {
  const { projectId, input } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    res.writeHead(200, {
      "Content-Type": "text/plain",
      "Transfer-Encoding": "chunked"
    });

    runCommand(
      input,
      project.path,
      (data) => res.write(data),
      (err) => res.write(err),
      () => {
        project.history.push(`$ ${input}`);
        project.save();
        res.end();
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
