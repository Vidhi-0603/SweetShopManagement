import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sweetshopmanagement-backend.onrender.com",
  timeout: 10000,
  withCredentials: true,
});
export default axiosInstance;