import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Ganti dengan URL backend Anda

/**
 * Fungsi untuk login pengguna.
 * @param {string} email - Nama pengguna
 * @param {string} password - Kata sandi pengguna
 * @returns {Promise} - Promise yang mengembalikan respons dari backend
 */
const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });

    // Simpan token di localStorage setelah login berhasil
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data; // Mengembalikan data login (termasuk token)
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export default login;
