import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("user");
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <button className="dropdown-item text-danger" onClick={handleLogout}>
            <i className="material-symbols-rounded me-2">logout</i>
            Logout
        </button>
    );
}

export default Logout;
