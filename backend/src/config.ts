import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env
dotenv.config();

export const config = {
  APP_NAME: process.env.APP_NAME || "DigiScale API",
  APP_VERSION: process.env.APP_VERSION || "1.0.0",
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY || "",
  CAREER_BUCKET: process.env.CAREER_BUCKET || "career",
  PORT: parseInt(process.env.PORT || "8000", 10),
};

if (!config.SUPABASE_URL || !config.SUPABASE_SECRET_KEY) {
  console.warn("WARNING: SUPABASE_URL or SUPABASE_SECRET_KEY is not defined in environment variables.");
}
