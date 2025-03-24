import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaUserPlus, FaUserEdit, FaUserTimes } from "react-icons/fa";
import "./user.css";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "User" },
];

const User = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleAddUser = () => {
    navigate("/add-user"); // Navigasi ke halaman Add User
  };

  return (
    <div className="user-page">
      <header className="user-header">
        <h2>User Management</h2>
        <button className="user-add-button" onClick={handleAddUser}>
          <FaUserPlus className="user-add-icon" />
          Add User
        </button>
      </header>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="user-actions">
                <button className="user-edit-button">
                  <FaUserEdit />
                </button>
                <button className="user-delete-button">
                  <FaUserTimes />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
