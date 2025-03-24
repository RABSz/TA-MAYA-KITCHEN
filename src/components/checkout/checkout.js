import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./checkout.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Mengambil cart dari localStorage saat komponen dimuat
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Fungsi untuk mendapatkan URL gambar
  const getImageSrc = (gambar) => {
    if (gambar && gambar.startsWith("http")) {
      return gambar; // Jika gambar berupa URL
    }
    return `http://localhost:5000/uploads/${gambar}`; // Jika gambar berupa nama file
  };

  // Mengubah jumlah barang di cart
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Menghapus barang dari cart
  const handleRemoveItem = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Hitung subtotal
  const cartItems = cart || [];
  const subtotalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.harga,
    0
  );

  // Simpan data subtotal ke sessionStorage lalu navigasi ke halaman pembayaran
  const handleCheckout = () => {
    sessionStorage.setItem("subtotal", subtotalPrice);
    navigate("/pay", {
      state: {
        subtotal: subtotalPrice,
      },
    });
  };

  return (
    <div className="cart-container">
      <div className="shopping-cart">
        <h2>Shopping Cart</h2>
        <hr />
        <div className="cart-details">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="item-details">
                        <img
                          src={getImageSrc(item.gambar)}
                          alt={item.nama_produk}
                          className="cart-item-image"
                          onError={(e) =>
                            (e.target.src = "/images/default-image.png")
                          }
                        />
                        <div>
                          <h3>{item.nama_produk}</h3>
                          <div className="quantity-controls">
                            <button
                              onClick={() =>
                                handleQuantityChange(item, item.quantity - 1)
                              }
                              className="quantity-btn"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item, item.quantity + 1)
                              }
                              className="quantity-btn"
                            >
                              +
                            </button>
                            <button
                              onClick={() => handleRemoveItem(item)}
                              className="remove-item-btn"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>Rp {item.harga.toLocaleString("id-ID")}</td>
                    <td>
                      Rp {(item.harga * item.quantity).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="order-summary">
        <h2>Order Summary</h2>
        <hr />
        <div className="summary-details">
          <div className="summary-item">
            <span>Subtotal</span>
            <span>Rp {subtotalPrice.toLocaleString("id-ID")}</span>
          </div>
        </div>
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
        <button className="add-product-button" onClick={() => navigate("/")}>
          Tambah Produk
        </button>
      </div>
    </div>
  );
};

export default Cart;
