import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/profile/Sidebar";
import MyProfile from "../components/profile/Myprofile";
import Settings from "../components/profile/Setting";
import Notifications from "../components/profile/Notification";
import ChangePassword from "../components/profile/ChangePw";
import DeleteAccount from "../components/profile/DeleteAccount";

import api from "../lib/api";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [active, setActive] = useState("profile");

  // Get current logged in user
  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  // Decide which panel to show
  const renderContent = () => {
    switch (active) {
      case "profile":
        return <MyProfile user={user} setUser={setUser} />;

      case "settings":
        return <Settings />;

      case "notifications":
        return <Notifications />;

      case "password":
        return <ChangePassword />;

      case "delete":
        return <DeleteAccount onDelete={() => navigate("/login")} />;

      default:
        return <MyProfile user={user} setUser={setUser} />;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0C033E",
        padding: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "20px",
        }}
      >
        {/* Left Sidebar */}
        <Sidebar user={user} active={active} setActive={setActive} />

        {/* Right Side Content */}
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(139,92,246,0.25)",
            backdropFilter: "blur(15px)",
            borderRadius: "24px",
            minHeight: "600px",
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
