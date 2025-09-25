import api from "./axios";

const getCsrf = async () => {
  await api.get("/sanctum/csrf-cookie");
};

// Handle errors in a consistent way
const handleError = (error, defaultMessage) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.errors) {
    // Laravel validation errors → return first error message
    const firstKey = Object.keys(error.response.data.errors)[0];
    return error.response.data.errors[firstKey][0];
  }
  return defaultMessage;
};

export const register = async (name, email, password) => {
  try {
    await getCsrf();
    const res = await api.post("/api/register", { name, email, password });
    return res.data;
  } catch (error) {
    throw handleError(error, "Signup failed");
  }
};

export const login = async (email, password) => {
  try {
    await getCsrf();
    const res = await api.post("/api/login", { email, password });
    // return just the data (not the full Axios response object)
    return res.data;
  } catch (error) {
    throw handleError(error, "Login failed");
  }
};

// Get currently authenticated user (Laravel Sanctum + API route /api/me)
export const getMe = async () => {
  try {
    const res = await api.get("/api/me");
    return res.data;
  } catch (error) {
    throw handleError(error, "Failed to fetch user");
  }
};

export const logout = async () => {
  try {
    await getCsrf(); // refresh CSRF token before logout, requires fresh CSRF for logout
    const res = await api.post("/api/logout");
    return res.data;
  } catch (error) {
    throw handleError(error, "Logout failed");
  }
};