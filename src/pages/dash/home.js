import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUser,
  FaUserShield,
  FaClipboardList,
  FaBoxOpen,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./home.css";

const Home = () => {
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Ambil jumlah Users & Admins
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        const users = response.data;
        setUserCount(users.filter((user) => user.role === "User").length);
        setAdminCount(
          users.filter(
            (user) => user.role === "Admin" || user.role === "Superadmin"
          ).length
        );
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    // Ambil jumlah Orders & proses data untuk grafik penjualan
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/transaksi");
        const orders = response.data;

        setOrderCount(orders.length);

        // Mengelompokkan order berdasarkan tanggal
        const groupedOrders = orders.reduce((acc, order) => {
          const date = order.createdAt.split("T")[0]; // Ambil tanggal dari timestamp
          acc[date] = (acc[date] || 0) + 1; // Hitung jumlah order per tanggal
          return acc;
        }, {});

        // Konversi ke format array untuk recharts
        const salesDataArray = Object.keys(groupedOrders).map((date) => ({
          date,
          orders: groupedOrders[date],
        }));

        setSalesData(salesDataArray);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    // Ambil jumlah Products
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/produk");
        setProductCount(response.data.length);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchUsers();
    fetchOrders();
    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <div className="home-stats">
        <div className="home-card">
          <FaUser className="home-card-icon" />
          <div className="home-card-details">
            <h4>Users</h4>
            <p>{userCount}</p>
          </div>
        </div>
        <div className="home-card">
          <FaUserShield className="home-card-icon" />
          <div className="home-card-details">
            <h4>Admins</h4>
            <p>{adminCount}</p>
          </div>
        </div>
        <div className="home-card">
          <FaClipboardList className="home-card-icon" />
          <div className="home-card-details">
            <h4>Orders</h4>
            <p>{orderCount}</p>
          </div>
        </div>
        <div className="home-card">
          <FaBoxOpen className="home-card-icon" />
          <div className="home-card-details">
            <h4>Products</h4>
            <p>{productCount}</p>
          </div>
        </div>
      </div>

      <div className="home-chart">
        <h2>Orders Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Home;
