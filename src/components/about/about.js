import React from "react";
import "../about/about.css";
import foto1 from "../../images/about.jpeg"; // Mengimpor gambar dengan nama variabel
import foto2 from "../../images/about2.jpeg"; // Mengimpor gambar dengan nama variabel
import foto3 from "../../images/about3.jpeg"; // Mengimpor gambar dengan nama variabel
import "@fontsource/poppins/400.css"; // Mengimpor font Poppins
import "@fontsource/poppins/600.css"; // Mengimpor font Poppins

function About() {
  return (
    <section
      className="about-section"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#6f429f"
            fill-opacity="1"
            d="M0,192L48,192C96,192,192,192,288,208C384,224,480,256,576,256C672,256,768,224,864,224C960,224,1056,256,1152,272C1248,288,1344,288,1392,288L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="about-content">
        <div id="about" className="about-text">
          <h2>Selamat Datang di Nastar Maya Kitchen</h2>
          <p>
            Kami mengubah bahan sederhana menjadi kue kering berkualitas tinggi.
            Berawal dari hobi membuat kue rumahan, kami berkomitmen untuk
            menyajikan kelezatan dalam setiap gigitan. Setiap kue yang kami buat
            adalah wujud cinta dan perhatian kami kepada pelanggan, menggunakan
            bahan terbaik dan resep yang teruji.
          </p>
          <p>
            Maya Kitchen juga bersedia menerima pesanan untuk keperluan kantor
            atau acara di rumah. Seperti nasi kotak, tumpeng, snack, dan
            lain-lain.
          </p>
          <p>
            Kami juga bangga menginformasikan bahwa semua produk kami telah
            mendapatkan persetujuan halal. Dengan komitmen terhadap kualitas dan
            kehalalan. Maya Kitchen siap memberikan yang terbaik untuk Anda dan
            keluarga.
          </p>
        </div>
        <div className="about-images">
          <img src={foto2} alt="Foto 2" />
          <img src={foto1} alt="Foto 1" />
          <img src={foto3} alt="Foto 3" />
        </div>
      </div>
      {/* SVG pembatas bawah */}
      <svg
        className="svg-bottom"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#6f429f"
          fillOpacity="1"
          d="M0,96L48,128C96,160,192,224,288,229.3C384,235,480,181,576,181.3C672,181,768,235,864,218.7C960,203,1056,117,1152,101.3C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
}

export default About;
