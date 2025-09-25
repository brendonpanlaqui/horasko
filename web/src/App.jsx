import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "./api/auth"; 
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import MyLogs from "./pages/MyLogs";
import Cutoff from "./pages/Cutoff";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";  

// Protected layout for authenticated users
function Layout({ user, setUser }) {
  return (
    <div className="d-flex w-100">
      <Sidebar user={user} />
      <div className="main-content flex-grow-1 d-flex flex-column min-vh-100 bg-gray-200">
        <Navbar user={user} setUser={setUser} />
        <main className="p-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/my-logs" element={<MyLogs />} />
            <Route path="/cutoff" element={<Cutoff />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((res) => setUser(res)) // Laravel returns user object
      .catch(() => setUser(null))  // Not logged in or token expired
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public routes (redirect to / if already logged in) */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace/> : <Login setUser={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace/> : <Register setUser={setUser} />}
        />
        <Route
          path="/forgot"
          element={user ? <Navigate to="/" replace/> : <Forgot />}
        />
        <Route 
          path="/reset" 
          element={<Reset />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            user ? (
              <Layout user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
