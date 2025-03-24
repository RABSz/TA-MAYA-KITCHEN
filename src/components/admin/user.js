// Import React dan dependencies
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaUserEdit, FaUserTimes, FaHome } from "react-icons/fa";
import axios from "axios";
import "./user.css";

const User = () => {
  const [users, setUsers] = useState([]); // State untuk menyimpan data pengguna
  const [error, setError] = useState(null); // State untuk menangani error
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman aktif
  const [usersPerPage] = useState(11); // Jumlah pengguna per halaman (12)
  const navigate = useNavigate();

  // Ambil data pengguna dari API saat komponen dimuat
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        // Filter pengguna dengan role "User"
        const filteredUsers = response.data.filter(
          (user) => user.role === "User"
        );
        setUsers(filteredUsers); // Set pengguna yang sudah difilter ke state
        setError(null); // Reset state error
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Gagal mengambil data pengguna. Coba lagi nanti.");
      }
    };

    fetchUsers();
  }, []);

  // Fungsi untuk menavigasi ke halaman tambah pengguna
  const handleAddUser = () => {
    navigate("/adduser");
  };

  // Fungsi untuk menavigasi ke halaman edit pengguna
  const handleEditUser = (id) => {
    navigate(`/edituser/${id}`);
  };

  // Fungsi untuk menghapus pengguna
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Gagal menghapus pengguna. Coba lagi nanti.");
    }
  };

  // Fungsi untuk menavigasi ke halaman dashboard
  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  // Logika untuk pagination
  const indexOfLastUser = currentPage * usersPerPage; // Indeks pengguna terakhir pada halaman saat ini
  const indexOfFirstUser = indexOfLastUser - usersPerPage; // Indeks pengguna pertama pada halaman saat ini
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser); // Ambil data pengguna sesuai dengan halaman

  // Menghitung jumlah total halaman
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Fungsi untuk menangani klik halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="user-page">
      <header className="user-header">
        <h2>Manajemen Pengguna</h2>
        <div className="header-actions">
          <button className="user-add-button" onClick={handleAddUser}>
            <FaUserPlus className="user-add-icon" />
            Add Users
          </button>
          <button className="dashboard-button" onClick={handleGoToDashboard}>
            <FaHome className="dashboard-icon" />
          </button>
        </div>
      </header>

      {error ? (
        <p className="error-message">{error}</p>
      ) : users.length === 0 ? (
        <p className="no-users-message">Tidak ada pengguna.</p>
      ) : (
        <>
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Alamat</th>
                <th>No HP</th>
                <th>Role</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nama}</td>
                  <td>{user.email}</td>
                  <td>{user.alamat}</td>
                  <td>{user.no_hp}</td>
                  <td>{user.role}</td>
                  <td className="user-actions">
                    <button
                      className="user-edit-button"
                      onClick={() => handleEditUser(user.id)}
                    >
                      <FaUserEdit />
                    </button>
                    <button
                      className="user-delete-button"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <FaUserTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
