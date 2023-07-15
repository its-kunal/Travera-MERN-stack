import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  isVerified: { type: Boolean, default: false },  
});

export default mongoose.model("User", userSchema);
