import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  logo:     { type: String }, // optional user logo
}, { timestamps: true });

export default mongoose.model("User", userSchema);
