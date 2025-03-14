import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  role_type: { type: String, required: true, unique: true } // No enum, allows adding roles dynamically
});

const Role = mongoose.model("Role", roleSchema);
export default Role;
