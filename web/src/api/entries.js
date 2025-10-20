import API from "./axios";

const getCsrf = async () => {
  await API.get("/sanctum/csrf-cookie");
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

export const fetchEntries = async () => {
  try {
    const res = await API.get("/api/work-entries");
    return res.data;
  } catch (error) {
    throw handleError(error, "Failed to load entries");
  }
};

export const saveEntry = async (data) => {
  try {
    await getCsrf();
    const res = await API.post("/api/work-entries", data);
    return res.data;
  } catch (error) {
    throw handleError(error, "Failed to save entry");
  }
};
