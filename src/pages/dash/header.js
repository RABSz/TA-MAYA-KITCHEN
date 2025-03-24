import React from "react";
import { BsPersonCircle, BsJustify } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header className="dashboard-header">
      <h1 className="header-title">Dashboard</h1>
      <div className="header-user">
        <span>Welcome, Admin</span>
      </div>
    </header>
  );
};

export default Header;
