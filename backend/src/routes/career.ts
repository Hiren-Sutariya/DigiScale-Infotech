import { Router, Request, Response } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../supabase.js";
import { config } from "../config.js";

export const careerRouter = Router();

// Configure multer to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

// POST /career/
careerRouter.post("/", upload.single("resume"), async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ detail: "Resume file is required." });
      return;
    }

    const {
      first_name,
      last_name,
      email,
      country_code,
      phone,
      experience,
      location,
      company = "",
      role = "",
      job_title,
    } = req.body;

    if (!first_name || !last_name || !email || !country_code || !phone || !experience || !location || !job_title) {
      res.status(400).json({ detail: "All required form fields must be provided." });
      return;
    }

    // Generate unique name for the file
    const extension = file.originalname.split(".").pop();
    const filename = `${uuidv4()}.${extension}`;

    // Upload to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from(config.CAREER_BUCKET)
      .upload(filename, file.buffer, {
        contentType: file.mimetype,
      });

    if (uploadError) {
      res.status(500).json({ detail: `Resume upload failed: ${uploadError.message}` });
      return;
    }

    // Insert career application record
    const { data: appData, error: dbError } = await supabase
      .from("career_applications")
      .insert({
        first_name,
        last_name,
        email,
        country_code,
        phone,
        experience,
        location,
        company,
        role,
        job_title,
        status: "Pending",
        resume_file: filename,
        resume_original_name: file.originalname,
      })
      .select();

    if (dbError || !appData || appData.length === 0) {
      res.status(500).json({ detail: dbError?.message || "Failed to save career application." });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Application submitted successfully.",
      application_id: appData[0].id,
    });
  } catch (error: any) {
    res.status(500).json({ detail: error.message || "Internal server error" });
  }
});
