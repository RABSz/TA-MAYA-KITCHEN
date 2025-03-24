import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaHome } from "react-icons/fa"; // Tambahkan FaHome
import axios from "axios";
import "./produk.css";

const ProductTable = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Set 5 products per page

  // Ambil data produk dari API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/produk");
        setProducts(response.data);
        setError(null); // Reset error jika berhasil
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  // Fungsi untuk menambah produk baru
  const handleAddProduct = () => {
    navigate("/addproduk");
  };

  // Fungsi untuk mengedit produk
  const handleEditProduct = (id) => {
    navigate(`/editproduk/${id}`);
  };

  // Fungsi untuk menghapus produk
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/produk/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product. Please try again later.");
    }
  };

  // Fungsi untuk kembali ke dashboard
  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="product-page">
      <header className="productt-header">
        <h2>Product Management</h2>
        <div className="header-buttons">
          <button className="product-add-button" onClick={handleAddProduct}>
            <FaPlus className="product-add-icon" />
            Add Product
          </button>
          <button
            className="dashboard-icon-button"
            onClick={handleGoToDashboard}
          >
            <FaHome className="dashboard-icon" />
          </button>
        </div>
      </header>

      {error ? (
        <p className="error-message">{error}</p>
      ) : products.length === 0 ? (
        <p className="no-products-message">No products available.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={
                      product.gambar && product.gambar.startsWith("http")
                        ? product.gambar
                        : "https://via.placeholder.com/100"
                    }
                    alt={product.nama_produk || "No Name"}
                    className="product-image"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{product.nama_produk}</td>
                <td>{product.deskripsi}</td>
                <td>{product.harga}</td>
                <td className="product-actions">
                  <button
                    className="product-edit-button"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="product-delete-button"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
    </div>
  );
};

export default ProductTable;
