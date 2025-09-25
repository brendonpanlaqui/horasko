import { createContext, useContext, useState, useEffect } from "react";
import {
  login as apiLogin,
  signup as apiSignup,
  logout as apiLogout,
  getMe,
} from "../api/auth";

// 1. Create the AuthContext (global state container for authentication)
const AuthContext = createContext();

// 2. Custom hook for consuming the context more easily
export const useAuth = () => useContext(AuthContext);

// 3. Provider component that wraps your app and gives children access to auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from localStorage immediately (faster than waiting for backend)
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true); // true until we confirm user's login status

  // Run once on mount to check if the user is already logged in (session cookie in backend)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();  // call Laravel's /api/me
        setUser(data);               // if success, store user data
        localStorage.setItem("user", JSON.stringify(data)); // keep in sync
      } catch {
        setUser(null);               // if error (401 unauthorized), user is not logged in
        localStorage.removeItem("user");
      } finally {
        setLoading(false);           // either way, stop loading state
      }
    };
    fetchUser();
  }, []); 

  // Wraps the API login call. After login, fetches fresh user data.
  const login = async (email, password) => {
    try {
      await apiLogin(email, password); // call Laravel /api/login
      const data = await getMe(); // fetch user info
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Login failed. Try again.",
      };
    }
  };

  // Same pattern for signup: register -> fetch -> set user
  const signup = async (name, email, password) => {
    try {
      await apiSignup(name, email, password);
      const data = await getMe();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Signup failed. Try again.",
      };
    }
  };

  // Logout clears both backend session and frontend state
  const logout = async () => {
    try {
      await apiLogout(); // call Laravel /api/logout
    } finally {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

   // Provide everything needed to children components
  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
