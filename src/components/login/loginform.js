import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./loginform.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import { AiOutlineClose } from "react-icons/ai";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    navigate("/");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!form.password.trim()) {
      setError("Password is required");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/Login", // Replace with your API endpoint
        form
      );

      const { token, role } = response.data;

      // Save to localStorage
      try {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        alert("Login successful!");

        // Navigate to the profile page
        navigate("/");
      } catch (storageError) {
        console.error("Failed to save to localStorage:", storageError);
        setError("Terjadi kesalahan saat menyimpan data login.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-close-icon" onClick={handleClose}>
          <AiOutlineClose size={24} />
        </div>
        <div className="auth-tabs">
          <button className="tab active">LOGIN</button>
          <button onClick={handleRegisterClick} className="tab">
            REGISTER
          </button>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email or username"
              value={form.email}
              onChange={handleChange}
              className="auth-input"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="auth-input"
              required
            />
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>
        <p className="auth-register">
          Not a member?{" "}
          <button onClick={handleRegisterClick} className="auth-link">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
