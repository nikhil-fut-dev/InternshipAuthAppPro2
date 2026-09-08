import axios from "../api/axios";

// Register
export const registerUser = async (userData) => {
  const response = await axios.post("/auth/register", userData);
  return response.data;
};

// Login
export const loginUser = async (userData) => {
  const response = await axios.post("/auth/login", userData);
  return response.data;
};

// Get authenticated user
export const getMe = async () => {
  const response = await axios.get("/auth/me");
  return response.data;
};

// Logout
export const logoutUser = async () => {
  const response = await axios.post("/auth/logout");
  return response.data;
};

// Get CSRF Token
export const getCsrfToken = async () => {
  const response = await axios.get("/auth/csrf-token");
  return response.data;
};
