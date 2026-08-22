require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || "digiscale_secret_key_2026_x89a";

// CORS Configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Helper: Setup Nodemailer Transporter
const getTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
};

// Helper: Send Email Notification
const sendContactNotificationEmail = async (data, formType = "Contact Form") => {
  const transporter = getTransporter();
  if (!transporter) return;

  const targetEmail = process.env.NOTIFICATION_EMAIL || "hello@digiscaleinfotech.com";
  const mailOptions = {
    from: `"DigiScale Website" <${process.env.SMTP_USER}>`,
    to: targetEmail,
    replyTo: data.email,
    subject: `New ${formType} Submission from ${data.name || data.email}`,
    html: `
      <h2>New ${formType} Submission</h2>
      <p><strong>Name:</strong> ${data.name || "N/A"}</p>
      <p><strong>Email:</strong> ${data.email || "N/A"}</p>
      <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
      <p><strong>Service:</strong> ${data.service || "N/A"}</p>
      <p><strong>Company/Budget:</strong> ${data.company || data.budget || "N/A"}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f4f4f4; padding: 10px; border-left: 3px solid #112D16;">
        ${data.message || "N/A"}
      </blockquote>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email notification sent to ${targetEmail}`);
  } catch (err) {
    console.error("Failed to send notification email:", err.message);
  }
};

// Middleware: Verify Admin JWT Token
const authAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

// ==================== PUBLIC ROUTES ====================

// Health Check Endpoint
app.get(["/", "/api", "/api/health", "/health"], (req, res) => {
  res.json({
    status: "ok",
    message: "DigiScale Infotech Backend API is active",
    timestamp: new Date().toISOString(),
  });
});

// 1. Submit Contact Form
app.post(["/api/contact", "/contact"], (req, res) => {
  const { name, full_name, email, phone, service, budget, company, message } = req.body;

  const contactName = name || full_name;
  if (!contactName || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const sql = `
    INSERT INTO inquiries (type, name, email, phone, company, service, budget, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      "contact",
      contactName,
      email,
      phone || "",
      company || "",
      service || "General Inquiry",
      budget || "",
      message,
    ],
    function (err) {
      if (err) {
        console.error("Error saving contact submission:", err);
        return res.status(500).json({ error: "Failed to submit contact form." });
      }

      const submissionData = {
        name: contactName,
        email,
        phone,
        service,
        company,
        budget,
        message,
      };

      // Send async email notification
      sendContactNotificationEmail(submissionData, "Contact Form");

      res.status(201).json({
        success: true,
        message: "Contact form submitted successfully.",
        inquiry_id: this.lastID,
      });
    }
  );
});

// 2. Submit Project Inquiry
app.post(["/api/inquiry", "/api/inquiry/"], (req, res) => {
  const { name, full_name, email, phone, service, budget, company, message } = req.body;

  const inquiryName = name || full_name || "Anonymous";
  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  const sql = `
    INSERT INTO inquiries (type, name, email, phone, company, service, budget, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      "inquiry",
      inquiryName,
      email,
      phone || "",
      company || "",
      service || "Project Inquiry",
      budget || "",
      message || "",
    ],
    function (err) {
      if (err) {
        console.error("Error saving inquiry:", err);
        return res.status(500).json({ error: "Failed to submit inquiry." });
      }

      sendContactNotificationEmail(
        { name: inquiryName, email, phone, service, budget, company, message },
        "Project Inquiry"
      );

      res.status(201).json({
        success: true,
        message: "Inquiry submitted successfully.",
        inquiry_id: this.lastID,
      });
    }
  );
});

// 3. Subscribe to Newsletter
app.post(["/api/newsletter", "/api/newsletter/"], (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email address is required." });
  }

  db.run("INSERT INTO newsletter (email) VALUES (?)", [email], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE")) {
        return res.status(200).json({
          success: true,
          message: "You are already subscribed to our newsletter.",
        });
      }
      return res.status(500).json({ error: "Failed to subscribe to newsletter." });
    }

    res.status(201).json({
      success: true,
      message: "Subscribed to newsletter successfully.",
      subscriber_id: this.lastID,
    });
  });
});

// 4. Apply for Job
app.post("/api/apply-job", (req, res) => {
  const {
    name,
    email,
    phone,
    position,
    portfolio_url,
    resume_data,
    resume_filename,
    message,
  } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Name, email, and phone are required." });
  }

  const sql = `
    INSERT INTO applications (name, email, phone, position, portfolio_url, resume_filename, resume_data, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      name,
      email,
      phone,
      position || "General Applicant",
      portfolio_url || "",
      resume_filename || "",
      resume_data || "",
      message || "",
    ],
    function (err) {
      if (err) {
        console.error("Error saving application:", err);
        return res.status(500).json({ error: "Failed to submit application." });
      }

      res.status(201).json({
        success: true,
        message: "Application submitted successfully.",
        application_id: this.lastID,
      });
    }
  );
});

// ==================== ADMIN AUTH & DASHBOARD ROUTES ====================

// Admin Login
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  db.get("SELECT * FROM admins WHERE email = ?", [email], (err, admin) => {
    if (err || !admin) {
      return res.status(401).json({ error: "Invalid admin credentials." });
    }

    const isMatch = bcrypt.compareSync(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid admin credentials." });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  });
});

// Admin Stats
app.get("/api/admin/stats", authAdmin, (req, res) => {
  db.get("SELECT COUNT(*) as total_inquiries FROM inquiries", [], (err, row1) => {
    if (err) return res.status(500).json({ error: "Database error." });

    db.get(
      "SELECT COUNT(*) as new_inquiries FROM inquiries WHERE status = 'new'",
      [],
      (err, row2) => {
        if (err) return res.status(500).json({ error: "Database error." });

        db.get(
          "SELECT COUNT(*) as total_applications FROM applications",
          [],
          (err, row3) => {
            if (err) return res.status(500).json({ error: "Database error." });

            db.get(
              "SELECT COUNT(*) as newsletter_subscribers FROM newsletter",
              [],
              (err, row4) => {
                if (err) return res.status(500).json({ error: "Database error." });

                res.json({
                  total_inquiries: row1 ? row1.total_inquiries : 0,
                  new_inquiries: row2 ? row2.new_inquiries : 0,
                  total_applications: row3 ? row3.total_applications : 0,
                  newsletter_subscribers: row4 ? row4.newsletter_subscribers : 0,
                });
              }
            );
          }
        );
      }
    );
  });
});

// Admin Inquiries List
app.get("/api/admin/inquiries", authAdmin, (req, res) => {
  db.all("SELECT * FROM inquiries ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch inquiries." });
    }
    res.json(rows);
  });
});

// Admin Inquiry Update Status
app.patch("/api/admin/inquiries/:id", authAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required." });
  }

  db.run(
    "UPDATE inquiries SET status = ? WHERE id = ?",
    [status, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to update status." });
      }
      res.json({ success: true, updated: this.changes });
    }
  );
});

// Admin Inquiry Delete
app.delete("/api/admin/inquiries/:id", authAdmin, (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM inquiries WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to delete inquiry." });
    }
    res.json({ success: true, deleted: this.changes });
  });
});

// Admin Applications List
app.get("/api/admin/applications", authAdmin, (req, res) => {
  db.all("SELECT * FROM applications ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch applications." });
    }
    res.json(rows);
  });
});

// Admin Application Update Status
app.patch("/api/admin/applications/:id", authAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required." });
  }

  db.run(
    "UPDATE applications SET status = ? WHERE id = ?",
    [status, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to update status." });
      }
      res.json({ success: true, updated: this.changes });
    }
  );
});

// Admin Application Delete
app.delete("/api/admin/applications/:id", authAdmin, (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM applications WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to delete application." });
    }
    res.json({ success: true, deleted: this.changes });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`DigiScale Infotech Backend Server running on http://localhost:${PORT}`);
});
