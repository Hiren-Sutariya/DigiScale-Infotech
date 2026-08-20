import { Router, Request, Response } from "express";
import { db } from "../db";

const router = Router();

// POST /api/contact
router.post("/contact", (req: Request, res: Response) => {
  try {
    const { name, email, phone, service, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required fields." });
    }

    const stmt = db.prepare(`
      INSERT INTO inquiries (name, email, phone, service, budget, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name.trim(),
      email.trim(),
      phone ? phone.trim() : "",
      service ? service.trim() : "General Inquiry",
      budget ? budget.trim() : "",
      message.trim()
    );

    return res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully! Our team will contact you shortly.",
      id: result.lastInsertRowid,
    });
  } catch (error) {
    console.error("Error saving contact inquiry:", error);
    return res.status(500).json({ error: "Failed to submit inquiry. Please try again later." });
  }
});

// POST /api/apply-job
router.post("/apply-job", (req: Request, res: Response) => {
  try {
    const { name, email, phone, position, portfolio_url, experience, message } = req.body;

    if (!name || !email || !position) {
      return res.status(400).json({ error: "Name, email, and position are required." });
    }

    const stmt = db.prepare(`
      INSERT INTO applications (name, email, phone, position, portfolio_url, experience, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name.trim(),
      email.trim(),
      phone ? phone.trim() : "",
      position.trim(),
      portfolio_url ? portfolio_url.trim() : "",
      experience ? experience.trim() : "",
      message ? message.trim() : ""
    );

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully! Our HR team will review your profile.",
      id: result.lastInsertRowid,
    });
  } catch (error) {
    console.error("Error saving job application:", error);
    return res.status(500).json({ error: "Failed to submit application. Please try again later." });
  }
});

export default router;
