import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./addproduk.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    gambar: "",
    nama_produk: "",
    deskripsi: "",
    harga: "",
  });
  const [error, setError] = useState(null);

  // Fungsi untuk menangani perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/produk", product); // API untuk menambahkan produk
      navigate("/produk"); // Redirect ke halaman utama setelah berhasil menambah produk
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Failed to add product. Please try again later.");
    }
  };

  return (
    <div className="add-product-page">
      <h2>Add New Product</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="gambar">Image URL:</label>
          <input
            type="text"
            id="gambar"
            name="gambar"
            value={product.gambar}
            onChange={handleInputChange}
            placeholder="Enter image URL"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nama_produk">Product Name:</label>
          <input
            type="text"
            id="nama_produk"
            name="nama_produk"
            value={product.nama_produk}
            onChange={handleInputChange}
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="deskripsi">Description:</label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            value={product.deskripsi}
            onChange={handleInputChange}
            placeholder="Enter product description"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="harga">Price:</label>
          <input
            type="number"
            id="harga"
            name="harga"
            value={product.harga}
            onChange={handleInputChange}
            placeholder="Enter product price"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">
            Add Product
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/produk")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
