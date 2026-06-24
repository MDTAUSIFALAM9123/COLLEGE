import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";

import api from "../../lib/api";
import { s } from "./styles";

export default function DeleteAccount({ onDelete }) {
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    if (confirm !== "DELETE") {
      return setMessage('Type "DELETE" to confirm.');
    }

    try {
      setLoading(true);

      await api.delete("/auth/account");

      onDelete();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.panel}>
      <div style={s.titleRow}>
        <Trash2 size={20} color="#f87171" />

        <h2
          style={{
            ...s.title,
            color: "#f87171",
          }}
        >
          Delete Account
        </h2>
      </div>

      <p style={s.subTitle}>This action is permanent and cannot be undone.</p>

      <div style={s.line} />

      {/* Warning Box */}

      <div style={s.warningBox}>
        <AlertTriangle size={18} color="#fbbf24" />

        <div>
          <h4 style={s.warningTitle}>You will lose:</h4>

          <ul style={s.warningList}>
            <li>Profile information</li>

            <li>Interview history</li>

            <li>Saved progress and settings</li>
          </ul>
        </div>
      </div>

      {/* Confirmation */}

      <div style={s.inputGroup}>
        <label style={s.label}>
          Type <b>DELETE</b>
          to confirm
        </label>

        <input
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder='Type "DELETE"'
          style={s.input}
        />
      </div>

      {message && <div style={s.errorToast}>{message}</div>}

      <button onClick={handleDelete} disabled={loading} style={s.deleteBtn}>
        <Trash2 size={16} />

        {loading ? "Deleting..." : "Permanently Delete Account"}
      </button>
    </div>
  );
}
