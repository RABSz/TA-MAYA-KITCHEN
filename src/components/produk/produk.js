import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useState, useEffect } from "react";
import "../produk/produk.css"; // Import CSS untuk styling produk
import { FaShoppingCart } from "react-icons/fa"; // Import ikon belanja
import produk1 from "../../images/pro nastar piring.png"; // Import gambar produk
import produk2 from "../../images/pro nastar daun.png";
import produk3 from "../../images/pro almond.png";
import produk4 from "../../images/pro pie susu.png";
import produk5 from "../../images/pro onde ketawa.jpeg";
import "@fontsource/poppins/400.css"; // Mengimpor font Poppins
import "@fontsource/poppins/600.css"; // Mengimpor font Poppins
import axios from "axios";
import produk from "../../pages/produkpage";

// function Produk() {
//   const navigate = useNavigate(); // Inisialisasi useNavigate

//   const produkList = [
//     {
//       id: 1,
//       nama: "Nastar Piring Jumbo ",
//       deskripsi:
//         "Nastar piring dengan ukuran diameter 30 dan 25. sangat cocok untuk acara acara besar dan lain lain.",
//       harga: "Rp 130.000 - Rp 160.000",
//       gambar: produk1,
//     },
//     {
//       id: 2,
//       nama: "Nastar Daun",
//       deskripsi:
//         "Kue nastar dengan bentuk daun dan memiliki isian selai nanas. 1 paket isi 30 nastar daun, jika ingin beli per biji juga diperbolehkan.",
//       harga: "Rp 120.000",
//       gambar: produk2,
//     },
//     {
//       id: 3,
//       nama: "Almon Krispi",
//       deskripsi:
//         "Kue Almon yang sangat tipis sehingga memiliki tekstur sangat renyah. 1 toples ukuran sedang dengan isian full.",
//       harga: "Rp 40.000",
//       gambar: produk3,
//     },
//     {
//       id: 4,
//       nama: "Pie Coklat Susu",
//       deskripsi: "Kue pie dengan isian coklat dan susu. 1 box isi 6 biji. ",
//       harga: "Rp 30.000",
//       gambar: produk4,
//     },
//     {
//       id: 5,
//       nama: "Onde Onde Ketawa",
//       deskripsi:
//         "Kue onde onde yang sangat mini kemudian dibungkus kedalan wadah. Dengan isian kurang lebih 1/4kg.",
//       harga: "Rp 15.000",
//       gambar: produk5,
//     },
//   ];

//   return (
//     <section id="produk" className="produk-section">
//       <h2 className="produk-title">Produk Kami</h2>
//       <div className="produk-container">
//         {produkList.map((item) => (
//           <div key={item.id} className="produk-card">
//             <img src={item.gambar} alt={item.nama} className="produk-image" />
//             <h3 className="produk-nama">{item.nama}</h3>
//             <p className="produk-deskripsi">{item.deskripsi}</p>
//             <p className="produk-harga">{item.harga}</p>
//             <div className="produk-checkout">
//               <button
//                 className="checkout-link"
//                 onClick={() => navigate("/checkout")} // Fungsi navigasi ke /checkout
//               >
//                 <FaShoppingCart className="checkout-icon" /> Checkout
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Produk;

function Produk() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/produk")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddToCart = (produk) => {
    // Ambil keranjang dari localStorage
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Cek apakah produk sudah ada di keranjang
    const existingItem = currentCart.find((item) => item.id === produk.id);
    if (existingItem) {
      // Update jumlah jika produk sudah ada
      existingItem.quantity += 1;
    } else {
      // Tambahkan produk baru ke keranjang
      currentCart.push({ ...produk, quantity: 1 });
    }

    // Simpan kembali ke localStorage
    localStorage.setItem("cart", JSON.stringify(currentCart));

    // Arahkan ke halaman checkout
    navigate("/checkout");
  };

  return (
    <section id="produk" className="produk-section">
      <h2 className="produk-title">Produk Kami</h2>
      <div className="produk-container">
        {data.map((produk) => (
          <div key={produk.id} className="produk-card">
            <img
              src={produk.gambar}
              alt={produk.nama_produk}
              className="produk-image"
            />
            <h3 className="produk-nama">{produk.nama_produk}</h3>
            <p className="produk-deskripsi">{produk.deskripsi}</p>
            <p className="produk-harga">
              Rp {produk.harga.toLocaleString("id-ID")}
            </p>
            <div className="produk-checkout">
              <button
                className="checkout-link"
                onClick={() => handleAddToCart(produk)}
              >
                <FaShoppingCart className="checkout-icon" /> Tambah ke Keranjang
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Produk;
