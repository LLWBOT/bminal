import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  repoUrl: { type: String, required: true },
  name: { type: String, required: true },
  path: { type: String, required: true }, // where repo is cloned in container
  history: [String],
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
