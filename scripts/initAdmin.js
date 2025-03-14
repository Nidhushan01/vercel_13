
import bcrypt from "bcrypt";
import User from "../models/user.js";
import Role from "../models/role.js";

export const createAdminUser = async () => {
  try {
    const adminRole = await Role.findOne({ role_type: "admin" });
    if (!adminRole) {
      console.log("Admin role not found. Ensure roles are seeded.");
      return;
    }

    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const adminUser = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      age: 30,
      gender: "Other",
      role_id: adminRole._id,
      isVerified: true,
    });

    await adminUser.save();
    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};
