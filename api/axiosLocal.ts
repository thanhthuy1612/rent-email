import axios from "axios";

const axiosLocal = axios.create({
  baseURL: "http://103.171.0.146/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosLocal.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosLocal.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const { data } = await axiosLocal.post("/web/user/refresh-token", {
          refreshToken,
        });
        localStorage.setItem("accessToken", data.data.accessToken);
        axiosLocal.defaults.headers.common["Authorization"] =
          `Bearer ${data.data.accessToken}`;
        return axiosLocal(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        delete axiosLocal.defaults.headers.common.Authorization;
        window.location.href = "/";
        console.error("Error during token expiration:", refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosLocal;
