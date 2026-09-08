import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiShield, FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";
import { logoutUser } from "../services/authService";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogout = async () => {
    try {
      const response = await logoutUser();

      localStorage.removeItem("user");

      toast.success(response.message);

      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);

      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  if (!user) {
    return (
      <div className="dashboard">
        <h1>User not found</h1>
        <button className="auth-button" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user.fullName} 👋</h1>

          <p>You are successfully authenticated.</p>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          <FiLogOut />
          Logout
        </button>
      </div>

      <div className="user-card">
        <div className="user-card-header">
          <div className="user-avatar">
            <FiUser />
          </div>

          <div>
            <h2>{user.fullName}</h2>
            <p>{user.role}</p>
          </div>
        </div>

        <div className="user-info">
          <div className="info-item">
            <FiUser />

            <div>
              <span>Name</span>
              <strong>{user.fullName}</strong>
            </div>
          </div>

          <div className="info-item">
            <FiMail />

            <div>
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>
          </div>

          <div className="info-item">
            <FiShield />

            <div>
              <span>Role</span>
              <strong>{user.role}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
