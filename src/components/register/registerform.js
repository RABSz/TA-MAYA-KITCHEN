import React, { useState } from "react";
import register from "../../api/register.js";
import "./registerform.css";
import { useNavigate } from "react-router-dom";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import { FaTimes } from "react-icons/fa";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    alamat: "",
    no_hp: "",
  });

  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.nama.trim()) errors.nama = "Nama wajib diisi.";
    if (!formData.email.trim()) errors.email = "Email wajib diisi.";
    else if (!emailRegex.test(formData.email))
      errors.email = "Format email tidak valid.";
    if (!formData.password.trim()) errors.password = "Password wajib diisi.";
    if (!formData.alamat.trim()) errors.alamat = "Alamat wajib diisi.";
    if (!formData.no_hp.trim()) errors.no_hp = "Nomor HP wajib diisi.";

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setFormError({});

    if (!validateForm()) return;

    setLoading(true);
    try {
      const dataToSend = { ...formData, role: "User" };
      await register(dataToSend);
      navigate("/login"); // Redirect ke halaman login setelah berhasil registrasi
    } catch (err) {
      setServerError(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form">
      <div className="form-container">
        <button className="close-icon" onClick={() => navigate("/")}>
          <FaTimes />
        </button>
        <form onSubmit={handleSubmit}>
          {serverError && <p className="error-message">{serverError}</p>}
          {Object.keys(formError).map((key) => (
            <div key={key} className="text-danger">
              {formError[key]}
            </div>
          ))}
          <input
            type="text"
            name="nama"
            placeholder="Nama"
            value={formData.nama}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="alamat"
            placeholder="Alamat"
            value={formData.alamat}
            onChange={handleChange}
          />
          <input
            type="text"
            name="no_hp"
            placeholder="No HP"
            value={formData.no_hp}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
