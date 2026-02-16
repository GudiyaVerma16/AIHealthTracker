import axios from "axios";

const base = (import.meta.env.VITE_STRAPI_API_URL ?? "").replace(/\/$/, "");
const api = axios.create({
  baseURL: base ? `${base}/api` : "/api",
})

export default api;