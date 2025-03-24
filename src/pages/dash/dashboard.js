import React, { useState } from "react";
import "./dashboard.css";
import Header from "./header.js";
import Sidebar from "./sidebar.js";
import Home from "./home.js";

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header openSidebar={openSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        openSidebar={openSidebar}
      />
      <div className={`content ${openSidebarToggle ? "sidebar-open" : ""}`}>
        <Home />
      </div>
    </div>
  );
}

export default Dashboard;
