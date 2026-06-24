import { useState } from "react";
import { Moon, Sun, Globe, Monitor } from "lucide-react";

import { s } from "./styles";

export default function Settings() {
  const [theme, setTheme] = useState("dark");

  const [language, setLanguage] = useState("English");

  return (
    <div style={s.panel}>
      <h2 style={s.title}>Account Settings</h2>

      <p style={s.subTitle}>Customize your CrackitAI experience.</p>

      <div style={s.line} />

      {/* Theme */}

      <div style={s.field}>
        <div style={s.leftField}>
          {theme === "dark" ? (
            <Moon size={18} color="#a78bfa" />
          ) : (
            <Sun size={18} color="#facc15" />
          )}

          <span>Theme</span>
        </div>

        <select
          style={s.input}
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="dark">Dark</option>

          <option value="light">Light</option>

          <option value="system">System</option>
        </select>
      </div>

      {/* Language */}

      <div style={s.field}>
        <div style={s.leftField}>
          <Globe size={18} color="#a78bfa" />

          <span>Language</span>
        </div>

        <select
          style={s.input}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>English</option>

          <option>Hindi</option>

          <option>Spanish</option>
        </select>
      </div>

      <div style={s.toast}>
        <Monitor size={15} />
        These settings are saved locally.
      </div>
    </div>
  );
}
