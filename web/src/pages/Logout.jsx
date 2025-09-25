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
      className="dropdown-item text-danger"
      onClick={handleLogout}
      type="button" 
    >
      <i className="material-symbols-rounded me-2">logout</i>
      Logout
    </button>
  );
}

export default Logout;
