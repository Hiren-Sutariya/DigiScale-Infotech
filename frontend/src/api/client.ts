export const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://digiscale-infotech-hiv6.onrender.com/api"
    : "http://localhost:5001/api");