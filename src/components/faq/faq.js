import React, { useState } from "react";
import "./faq.css";
import { FaPlus, FaMinus } from "react-icons/fa"; // Ikon Plus dan Minus
import "@fontsource/poppins/400.css"; // Mengimpor font Poppins
import "@fontsource/poppins/600.css"; // Mengimpor font Poppins

const faqList = [
  {
    question: "Apa itu Nastar Maya Kitchen?",
    answer:
      "Nastar Maya Kitchen adalah toko kue yang berfokus pada pembuatan kue kering dengan bahan terbaik. Disini juga bersedia menerima pesanan.",
  },
  {
    question: "Apakah produk Nastar Maya Kitchen halal?",
    answer: "Ya, semua produk kami telah mendapatkan persetujuan halal.",
  },
  {
    question: "Bagaimana cara memesan produk?",
    answer:
      "Anda dapat memesan melalui website kami, platform media sosial, atau menghubungi kontak kami langsung.",
  },
  {
    question: "Apakah Nastar Maya Kitchen menawarkan pengiriman?",
    answer: "Ya, kami menyediakan layanan pengiriman untuk area tertentu.",
  },
  {
    question: "Berapa lama daya tahan kue Nastar Maya Kitchen?",
    answer:
      "Produk kami dapat bertahan hingga 2 minggu jika disimpan dalam wadah kedap udara.",
  },
];

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      {/* FAQ Section */}
      <section className="faq-section">
        <div className="svg-container">
          {/* Kontainer untuk SVG */}
          <svg
            className="svg-separator"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#6f429f"
              fillOpacity="1"
              d="M0,96L48,122.7C96,149,192,203,288,240C384,277,480,299,576,282.7C672,267,768,213,864,192C960,171,1056,181,1152,192C1248,203,1344,213,1392,218.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>
        <h2 id="faq" className="faq-title">
          Pertanyaan yang Sering Diajukan
        </h2>
        <div className="faq-container">
          {faqList.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <div className="faq-header" onClick={() => toggleFAQ(index)}>
                <div className="faq-question">{item.question}</div>
                <div className="faq-icon">
                  {activeIndex === index ? <FaMinus /> : <FaPlus />}
                </div>
              </div>
              <div
                className="faq-answer"
                style={{
                  maxHeight: activeIndex === index ? "200px" : "0",
                }}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Faq;
