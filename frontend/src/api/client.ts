// Bulletproof API URL Resolution for Live Production & Local Development
let targetUrl = import.meta.env.VITE_API_URL || "";

// If running on live domain (digiscaleinfotech.com or vercel.app), force live Render backend URL
if (typeof window !== "undefined") {
  const host = window.location.hostname;
  if (host.includes("digiscaleinfotech.com") || host.includes("vercel.app") || !targetUrl || targetUrl.includes("localhost")) {
    targetUrl = "https://digiscale-infotech-hiv6.onrender.com/api";
  }
}

if (!targetUrl) {
  targetUrl = import.meta.env.PROD
    ? "https://digiscale-infotech-hiv6.onrender.com/api"
    : "http://localhost:5001/api";
}

export const API_URL = targetUrl.replace(/\/+$/, "");