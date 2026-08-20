const envUrl = import.meta.env.VITE_API_URL;
const defaultProdUrl = "https://digiscale-infotech-hiv6.onrender.com/api";
const defaultDevUrl = "http://localhost:5001/api";

const baseUrl = envUrl || (import.meta.env.PROD ? defaultProdUrl : defaultDevUrl);

export const API_URL = baseUrl.replace(/\/+$/, "");