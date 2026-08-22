const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

// Ensure data folder exists
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "digiscale.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to SQLite database:", err.message);
  } else {
    console.log("Connected to SQLite database at:", dbPath);
  }
});

// Initialize Tables
db.serialize(() => {
  // Inquiries Table (Handles both contact form submissions and inquiry modal submissions)
  db.run(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL DEFAULT 'contact',
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      service TEXT,
      budget TEXT,
      message TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Job Applications Table
  db.run(`
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      position TEXT,
      portfolio_url TEXT,
      resume_filename TEXT,
      resume_data TEXT,
      message TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Newsletter Subscribers Table
  db.run(`
    CREATE TABLE IF NOT EXISTS newsletter (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Admins Table
  db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed default admin if missing
  const adminEmail = process.env.ADMIN_EMAIL || "admin@digiscaleinfotech.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  db.get("SELECT * FROM admins WHERE email = ?", [adminEmail], (err, row) => {
    if (err) {
      console.error("Error checking admin user:", err);
      return;
    }
    if (!row) {
      const hash = bcrypt.hashSync(adminPassword, 10);
      db.run("INSERT INTO admins (email, password_hash) VALUES (?, ?)", [adminEmail, hash], (err) => {
        if (err) console.error("Error seeding default admin:", err);
        else console.log(`Default admin created: ${adminEmail}`);
      });
    }
  });
});

module.exports = db;
