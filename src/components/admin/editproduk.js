import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./editproduk.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    nama_produk: "",
    deskripsi: "",
    harga: "",
    gambar: "",
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/produk/${id}`);
        if (response.data) {
          setProduct(response.data);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product data. Please try again.");
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!product.nama_produk || !product.deskripsi || !product.harga) {
      setError("All fields must be filled.");
      setIsLoading(false);
      return;
    }

    const harga = parseFloat(product.harga);
    if (isNaN(harga) || harga <= 0) {
      setError("Price must be a valid positive number.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/produk/${id}`, {
        ...product,
        harga,
      });
      if (response.status === 200) {
        navigate("/produk");
      } else {
        setError("Failed to update product.");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-page">
      <header className="product-header">
        <h2>Edit Product</h2>
      </header>

      {error && <p className="error-message">{error}</p>}
      {isLoading && <p>Saving changes...</p>}

      <form className="product-form" onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="nama_produk">Product Name</label>
          <input
            type="text"
            id="nama_produk"
            name="nama_produk"
            value={product.nama_produk}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="deskripsi">Description</label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            value={product.deskripsi}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="harga">Price</label>
          <input
            type="number"
            id="harga"
            name="harga"
            value={product.harga}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gambar">Image URL</label>
          <input
            type="text"
            id="gambar"
            name="gambar"
            value={product.gambar}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="save-button" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/produk")}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
