import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    localStorage.setItem(
      "userSession",
      JSON.stringify({
        email,
        loggedIn: true
      })
    );

    localStorage.setItem("isLoggedIn", "true");

    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">✍️</div>

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to your AI Blogging Platform
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button type="submit">
            Login
          </button>

        </form>

        <p className="login-demo">
          Demo login: enter any email and password.
        </p>

      </div>
    </div>
  );
}

export default Login;
