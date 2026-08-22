// Bulletproof API URL Resolution for Live Production & Local Development
export const API_URL =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5001/api"
    : "https://digiscale-infotech-wdoc.onrender.com/api";