import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs"; // Import bcryptjs
import "./adduser.css";

const AddUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nama: "",
    email: "",
    password: "",
    role: "",
    alamat: "",
    no_hp: "",
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State untuk kontrol show/hide password

  // Reset state ketika halaman dimuat
  useEffect(() => {
    setUser({
      nama: "",
      email: "",
      password: "",
      role: "",
      alamat: "",
      no_hp: "",
    });
  }, []);

  // Fungsi untuk menangani perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enkripsi password sebelum mengirim ke backend
      const hashedPassword = user.password
        ? bcrypt.hashSync(user.password, 10)
        : null;

      const userData = {
        ...user,
        password: hashedPassword, // Hash password
      };

      await axios.post("http://localhost:5000/users", userData); // Kirim data ke backend
      navigate("/user"); // Redirect ke halaman utama setelah berhasil menambah user
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Failed to add user. Please try again later.");
    }
  };

  // Fungsi untuk toggle show/hide password
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="add-user-page">
      <h2>Add New User</h2>
      {error && <p className="error-message">{error}</p>}
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
            placeholder="Enter user name"
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Enter user email"
            required
            autoComplete="off"
          />
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
              placeholder="Enter user password"
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
        </div>
        <div className="form-group">
          <label htmlFor="alamat">Alamat:</label>
          <input
            type="text"
            id="alamat"
            name="alamat"
            value={user.alamat}
            onChange={handleInputChange}
            placeholder="Enter user address"
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="no_hp">No HP:</label>
          <input
            type="number"
            id="no_hp"
            name="no_hp"
            value={user.no_hp}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            required
            autoComplete="off"
          />
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
            <option value="">Select Role</option>
            <option value="User">User</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="update-button">
            Add User
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/user")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
