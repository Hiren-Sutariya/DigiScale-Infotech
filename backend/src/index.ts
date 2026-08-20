import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDatabase } from "./db";
import publicRoutes from "./routes/public";
import adminRoutes from "./routes/admin";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Initialize Database & seed default admin
initDatabase();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

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
