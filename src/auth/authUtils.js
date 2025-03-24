import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "http://localhost:5000"; // Replace with your backend URL

// Get user data by decoding the token and using the user ID
export const getUserData = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("No token found in localStorage");
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const response = await axios.get(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Returning user data (name, email, address, phone)
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
