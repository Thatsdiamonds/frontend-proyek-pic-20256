import axios from "axios";
import toast from "./toast";

export const apiBase = "http://localhost:8000/";

const api = axios.create({
  baseURL: apiBase + "api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 👉 interceptor request: auto-attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 👉 interceptor response: handle error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Hanya hapus token, role dan user_id tidak disimpan di localStorage
      localStorage.removeItem("token");
      window.location.href = "/login"; // tendang balik ke login wkowkwwk
    }

    if (!error.config?.silent) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Terjadi kesalahan API"
      );
    }

    return Promise.reject(error);
  }
);

// 👉 Utility functions untuk mendapatkan data user dari backend
export const getUserProfile = async () => {
  try {
    const response = await api.get('/user/profile', { silent: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateMyKios = async (formData) => {
  try {
    const response = await api.post('/my-kios?_method=PUT', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating kios:", error);
    throw error;
  }
};

export const getSellerProfile = async () => {
  try {
    const response = await api.get('/my-kios', { silent: true });
    return response.data;
  } catch (error) {
    console.error('Error fetchin seller profile:', error);
    throw error;
  }
}

export const getAllSellerProfile = async () => {
  try {
    const response = await api.get('/penjual', { silent: true });
    return response.data;
  } catch (error) {
    console.error('Error fetchin seller profile:', error);
    throw error;
  }
}

export const getUserRole = async () => {
  try {
    const response = await api.get('/user/profile', { silent: true });
    return response.data.role;
  } catch (error) {
    console.error('Error fetching user role:', error);
    throw error;
  }
};

export const getUserId = async () => {
  try {
    const response = await api.get('/user/profile', { silent: true });
    return response.data.id;
  } catch (error) {
    console.error('Error fetching user ID:', error);
    throw error;
  }
};

export default api;
