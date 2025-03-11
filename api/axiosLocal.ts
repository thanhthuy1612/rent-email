import axios from "axios";

const axiosLocal = axios.create();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
axiosLocal.interceptors.request.use(async (config: any) => {
  const accessToken = localStorage.getItem("token");
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  (config.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    ...config.headers,
  }),
    config.data;

  return config;
});

axiosLocal.interceptors.response.use(
  (response) => {
    if (response?.status === 200 && response?.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    console.warn(`Lỗi kết nối đến cơ sở dữ liệu, ${error.message}`);
  }
);

export default axiosLocal;
