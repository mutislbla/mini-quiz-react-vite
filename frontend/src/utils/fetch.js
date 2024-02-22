import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:3000/login", {
      email,
      password,
    });
    if (!response.data.token) {
      throw new Error("Login failed");
    }
    const token = response.data.token;
    Cookies.set("token", token);
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Login Successfully!",
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: `username and password didnt match`,
    });
  }
};

export const register = async (full_name, username, email, password) => {
  try {
    const response = await axios.post("http://localhost:3000/register", {
      full_name,
      username,
      email,
      password,
    });
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Register Successfully!",
    });
    return response.data;
  } catch (error) {
    console.log(`Error register: ${error}`);
  }
};

export const getUser = async () => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get("http://localhost:3000/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(`Error get user: ${error}`);
  }
};

export const getQuestion = async () => {
  try {
    const response = await axios.get("http://localhost:3000/question");
    return response.data;
  } catch (error) {
    console.log(`Error get question: ${error}`);
  }
};
