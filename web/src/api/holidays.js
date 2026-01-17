import api from "./axios";

const getCsrf = async () => {
  await api.get("/sanctum/csrf-cookie");
};

const handleError = (error, defaultMessage) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.errors) {
    const firstKey = Object.keys(error.response.data.errors)[0];
    return error.response.data.errors[firstKey][0];
  }
  return defaultMessage;
};

export const fetchHolidays = async () => {
  try {
    const res = await api.get("/api/holidays");
    return res.data;
  } catch (error) {
    throw handleError(error, "Failed to load entries");
  }
};