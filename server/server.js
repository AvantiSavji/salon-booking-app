import dotenv from "dotenv";
import path from "path";
import fs from "fs"; // Use import instead of require

dotenv.config({ path: path.resolve("./.env") });

// // --- Debugging Block ---
// const envPath = path.resolve("./.env");
// console.log("-----------------------------------------");
// console.log("Checking for .env at:", envPath);
// console.log(".env file exists on disk:", fs.existsSync(envPath));
// console.log("Stripe Key in process.env:", process.env.STRIPE_SECRET_KEY ? "FOUND" : "NOT FOUND");
// console.log("-----------------------------------------");
// // -----------------------

import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";




connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

