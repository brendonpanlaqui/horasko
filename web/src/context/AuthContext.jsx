import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, signup as apiSignup, logout as apiLogout, getMe } from "../api/auth";

// 1. Create context
const AuthContext = createContext();

// 2. Hook for easy access
export const useAuth = () => useContext(AuthContext);

// 3. Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    await apiLogin(email, password);
    const data = await getMe();
    setUser(data);
  };

  const signup = async (name, email, password) => {
    await apiSignup(name, email, password);
    const data = await getMe();
    setUser(data);
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
