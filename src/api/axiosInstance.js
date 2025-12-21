
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

// attach token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// auto-logout on 401/403
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error(
      "API Error:",
      err.response?.status,
      err.response?.data?.message || err.message
    )
    // if (err.response?.status === 401 || err.response?.status === 403) {
    //   localStorage.removeItem("token");
    //   // optional: redirect to login
    //   window.location.replace("/login");
    
    return Promise.reject(err);
  }
);

export default axiosInstance;