import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";

const dataDir = path.join(__dirname, "../../data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "digiscale.db");
export const db = new Database(dbPath);

// Enable WAL mode for high performance
db.pragma("journal_mode = WAL");

export function initDatabase() {
  // 1. Inquiries Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT DEFAULT '',
      service TEXT DEFAULT 'General Inquiry',
      budget TEXT DEFAULT '',
      message TEXT NOT NULL,
      status TEXT DEFAULT 'New',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Job Applications Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT DEFAULT '',
      position TEXT NOT NULL,
      portfolio_url TEXT DEFAULT '',
      experience TEXT DEFAULT '',
      message TEXT DEFAULT '',
      status TEXT DEFAULT 'Pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3. Admin Credentials Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default admin account if none exists
  const existingAdmin = db.prepare("SELECT * FROM admins WHERE email = ?").get("admin@digiscaleinfotech.com");
  if (!existingAdmin) {
    const passwordHash = bcrypt.hashSync("admin123", 10);
    db.prepare("INSERT INTO admins (email, password_hash, name) VALUES (?, ?, ?)").run(
      "admin@digiscaleinfotech.com",
      passwordHash,
      "Hiren Sutariya (Admin)"
    );
    console.log("✅ Default admin user created: admin@digiscaleinfotech.com / admin123");
  }
}
