import api from "./axios";

export const signup = async (name, email, password) => {
  await api.get("/sanctum/csrf-cookie");
  const res = await api.post("/api/signup", { name, email, password });
  return res.data;
};

export const login = async (email, password) => {
  await api.get("/sanctum/csrf-cookie");
  const res = await api.post("/api/login", { email, password });
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/api/me");
  return res.data;
};

export const logout = async () => {
  await api.get("/sanctum/csrf-cookie"); // refresh CSRF before logout
  const res = await api.post("/api/logout");
  return res.data;
};
