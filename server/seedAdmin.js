import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import dns from "dns"

dotenv.config();
dns.setServers(["8.8.8.8"])

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({
      role: "admin"
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      
    }

    const password = "Admin@123";

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name: "System Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin created successfully");
    console.log("Email:", admin.email);
    console.log("Password:", password);

    process.exit(0);
  } catch (error) {
    console.error("Admin seed failed:", error.message);
    process.exit(1);
  }
};

seedAdmin();