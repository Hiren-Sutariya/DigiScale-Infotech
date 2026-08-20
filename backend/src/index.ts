import path from "path";
import fs from "fs";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDatabase } from "./db";
import publicRoutes from "./routes/public";
import adminRoutes from "./routes/admin";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Initialize Database & seed default admin
initDatabase();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use("/uploads", express.static(uploadsDir));

// Routes
app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "DigiScale Infotech API Server Running", timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 DigiScale Backend API Server listening on http://localhost:${PORT}`);
});
