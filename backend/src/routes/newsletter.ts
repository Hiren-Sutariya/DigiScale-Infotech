import { Router, Request, Response } from "express";
import { z } from "zod";
import { supabase } from "../supabase.js";

export const newsletterRouter = Router();

const newsletterSchema = z.object({
  email: z.string().email(),
});

// POST /newsletter/
newsletterRouter.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedBody = newsletterSchema.parse(req.body);

    // Query if already subscribed
    const { data: existing, error: selectError } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("email", validatedBody.email);

    if (selectError) {
      res.status(500).json({ detail: selectError.message });
      return;
    }

    if (existing && existing.length > 0) {
      res.status(409).json({ detail: "Email already subscribed." });
      return;
    }

    // Insert subscriber
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: validatedBody.email })
      .select();

    if (error || !data || data.length === 0) {
      res.status(500).json({ detail: error?.message || "Failed to subscribe email." });
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
