import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, index: 1 },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: 1 },
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
});

userSchema.pre("save", async function (next) {
  const pswd = await bcrypt.hash(this.password, 10);
  this.password = pswd;
  next();
});

export default mongoose.model("User", userSchema);
