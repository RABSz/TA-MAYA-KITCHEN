import React from "react";
import Home from "../components/home/home";
import Navbar from "../components/navbar/navbar";
import About from "../components/about/about";
import Produk from "../components/produk/produk";
import Faq from "../components/faq/faq";
import Footer from "../components/footer/footer";

function app() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Produk />
      <Faq />
      <Footer />
    </div>
  );
}

export default app;
