import axios from "axios";

const register = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/auth/register",
      userData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.msg || "Server error.");
    } else {
      throw new Error("Tidak ada respon dari server.");
    }
  }
};

export default register;
