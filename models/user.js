import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, maxlength: 100 },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  age: { type: Number },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  isVerified: { type: Boolean, default: false } // User must verify OTP before activating
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
