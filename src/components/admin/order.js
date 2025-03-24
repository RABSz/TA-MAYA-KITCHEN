import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash, FaUserPlus, FaHome } from "react-icons/fa";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "./order.css";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const navigate = useNavigate();

  // Ambil data transaksi
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/transaksi");
      const formattedOrders = response.data.map((order) => ({
        ...order,
        status: Number(order.status),
      }));
      setOrders(formattedOrders);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Refresh setiap 5 detik
    return () => clearInterval(interval);
  }, []);

  // Menentukan index data yang harus ditampilkan pada halaman tertentu
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleEdit = (id) => {
    navigate(`/editorder/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/transaksi/${id}`);
        setOrders(orders.filter((order) => order.id !== id));
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const handleAddNew = () => {
    navigate("/addorder");
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(orders.length / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="user-page">
      <header className="user-header">
        <h2>Order Transaksi</h2>
        <div className="header-actions">
          <button className="user-add-button" onClick={handleAddNew}>
            <FaUserPlus className="user-add-icon" /> Add Order
          </button>
          <button className="dashboard-button" onClick={handleGoToDashboard}>
            <FaHome className="dashboard-icon" />
          </button>
        </div>
      </header>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          <table className="user-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Code Order</th>
                <th>Nama Produk</th>
                <th>Jumlah Order</th>
                <th>Total Bayar</th>
                <th>Pembayaran</th>
                <th>Status Bayar</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.nama}</td>
                  <td>{order.email}</td>
                  <td>{order.order}</td>
                  <td>{order.namaproduk}</td>
                  <td>{order.jumlahorder}</td>
                  <td>Rp {order.total.toLocaleString()}</td>
                  <td>{order.pembayaran}</td>
                  <td>{order.status === 1 ? "Paid" : "Unpaid"}</td>
                  <td>
                    <div className="user-actions">
                      <button
                        className="user-edit-button"
                        onClick={() => handleEdit(order.id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="user-delete-button"
                        onClick={() => handleDelete(order.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
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
            {[...Array(pageNumbers.length)].map((_, index) => (
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
              disabled={currentPage === pageNumbers.length}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderTable;
