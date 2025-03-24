import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./editadmin.css";

const EditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    nama: "",
    email: "",
    password: "",
    alamat: "",
    no_hp: "",
  });
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch admin data from API
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setAdminData({ ...response.data, password: "" }); // Clear password for security
      } catch (err) {
        setError({ submit: "Failed to fetch admin data." });
      }
    };
    fetchAdminData();
  }, [id]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Validate the form inputs
  const validateForm = () => {
    const errors = {};
    if (!adminData.nama.trim()) errors.nama = "Nama wajib diisi.";
    if (!adminData.email.trim()) {
      errors.email = "Email wajib diisi.";
    } else if (!/\S+@\S+\.\S+/.test(adminData.email)) {
      errors.email = "Format email tidak valid.";
    }

    if (adminData.password && adminData.password.length < 6) {
      errors.password = "Password minimal 6 karakter.";
    }

    if (!adminData.alamat.trim()) errors.alamat = "Alamat wajib diisi.";
    if (!adminData.no_hp.trim()) {
      errors.no_hp = "Nomor HP wajib diisi.";
    } else if (!/^\d+$/.test(adminData.no_hp)) {
      errors.no_hp = "Nomor HP hanya boleh berisi angka.";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit the form data to update admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const updatedAdmin = { ...adminData };
      if (!updatedAdmin.password) {
        delete updatedAdmin.password; // Delete password if not updated
      }

      await axios.patch(`http://localhost:5000/users/${id}`, updatedAdmin);
      setSuccessMessage("Admin berhasil diperbarui!");
      setTimeout(() => navigate("/admin"), 2000);
    } catch (err) {
      console.error("Error updating admin:", err);
      setError({
        submit:
          err.response?.data?.msg ||
          "Gagal memperbarui admin. Coba lagi nanti.",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="edit-admin-page">
      <h2>Edit Admin</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error.submit && <p className="error-message">{error.submit}</p>}
      <form
        className="edit-admin-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="form-group">
          <label htmlFor="nama">Nama:</label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={adminData.nama}
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
            value={adminData.email}
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
              value={adminData.password}
              onChange={handleInputChange}
              placeholder="Leave empty to keep current password"
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
            value={adminData.alamat}
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
            value={adminData.no_hp}
            onChange={handleInputChange}
            placeholder="Masukkan nomor HP"
            required
          />
          {error.no_hp && <p className="error-message">{error.no_hp}</p>}
        </div>
        <div className="form-actions">
          <button type="submit" className="update-button">
            Update Admin
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

export default EditAdmin;
