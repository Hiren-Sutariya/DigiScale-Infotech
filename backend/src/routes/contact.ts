import { Router, Request, Response } from "express";
import { z } from "zod";
import { supabase } from "../supabase.js";

export const contactRouter = Router();

const contactSchema = z.object({
  full_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  company: z.string(),
  service: z.string(),
  message: z.string(),
});

// POST /contact/
contactRouter.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedBody = contactSchema.parse(req.body);

    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        full_name: validatedBody.full_name,
        email: validatedBody.email,
        phone: validatedBody.phone,
        company: validatedBody.company,
        service: validatedBody.service,
        message: validatedBody.message,
      })
      .select();

    if (error || !data || data.length === 0) {
      res.status(500).json({
        success: false,
        detail: error?.message || "Failed to submit contact message.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Contact submitted successfully.",
      data: data[0],
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(422).json({ detail: error.errors });
      return;
    }
    res.status(500).json({ detail: error.message || "Internal server error" });
  }
});

// GET /contact/
contactRouter.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      res.status(500).json({
        success: false,
        detail: error.message,
      });
      return;
    }

    const contacts = data || [];
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error: any) {
    res.status(500).json({ detail: error.message || "Internal server error" });
  }
});
