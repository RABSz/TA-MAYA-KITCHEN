import React, { useState, useEffect } from "react";
import "./myprofil.css";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../auth/authUtils.js";
import axios from "axios";
import { FaUserCircle, FaEdit, FaHistory } from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    alamat: "",
    no_hp: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      if (data) {
        setUser(data);
        setFormData({
          nama: data.nama,
          email: data.email,
          alamat: data.alamat,
          no_hp: data.no_hp,
        });
      } else {
        navigate("/login");
      }
      setLoading(false);
    };
    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/users/${user.id}`,
        formData
      );
      if (response.status === 200) {
        setUser({ ...user, ...formData });
        setEditMode(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error.response?.data || error.message
      );
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleViewHistory = async () => {
    if (!showHistory) {
      try {
        const response = await axios.get(
          `http://localhost:5000/transaksi/email/${user.email}`
        );
        console.log("Transaction response:", response.data);
        setTransactions(response.data);
        setShowHistory(true);
      } catch (error) {
        console.error("Failed to fetch transaction history:", error);
        alert("Failed to load transaction history.");
      }
    } else {
      setShowHistory(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <div className="error-message">No user data found.</div>;
  }

  return (
    <div className="profile-container">
      <button className="back-btn" onClick={() => navigate("/")}>
        X
      </button>
      <h1 className="profile-title">Profile</h1>
      <div className="profile-card">
        <div className="profile-header">
          <FaUserCircle className="profile-icon" />
          <h2 className="profile-name">{user.nama}</h2>
        </div>
        <div className="history-icon" onClick={handleViewHistory}>
          <FaHistory className="history-icon-style" />
        </div>
        <div className="profile-info">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Address:</strong> {user.alamat}
          </p>
          <p>
            <strong>Phone:</strong> {user.no_hp}
          </p>
        </div>
        <button className="edit-btn" onClick={() => setEditMode(true)}>
          <FaEdit /> Edit Profile
        </button>
      </div>
      {editMode && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label>Address</label>
              <input
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                required
              />
              <label>Phone</label>
              <input
                type="text"
                name="no_hp"
                value={formData.no_hp}
                onChange={handleChange}
                required
              />
              <button type="submit" className="save-btn">
                Save
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {showHistory && (
        <div className="transaction-history active">
          <div className="history-modal-content">
            <div className="history-modal-header">
              <h2>Transaction History</h2>
              <button
                className="close-btn"
                onClick={() => setShowHistory(false)}
              >
                X
              </button>
            </div>
            <ul className="transaction-list">
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <li key={tx.id}>
                    <p>
                      <strong>Order ID:</strong> {tx.order}
                    </p>
                    <p>
                      <strong>Total:</strong> {tx.total}
                    </p>
                    <p>
                      <strong>Status:</strong> {tx.status}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(tx.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))
              ) : (
                <p>No transactions found.</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
