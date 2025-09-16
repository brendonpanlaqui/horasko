import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "./api/auth"; // we don’t need logout here
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

// Protected layout for authenticated users
function Layout() {
  return (
    <div className="d-flex w-100">
      <Sidebar />
      <div className="main-content flex-grow-1 d-flex flex-column">
        <Navbar />
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
      .then((res) => {
        setUser(res.data); // user object from Laravel
      })
      .catch(() => {
        setUser(null); // not logged in
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={user ? <Layout /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;



// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getMe } from "./api/auth"; // we don’t need logout here
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Dashboard from "./pages/Dashboard";
// import MyLogs from "./pages/MyLogs";
// import Cutoff from "./pages/Cutoff";
// import Profile from "./pages/Profile";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Forgot from "./pages/Forgot";

// // Protected layout for authenticated users
// function Layout({ user, setUser }) {
//   return (
//     <div className="d-flex w-100">
//       <Sidebar />
//       <div className="main-content flex-grow-1 d-flex flex-column">
//         <Navbar user={user} setUser={setUser}/>
//         <main className="p-4 flex-grow-1">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/my-logs" element={<MyLogs />} />
//             <Route path="/cutoff" element={<Cutoff />} />
//             <Route path="/profile" element={<Profile />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </div>
//   );
// }

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getMe()
//       .then((res) => {
//         setUser(res.data); // user object from Laravel
//       })
//       .catch(() => {
//         setUser(null); // not logged in
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <Router>
//       <Routes>
//         {/* Public routes (redirect to / if already logged in) */}
//         <Route
//           path="/login"
//           element={user ? <Navigate to="/" /> : <Login />}
//         />
//         <Route
//           path="/register"
//           element={user ? <Navigate to="/" /> : <Register />}
//         />
//         <Route
//           path="/forgot"
//           element={user ? <Navigate to="/" /> : <Forgot />}
//         />

//         {/* Protected routes */}
//         <Route
//           path="/*"
//           element={user ? <Layout user={user} setUser={setUser} /> : <Navigate to="/login" />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
