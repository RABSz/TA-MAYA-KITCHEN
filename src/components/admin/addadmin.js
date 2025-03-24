import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./addadmin.css";

const AddAdmin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nama: "",
    email: "",
    password: "",
    role: "",
    alamat: "",
    no_hp: "",
  });
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setUser({
      nama: "",
      email: "",
      password: "",
      role: "",
      alamat: "",
      no_hp: "",
    });
    setError({});
    setSuccessMessage(null);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!user.nama.trim()) errors.nama = "Nama wajib diisi.";
    if (!user.email.trim()) {
      errors.email = "Email wajib diisi.";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Format email tidak valid.";
    }

    if (!user.password.trim()) {
      errors.password = "Password wajib diisi.";
    } else if (user.password.length < 6) {
      errors.password = "Password minimal 6 karakter.";
    }

    if (!user.role) errors.role = "Role wajib dipilih.";
    if (!user.alamat.trim()) errors.alamat = "Alamat wajib diisi.";
    if (!user.no_hp.trim()) {
      errors.no_hp = "Nomor HP wajib diisi.";
    } else if (!/^\d+$/.test(user.no_hp)) {
      errors.no_hp = "Nomor HP hanya boleh berisi angka.";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userData = { ...user };

      await axios.post("http://localhost:5000/users", userData);
      setSuccessMessage("Admin berhasil ditambahkan!");
      setTimeout(() => navigate("/admin"), 2000);
    } catch (err) {
      console.error("Error adding admin:", err);
      setError({
        submit:
          err.response?.data?.msg ||
          "Gagal menambahkan admin. Coba lagi nanti.",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="add-user-page">
      <h2>Tambah Admin Baru</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error.submit && <p className="error-message">{error.submit}</p>}
      <form
        className="add-user-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="form-group">
          <label htmlFor="nama">Nama:</label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={user.nama}
            onChange={handleInputChange}
            placeholder="Masukkan nama admin"
            required
            autoComplete="off"
          />
          {error.nama && <p className="error-message">{error.nama}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Masukkan email admin"
            required
            autoComplete="off"
          />
          {error.email && <p className="error-message">{error.email}</p>}
        </div>
        <div className="form-group password-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              placeholder="Masukkan password admin"
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="toggle-password-button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {error.password && <p className="error-message">{error.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="alamat">Alamat:</label>
          <input
            type="text"
            id="alamat"
            name="alamat"
            value={user.alamat}
            onChange={handleInputChange}
            placeholder="Masukkan alamat"
            required
          />
          {error.alamat && <p className="error-message">{error.alamat}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="no_hp">Nomor HP:</label>
          <input
            type="text"
            id="no_hp"
            name="no_hp"
            value={user.no_hp}
            onChange={handleInputChange}
            placeholder="Masukkan nomor HP"
            required
          />
          {error.no_hp && <p className="error-message">{error.no_hp}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={user.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Pilih Role</option>
            <option value="Admin">Admin</option>
            <option value="Superadmin">Superadmin</option>
          </select>
          {error.role && <p className="error-message">{error.role}</p>}
        </div>
        <div className="form-actions">
          <button type="submit" className="update-button">
            Tambah Admin
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/admin")}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;
