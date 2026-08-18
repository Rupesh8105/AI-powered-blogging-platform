import { useState } from "react";

function Settings() {
  const saved = JSON.parse(
    localStorage.getItem("blogSettings") || "{}"
  );

  const [name, setName] = useState(saved.name || "");
  const [email, setEmail] = useState(saved.email || "");
  const [theme, setTheme] = useState(saved.theme || "light");
  const [message, setMessage] = useState("");

  const saveSettings = () => {
    localStorage.setItem(
      "blogSettings",
      JSON.stringify({
        name,
        email,
        theme
      })
    );

    setMessage("Settings saved successfully.");
  };

  return (
    <div className="page-shell">
      <div className="page-container">

        <div className="page-header">
          <h1>⚙️ Settings</h1>
          <p>Manage your BlogAI profile and preferences.</p>
        </div>

        <div className="settings-card">

          <h2>Profile</h2>

          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />

          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            type="email"
          />

          <h2>Appearance</h2>

          <label>Theme</label>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>

          <button
            className="save-settings"
            onClick={saveSettings}
          >
            💾 Save Settings
          </button>

          {message && (
            <div className="success-message">
              ✓ {message}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Settings;
