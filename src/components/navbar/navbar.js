import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap"; // Add this import
import { useState, useEffect } from "react";
import { FaUserAlt, FaShoppingCart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Mayalogo from "../../images/Maya.png";
import "../../components/navbar/navbar.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [cartItems, setCartItems] = useState(0);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [isClosable, setIsClosable] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // Start from 60 seconds
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true);
      setRole(userRole);
    } else {
      setIsLoggedIn(false);
      setRole("");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("paymentSuccess") === "true") {
      setShowPaymentPopup(true);
      const countdown = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setIsClosable(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Decrease by 1 second
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
    setRole("");
    toast.success("Logout Berhasil!", {
      position: "bottom-right",
      autoClose: 3000,
      theme: "dark",
    });
    navigate("/");
  };

  return (
    <>
      <BootstrapNavbar
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        expand="lg"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <Container>
          <BootstrapNavbar.Brand onClick={() => navigate("/")}>
            <img src={Mayalogo} width="50" height="45" alt="Maya Logo" />
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
          <BootstrapNavbar.Collapse id="navbar-nav">
            <Nav className="mx-auto text-center">
              <Nav.Link href="#home">Beranda</Nav.Link>
              <Nav.Link href="#about">Tentang Kami</Nav.Link>
              <Nav.Link href="#produk">Produk</Nav.Link>
              <Nav.Link href="#faq">FAQ</Nav.Link>
              {(role === "Admin" || role === "Superadmin") && (
                <Nav.Link onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Nav.Link>
              )}
            </Nav>
            <div className="navbar-icons d-flex gap-3 align-items-center">
              <Nav.Link onClick={() => navigate("/checkout")}>
                <FaShoppingCart size={24} color="#f5c8d0" />
                {cartItems > 0 && (
                  <span className="cart-badge">{cartItems}</span>
                )}
              </Nav.Link>
              {isLoggedIn ? (
                <>
                  <FaUserAlt
                    size={24}
                    color="#f5c8d0"
                    onClick={() => navigate("/profile")}
                    className="cursor-pointer"
                  />
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => navigate("/Login")}>Login</Nav.Link>
              )}
            </div>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
      {showPaymentPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Konfirmasi Pembayaran</h4>
            <p>
              Silakan segera konfirmasi pembayaran ke WhatsApp admin di nomor{" "}
              <a
                href="https://wa.me/6289624191177"
                target="_blank"
                style={{ fontWeight: "bold", color: "black" }}
              >
                087709230971
              </a>
              .
            </p>
            <p>
              Anda dapat menutup pop-up ini setelah{" "}
              <span style={{ fontWeight: "bold", color: "black" }}>
                {timeLeft} detik
              </span>
              .
            </p>
            <button
              className="btn btn-primary"
              disabled={!isClosable}
              onClick={() => {
                setShowPaymentPopup(false);
                localStorage.removeItem("paymentSuccess");
              }}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default Navbar;
