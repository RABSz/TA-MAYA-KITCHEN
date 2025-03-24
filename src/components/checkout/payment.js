import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { getUserData } from "../../auth/authUtils";
import "bootstrap/dist/css/bootstrap.min.css";
import "./payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [customerData, setCustomerData] = useState({ nama: "", email: "" });
  const [error, setError] = useState("");
  const [jumlahOrder, setJumlahOrder] = useState(0);
  const [namaProduk, setNamaProduk] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isClosable, setIsClosable] = useState(false);

  const subtotal =
    state?.subtotal ?? Number(sessionStorage.getItem("subtotal") || 0);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", "SB-Mid-client-BT151pjl8Td9yeK3");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const fetchCustomerData = async () => {
      const data = await getUserData();
      if (data) {
        setCustomerData({ nama: data.nama, email: data.email });
      } else {
        setError("Silakan login terlebih dahulu.");
        navigate("/login");
      }
    };

    const fetchCartData = () => {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const productNames = cartItems.map((item) => item.nama_produk).join(", ");
      setJumlahOrder(totalQuantity);
      setNamaProduk(productNames);
    };

    fetchCustomerData();
    fetchCartData();
  }, [navigate]);

  const handlePayment = async () => {
    try {
      if (!customerData.nama || !customerData.email || jumlahOrder <= 0) {
        throw new Error("Semua field wajib diisi!");
      }

      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const totalHarga = cartItems.reduce(
        (total, item) => total + item.harga * item.quantity,
        0
      );

      const { data } = await axios.post("http://localhost:5000/midtrans", {
        grossAmount: totalHarga,
        firstName: customerData.nama,
        email: customerData.email,
      });

      if (!data.transactionToken || !data.orderId) {
        throw new Error("Gagal mendapatkan token atau order ID.");
      }

      window.snap.pay(data.transactionToken, {
        onSuccess: async function (result) {
          localStorage.removeItem("cart");
          localStorage.setItem("paymentSuccess", "true");

          try {
            await axios.post("http://localhost:5000/transaksi", {
              nama: customerData.nama,
              email: customerData.email,
              order: data.orderId, // Pakai order ID unik dari backend
              namaproduk: namaProduk,
              jumlahorder: jumlahOrder,
              total: totalHarga,
              pembayaran: result.payment_type,
              status: 1,
            });
          } catch (err) {
            console.error("Gagal menyimpan transaksi ke database:", err);
          }

          navigate("/");
        },
      });
    } catch (error) {
      console.error("Error saat pembayaran:", error);
      setError(`Terjadi masalah dalam pembayaran: ${error.message}`);
    }
  };

  return (
    <div className="payment-container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2 className="text-center">Informasi Pengiriman</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form>
            <div className="mb-3">
              <label>Nama</label>
              <input
                type="text"
                className="form-control"
                value={customerData.nama}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={customerData.email}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label>Jumlah Order</label>
              <input
                type="text"
                className="form-control"
                value={jumlahOrder}
                readOnly
              />
            </div>
          </form>

          <h3>Ringkasan Pesanan</h3>
          <ul className="list-group mb-3">
            <li className="list-group-item">
              Subtotal: Rp {subtotal.toLocaleString("id-ID")}
            </li>
            <li className="list-group-item">Produk: {namaProduk}</li>
          </ul>

          <div className="button-group">
            <button onClick={handlePayment} className="btn btn-success">
              BAYAR SEKARANG
            </button>
            <button onClick={() => navigate("/")} className="btn btn-secondary">
              KEMBALI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
