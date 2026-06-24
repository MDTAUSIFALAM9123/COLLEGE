import { useState } from "react";

import { Bell, Mail, Calendar } from "lucide-react";

import { s } from "./styles";

export default function Notifications() {
  const [settings, setSettings] = useState({
    interview: true,

    email: true,

    updates: false,
  });

  const toggle = (key) => {
    setSettings({
      ...settings,

      [key]: !settings[key],
    });
  };

  const options = [
    {
      key: "interview",
      label: "Interview reminders",
      icon: Calendar,
    },

    {
      key: "email",
      label: "Email notifications",
      icon: Mail,
    },

    {
      key: "updates",
      label: "New CrackitAI updates",
      icon: Bell,
    },
  ];

  return (
    <div style={s.panel}>
      <h2 style={s.title}>Notifications</h2>

      <p style={s.subTitle}>Manage your alerts and reminders.</p>

      <div style={s.line} />

      {options.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.key} style={s.field}>
            <div style={s.leftField}>
              <Icon size={18} color="#a78bfa" />

              <span>{item.label}</span>
            </div>

            <button
              onClick={() => toggle(item.key)}
              style={{
                ...s.toggleBtn,

                background: settings[item.key]
                  ? "#7c3aed"
                  : "rgba(255,255,255,0.1)",
              }}
            >
              {settings[item.key] ? "ON" : "OFF"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
