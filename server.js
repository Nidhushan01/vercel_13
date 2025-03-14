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
  .then(async () => {
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
app.use("/auth", adminRoute);
app.use("/auth", userRoutes);
app.get('/auth', (req, res) => {
  res.send('Hello World!')
});
app.get('/', (req, res) => {
  res.send('Hello Worldstart!')
});

// Export as a Vercel serverless function
export default app;
