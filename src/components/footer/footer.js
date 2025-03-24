import React from "react";
import "../footer/footer.css";
import "@fontsource/poppins/400.css"; // Mengimpor font Poppins
import "@fontsource/poppins/600.css"; // Mengimpor font Poppins
import { FaWhatsapp, FaInstagram, FaMapMarkedAlt } from "react-icons/fa"; // Mengimpor ikon dari react-icons

function Footer() {
  return (
    <div className="footer-section">
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <h3 className="footer-title">Toko Kue Maya Kitchen</h3>
            <p className="footer-address">
              Kp Pandean no 84, RT.03/RW.01, Kebonagung, Kec. Semarang Tim.,
              Kota Semarang, Jawa Tengah 50123
            </p>
            <div className="footer-contact">
              <p>
                <FaWhatsapp size={20} className="footer-icon" />
                <a href="https://wa.me/6282225575907">+62 822-2557-5907</a>
              </p>
              <p>
                <FaWhatsapp size={20} className="footer-icon" />
                <a href="https://wa.me/6283836319524">+62 838-3631-9524</a>
              </p>
            </div>
          </div>
          <div className="footer-right">
            <a
              href="https://www.instagram.com/dapoer_bumaya?igsh=MWM4Z2drZ2cyanN3Yg=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={20} className="footer-icon" />
              Instagram
            </a>
            <a
              href="https://maps.app.goo.gl/LaotxPHHqtrJ8EVy5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMapMarkedAlt size={20} className="footer-icon" />
              Google Maps
            </a>
          </div>
        </div>
        <p className="footer-copyright">
          © {new Date().getFullYear()} Semua Hak Dilindungi
        </p>
      </footer>
    </div>
  );
}

export default Footer;
