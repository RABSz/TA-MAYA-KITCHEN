import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import homeImage1 from "../../images/home.jpg";
import homeImage2 from "../../images/home2.jpeg";
import homeImage3 from "../../images/home3.jpeg";
import "../home/home.css";
import "@fontsource/poppins/400.css"; // Mengimpor font Poppins
import "@fontsource/poppins/600.css"; // Mengimpor font Poppins

function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [homeImage1, homeImage2, homeImage3];

  const scrollToproduk = () => {
    document.getElementById("produk").scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToImage = (index) => {
    setCurrentImage(index);
  };

  return (
    <section
      id="home"
      className="home-section"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="home-content">
        <div className="home-text">
          <h1>
            "Nikmati Nikmatnya Setiap Gigit dengan Kue Kering Spesial dari Maya
            Kitchen"
          </h1>
          <button className="cta-button" onClick={scrollToproduk}>
            Coba Sekarang!
          </button>
        </div>
        <div className="images">
          <img
            src={images[currentImage]}
            alt="Home"
            className="slideshow-image"
          />
          <div className="image-navigation">
            <button
              className="nav-button"
              onClick={() =>
                goToImage((currentImage - 1 + images.length) % images.length)
              }
            >
              <FontAwesomeIcon icon={faArrowCircleLeft} /> {/* Panah kiri */}
            </button>
            <button
              className="nav-button"
              onClick={() => goToImage((currentImage + 1) % images.length)}
            >
              <FontAwesomeIcon icon={faArrowCircleRight} /> {/* Panah kanan */}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
