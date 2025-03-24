// Component Admin.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaUserEdit, FaUserTimes, FaHome } from "react-icons/fa";
import axios from "axios";
import "./admin.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        // Filter users with "Admin" or "Superadmin" roles
        const filteredUsers = response.data.filter(
          (user) => user.role === "Admin" || user.role === "Superadmin"
        );
        setUsers(filteredUsers);
        setError(null); // Reset error if fetch is successful
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  // Navigate to add user page
  const handleAddUser = () => {
    navigate("/addadmin");
  };

  // Navigate to edit user page
  const handleEditUser = (id) => {
    navigate(`/editadmin/${id}`);
  };

  // Handle user deletion
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Please try again later.");
    }
  };

  // Navigate back to dashboard
  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="user-page">
      <header className="user-header">
        <h2>Admin Management</h2>
        <div className="header-actions">
          <button className="user-add-button" onClick={handleAddUser}>
            <FaUserPlus className="user-add-icon" />
            Add Admin
          </button>
          <button className="dashboard-button" onClick={handleGoToDashboard}>
            <FaHome className="dashboard-icon" />
          </button>
        </div>
      </header>

      {error ? (
        <p className="error-message">{error}</p>
      ) : users.length === 0 ? (
        <p className="no-users-message">No admins or superadmins available.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Role</th>
              <th>Alamat</th>
              <th>No HP</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nama}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.alamat}</td>
                <td>{user.no_hp}</td>
                <td className="admin-actions">
                  <button
                    className="admin-edit-button"
                    onClick={() => handleEditUser(user.id)}
                  >
                    <FaUserEdit />
                  </button>
                  <button
                    className="admin-delete-button"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <FaUserTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Admin;
