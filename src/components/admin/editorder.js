import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./editorder.css";

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    nama: "",
    email: "",
    order: "",
    namaproduk: "",
    jumlahorder: 0,
    total: 0,
    pembayaran: "",
    status: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/transaksi/${id}`
        );
        setOrder({
          nama: response.data.nama,
          email: response.data.email,
          order: response.data.order,
          namaproduk: response.data.namaproduk,
          jumlahorder: response.data.jumlahorder,
          total: response.data.total,
          pembayaran: response.data.pembayaran,
          status: response.data.status,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch order details.");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]:
        name === "jumlahorder" || name === "total" ? Number(value) : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/transaksi/${id}`, order);
      alert("Order updated successfully!");
      navigate("/order");
    } catch (err) {
      console.error("Error updating order:", err);
      alert("Failed to update order.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="edit-order-container">
      <h2>Edit Order</h2>
      <form className="edit-order-form">
        <div className="form-group">
          <label>Nama:</label>
          <input
            type="text"
            name="nama"
            value={order.nama}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={order.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Order:</label>
          <input
            type="text"
            name="order"
            value={order.order}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Nama Produk:</label>
          <input
            type="text"
            name="namaproduk"
            value={order.namaproduk}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Jumlah Order:</label>
          <input
            type="number"
            name="jumlahorder"
            value={order.jumlahorder}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Total Bayar:</label>
          <input
            type="number"
            name="total"
            value={order.total}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Pembayaran:</label>
          <input
            type="text"
            name="pembayaran"
            value={order.pembayaran}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status Bayar:</label>
          <select name="status" value={order.status} onChange={handleChange}>
            <option value={1}>Paid</option>
            <option value={0}>Unpaid</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="update-button"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/order")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOrder;
