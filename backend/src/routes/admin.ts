import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { authenticateAdmin } from "../middleware/auth";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "digiscale-admin-secret-key-2026";

// ----------------------------------------------------
// 1. PUBLIC ADMIN LOGIN
// ----------------------------------------------------
router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const admin = db.prepare("SELECT * FROM admins WHERE email = ?").get(email.trim().toLowerCase()) as any;

  if (!admin) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const isPasswordValid = bcrypt.compareSync(password, admin.password_hash);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: admin.id, email: admin.email, name: admin.name },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({
    success: true,
    token,
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    },
  });
});

// All routes below require JWT authentication
router.use(authenticateAdmin);

// ----------------------------------------------------
// 2. OVERVIEW STATS
// ----------------------------------------------------
router.get("/stats", (_req: Request, res: Response) => {
  try {
    const totalInquiries = (db.prepare("SELECT COUNT(*) as count FROM inquiries").get() as any).count;
    const newInquiries = (db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'New'").get() as any).count;
    const totalApplications = (db.prepare("SELECT COUNT(*) as count FROM applications").get() as any).count;
    const pendingApplications = (db.prepare("SELECT COUNT(*) as count FROM applications WHERE status = 'Pending'").get() as any).count;

    return res.json({
      totalInquiries,
      newInquiries,
      totalApplications,
      pendingApplications,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// ----------------------------------------------------
// 3. INQUIRIES MANAGEMENT
// ----------------------------------------------------

// GET /api/admin/inquiries
router.get("/inquiries", (req: Request, res: Response) => {
  try {
    const { status, search } = req.query;

    let query = "SELECT * FROM inquiries";
    const params: any[] = [];
    const conditions: string[] = [];

    if (status && status !== "All") {
      conditions.push("status = ?");
      params.push(status);
    }

    if (search) {
      conditions.push("(name LIKE ? OR email LIKE ? OR phone LIKE ? OR service LIKE ? OR message LIKE ?)");
      const term = `%${search}%`;
      params.push(term, term, term, term, term);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY created_at DESC";

    const inquiries = db.prepare(query).all(...params);
    return res.json(inquiries);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch inquiries" });
  }
});

// PATCH /api/admin/inquiries/:id
router.patch("/inquiries/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const stmt = db.prepare("UPDATE inquiries SET status = ? WHERE id = ?");
    const result = stmt.run(status, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Inquiry not found" });
    }

    return res.json({ success: true, message: "Inquiry status updated" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update inquiry" });
  }
});

// DELETE /api/admin/inquiries/:id
router.delete("/inquiries/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare("DELETE FROM inquiries WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Inquiry not found" });
    }

    return res.json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete inquiry" });
  }
});

// ----------------------------------------------------
// 4. JOB APPLICATIONS MANAGEMENT
// ----------------------------------------------------

// GET /api/admin/applications
router.get("/applications", (req: Request, res: Response) => {
  try {
    const { status, search } = req.query;

    let query = "SELECT * FROM applications";
    const params: any[] = [];
    const conditions: string[] = [];

    if (status && status !== "All") {
      conditions.push("status = ?");
      params.push(status);
    }

    if (search) {
      conditions.push("(name LIKE ? OR email LIKE ? OR position LIKE ? OR message LIKE ?)");
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY created_at DESC";

    const applications = db.prepare(query).all(...params);
    return res.json(applications);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch job applications" });
  }
});

// PATCH /api/admin/applications/:id
router.patch("/applications/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const stmt = db.prepare("UPDATE applications SET status = ? WHERE id = ?");
    const result = stmt.run(status, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Application not found" });
    }

    return res.json({ success: true, message: "Application status updated" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update application" });
  }
});

// DELETE /api/admin/applications/:id
router.delete("/applications/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare("DELETE FROM applications WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Application not found" });
    }

    return res.json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete application" });
  }
});

export default router;
