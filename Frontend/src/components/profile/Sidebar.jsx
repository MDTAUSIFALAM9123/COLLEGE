import {
  User,
  Settings,
  Bell,
  Lock,
  Trash2,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { s } from "./styles";

export default function Sidebar({ user, active, setActive }) {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "profile",
      label: "My Profile",
      icon: User,
    },

    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },

    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },

    {
      id: "password",
      label: "Change Password",
      icon: Lock,
    },

    {
      id: "delete",
      label: "Delete Account",
      icon: Trash2,
      danger: true,
    },
  ];

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/login");
    }
  };

  return (
    <div style={s.sidebar}>
      {/* User Info */}

      <div style={s.userBox}>
        {user?.image ? (
          <img src={user.image} alt="profile" style={s.avatar} />
        ) : (
          <div style={s.avatarFallback}>
            {(user?.name?.[0] || "U").toUpperCase()}
          </div>
        )}

        <div>
          <h3 style={s.name}>{user?.name || "Your Name"}</h3>

          <p style={s.email}>{user?.email || "your@gmail.com"}</p>
        </div>
      </div>

      <div style={s.line} />

      {/* Menu */}

      <div>
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                ...s.menuBtn,

                ...(active === item.id && item.danger
                  ? s.deleteActive
                  : active === item.id
                    ? s.activeBtn
                    : {}),
              }}
            >
              <Icon size={18} color={item.danger ? "#f87171" : "#a78bfa"} />

              <span>{item.label}</span>

              <ChevronRight
                size={16}
                style={{
                  marginLeft: "auto",
                }}
              />
            </button>
          );
        })}
      </div>

      <div style={s.line} />

      {/* Logout */}

      <button style={s.logout} onClick={logout}>
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
