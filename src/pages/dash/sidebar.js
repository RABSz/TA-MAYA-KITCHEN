import React from "react";
import { useNavigate } from "react-router-dom"; // Import untuk navigasi
import {
  FaTachometerAlt,
  FaUser,
  FaUserShield,
  FaClipboardList,
  FaBoxOpen,
} from "react-icons/fa";
import { Nav } from "react-bootstrap"; // Import Nav dari react-bootstrap
import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate(); // Hook untuk navigasi

  return (
    <aside className="dashboard-sidebar">
      <nav>
        <ul>
          <li>
            <Nav.Link onClick={() => navigate("/")}>
              <FaTachometerAlt className="sidebar-icon" /> Dashboard
            </Nav.Link>
          </li>
          <li>
            <Nav.Link onClick={() => navigate("/user")}>
              <FaUser className="sidebar-icon" /> Users
            </Nav.Link>
          </li>
          <li>
            <Nav.Link onClick={() => navigate("/admin")}>
              <FaUserShield className="sidebar-icon" /> Admins
            </Nav.Link>
          </li>
          <li>
            <Nav.Link onClick={() => navigate("/order")}>
              <FaClipboardList className="sidebar-icon" /> Orders
            </Nav.Link>
          </li>
          <li>
            <Nav.Link onClick={() => navigate("/produk")}>
              <FaBoxOpen className="sidebar-icon" /> Products
            </Nav.Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
