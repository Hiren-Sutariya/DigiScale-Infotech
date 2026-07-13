import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { contactRouter } from "./routes/contact.js";
import { newsletterRouter } from "./routes/newsletter.js";
import { inquiryRouter } from "./routes/inquiry.js";
import { careerRouter } from "./routes/career.js";

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      "https://digiscale-gamma.vercel.app",
      "https://digiscaleinfotech.com",
      "https://www.digiscaleinfotech.com",
    ];

    const isAllowed = allowedOrigins.includes(origin) || 
                      origin.endsWith(".vercel.app") || 
                      /^http:\/\/localhost:\d+$/.test(origin);

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "upgrade-insecure-requests"],
}));

app.use(express.json());

// Routes
app.use("/contact", contactRouter);
app.use("/newsletter", newsletterRouter);
app.use("/inquiry", inquiryRouter);
app.use("/career", careerRouter);

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: `${config.APP_NAME} Running 🚀`,
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
  });
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT} 🚀`);
});
