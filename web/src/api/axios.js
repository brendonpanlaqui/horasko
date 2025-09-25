import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // This is where your Laravel backend runs. 
  // ❗ For production, you'll replace this with your deployed API URL.
  withCredentials: true, // send cookies (needed for Sanctum)
});

api.interceptors.request.use((config) => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  if (match) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(match[1]);
  }
  return config;
});
// Export the configured Axios instance so the rest of your app can use it.
export default api;
