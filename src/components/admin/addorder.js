import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./addorder.css";

const AddOrder = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    nama: "",
    email: "",
    order: "",
    namaproduk: "",
    jumlahorder: "",
    total: "",
    pembayaran: "",
    status: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure number inputs are stored as numbers
    const parsedValue =
      name === "jumlahorder" || name === "total" ? Number(value) || "" : value;

    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: parsedValue,
    }));
  };

  const handleAdd = async () => {
    // Trim values and validate
    if (
      !order.nama.trim() ||
      !order.email.trim() ||
      !order.order.trim() ||
      !order.namaproduk.trim() ||
      isNaN(order.jumlahorder) ||
      order.jumlahorder <= 0 ||
      isNaN(order.total) ||
      order.total <= 0 ||
      !order.status.trim()
    ) {
      setError("Semua field wajib diisi dengan benar!");
      return;
    }

    try {
      const newOrder = {
        nama: order.nama,
        email: order.email,
        order: order.order,
        namaproduk: order.namaproduk,
        jumlahorder: parseInt(order.jumlahorder, 10),
        total: parseFloat(order.total),
        pembayaran: order.pembayaran,
        status: order.status === "Paid" ? 1 : 0, // Send as 1 (Paid) or 0 (Unpaid)
      };

      const response = await axios.post(
        "http://localhost:5000/transaksi",
        newOrder,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Order berhasil ditambahkan:", response.data);
      navigate("/order");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Terjadi kesalahan saat menambahkan order."
      );
    }
  };

  const handleCancel = () => {
    navigate("/order");
  };

  return (
    <div className="add-order-container">
      <h2>Add Order</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="add-order-form">
        <div className="form-group">
          <label htmlFor="nama">Nama</label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={order.nama}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={order.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="order">Code Order</label>
          <input
            type="text"
            id="order"
            name="order"
            value={order.order}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="namaproduk">Nama Produk</label>
          <input
            type="text"
            id="namaproduk"
            name="namaproduk"
            value={order.namaproduk}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="jumlahorder">Jumlah Order</label>
          <input
            type="number"
            id="jumlahorder"
            name="jumlahorder"
            value={order.jumlahorder}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="total">Total Bayar</label>
          <input
            type="number"
            id="total"
            name="total"
            value={order.total}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pembayaran">Pembayaran</label>
          <input
            type="text"
            id="pembayaran"
            name="pembayaran"
            value={order.pembayaran}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status Bayar</label>
          <select
            id="status"
            name="status"
            value={order.status}
            onChange={handleChange}
          >
            <option value="">-- Pilih Status --</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="button" className="add-button" onClick={handleAdd}>
            Add Order
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrder;
