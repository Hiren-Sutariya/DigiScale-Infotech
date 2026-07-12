import { Router, Request, Response } from "express";
import { z } from "zod";
import { supabase } from "../supabase.js";

export const inquiryRouter = Router();

const inquirySchema = z.object({
  full_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  company: z.string(),
  requirement: z.string(),
  project_details: z.string(),
});

// POST /inquiry/
inquiryRouter.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedBody = inquirySchema.parse(req.body);

    const { data, error } = await supabase
      .from("project_inquiries")
      .insert({
        full_name: validatedBody.full_name,
        email: validatedBody.email,
        phone: validatedBody.phone,
        company: validatedBody.company,
        requirement: validatedBody.requirement,
        project_details: validatedBody.project_details,
      })
      .select();

    if (error || !data || data.length === 0) {
      res.status(500).json({ detail: error?.message || "Failed to create project inquiry." });
      return;
    }

    res.status(200).json(data[0]);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(422).json({ detail: error.errors });
      return;
    }
    res.status(500).json({ detail: error.message || "Internal server error" });
  }
});
