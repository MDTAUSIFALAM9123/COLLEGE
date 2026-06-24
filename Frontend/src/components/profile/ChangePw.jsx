import { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

import api from "../../lib/api";
import { s } from "./styles";

export default function ChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const togglePassword = (key) => {
    setShow({
      ...show,
      [key]: !show[key],
    });
  };

  const handleChangePassword = async () => {
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      return setMessage({
        text: "All fields are required.",
        type: "error",
      });
    }

    if (form.newPassword !== form.confirmPassword) {
      return setMessage({
        text: "Passwords do not match.",
        type: "error",
      });
    }

    if (form.newPassword.length < 6) {
      return setMessage({
        text: "Password must be at least 6 characters.",
        type: "error",
      });
    }

    try {
      setLoading(true);

      await api.patch("/auth/change-password", {
        currentPassword: form.currentPassword,

        newPassword: form.newPassword,
      });

      setMessage({
        text: "Password updated successfully ✨",
        type: "success",
      });

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Failed to update password.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputs = [
    {
      key: "currentPassword",
      label: "Current Password",
    },

    {
      key: "newPassword",
      label: "New Password",
    },

    {
      key: "confirmPassword",
      label: "Confirm New Password",
    },
  ];

  return (
    <div style={s.panel}>
      <div style={s.titleRow}>
        <Lock size={20} color="#a78bfa" />

        <h2 style={s.title}>Change Password</h2>
      </div>

      <p style={s.subTitle}>Keep your CrackitAI account secure.</p>

      <div style={s.line} />

      {inputs.map((item) => (
        <div key={item.key} style={s.inputGroup}>
          <label style={s.label}>{item.label}</label>

          <div style={s.inputWrapper}>
            <input
              type={show[item.key] ? "text" : "password"}
              value={form[item.key]}
              onChange={(e) =>
                setForm({
                  ...form,
                  [item.key]: e.target.value,
                })
              }
              style={s.input}
            />

            <button
              type="button"
              style={s.eyeButton}
              onClick={() => togglePassword(item.key)}
            >
              {show[item.key] ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>
      ))}

      <button
        style={s.saveBtn}
        onClick={handleChangePassword}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Password"}
      </button>

      {message.text && (
        <div
          style={{
            ...s.toast,

            ...(message.type === "error" && s.errorToast),
          }}
        >
          {message.type === "success" ? (
            <CheckCircle size={16} />
          ) : (
            <AlertCircle size={16} />
          )}

          {message.text}
        </div>
      )}
    </div>
  );
}
