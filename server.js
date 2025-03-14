import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import bodyParser from "body-parser";
import signupRoute from "./routes/signup.js";  
import loginRoute from "./routes/login.js";   
import cors from "cors";
import { createAdminUser } from "./scripts/initAdmin.js";
import adminRoute from "./routes/admin.js";
import userRoutes from './routes/userRoutes.js';

dotenv.config();  

console.log("Connecting to DB:", process.env.MONGO_URI); // Debugging

const app = express();

// Connect to the database before starting the server
connectDB()
  .then(async () => { // Make this callback `async`
    console.log("Database connected successfully");

    await createAdminUser(); // Now `await` works correctly
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1); 
  });

// Middleware
app.use(bodyParser.json());  
app.use(cors());  

// Routes
app.use("/auth", signupRoute);  
app.use("/auth", loginRoute);   
app.use("/auth",adminRoute);
app.use("/auth", userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
