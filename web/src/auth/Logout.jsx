import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Logout({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();              // call Laravel logout API
      setUser(null);               // clear React state
      localStorage.removeItem("user"); // Clear any persisted data (optional but good if you stored user/session)
      navigate("/login", { replace: true }); // redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
      setUser(null);
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="dropdown-item border-radius-md px-3 py-2 d-flex align-items-center text-danger pointer-event"
    >
      <i className="material-symbols-rounded me-2 fs-5 text-danger">logout</i>
      <span className="text-danger">Logout</span>
    </button>
  );  
}

export default Logout;
