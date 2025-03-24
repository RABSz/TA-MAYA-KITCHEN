import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";
import "./edituser.css";

const EditUser = () => {
  const { id } = useParams();
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
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setUser({ ...response.data, password: "" }); // Kosongkan password untuk keamanan
      } catch (err) {
        setError("Failed to fetch user data.");
      }
    };
    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      let updatedUser = { ...user };

      // Hapus password jika tidak diubah
      if (!updatedUser.password) {
        delete updatedUser.password;
      } else {
        updatedUser.password = bcrypt.hashSync(updatedUser.password, 10); // Hash password
      }

      // Validasi nomor HP (opsional, bisa pakai regex)
      if (!/^\d+$/.test(updatedUser.no_hp)) {
        setError("Nomor HP harus berupa angka.");
        return;
      }

      // Kirim data yang diperbarui ke backend
      const response = await axios.patch(
        `http://localhost:5000/users/${id}`,
        updatedUser
      );

      if (response.status === 200) {
        setSuccess("User updated successfully.");
        setTimeout(() => navigate("/user"), 1500);
      }
    } catch (err) {
      setError("Failed to update user. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="edit-user-page">
      <h2>Edit User</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form
        className="edit-user-form"
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
              placeholder="Leave empty to keep current password"
              autoComplete="new-password"
            />
            <button type="button" onClick={togglePasswordVisibility}>
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
            Update User
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

export default EditUser;
