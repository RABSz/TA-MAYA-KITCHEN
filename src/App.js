import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AppPage from "../src/pages/app";
import LoginPage from "../src/pages/loginpage";
import RegisterPage from "./pages/registerpage";
import DashboardPage from "./pages/dash/dashboard";
import UserPage from "./pages/userpage";
import UserAdmin from "./pages/useradmin";
import ProdukPage from "./pages/produkpage";
import AddPage from "./pages/addprodukpage";
import EditPage from "./pages/editpage";
import Checkout from "./components/checkout/checkout";
import AddUser from "./pages/adduserpage";
import AddAdmin from "./pages/addadminpage";
import EditAdmin from "./pages/editadmin";
import EditUser from "./pages/edituser";
import PayProduk from "./pages/pay";
import OrderPage from "./pages/orderpage";
import EditOrder from "./components/admin/editorder";
import AddOrder from "./components/admin/addorder";
import Profil from "./components/profil/myprofil";

// Membuat AuthContext
export const AuthContext = createContext(null);

const App = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    // Cek token di localStorage saat aplikasi dimuat
    const token = localStorage.getItem("token");
    if (token) {
      setAuth({ token }); // Atur auth jika token ada
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <Routes>
          <Route path="/" element={<AppPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin" element={<UserAdmin />} />
          <Route path="/produk" element={<ProdukPage />} />
          <Route path="/addproduk" element={<AddPage />} />
          <Route path="/editproduk/:id" element={<EditPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/addadmin" element={<AddAdmin />} />
          <Route path="/editadmin/:id" element={<EditAdmin />} />
          <Route path="/edituser/:id" element={<EditUser />} />
          <Route path="/pay" element={<PayProduk />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/editorder/:id" element={<EditOrder />} />
          <Route path="/addorder" element={<AddOrder />} />
          <Route path="/profile" element={<Profil />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
