import axios from "axios";
import toast from "./toast";

const api = axios.create({
  baseURL: "http://localhost:8000/api/", // ganti sesuai URL Laravel lu
});

// Interceptor response error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(
      error.response?.data?.message ||
        error.message ||
        "Terjadi kesalahan API"
    );
    return Promise.reject(error);
  }
);

export default api;