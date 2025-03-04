import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getStoredTokens = () => {
  const tokenJson = localStorage.getItem("token");
  return tokenJson ? JSON.parse(tokenJson) : null;
};

const refreshToken = async () => {
  const tokens = getStoredTokens();
  if (!tokens || !tokens.refresh) {
    return null;
  }

  try {
    const response = await axios.post(`${API_BASE_URL}users/refresh/`, {
      refresh: tokens.refresh,
    });

    const newTokens = {
      access: response.data.access,
      refresh: response.data.refresh || tokens.refresh,
    };

    localStorage.setItem("token", JSON.stringify(newTokens));
    return newTokens.access;
  } catch (error) {
    console.error("Refresh token failed", error);
    localStorage.removeItem("token");
    return null;
  }
};

api.interceptors.request.use(
  async (config) => {
    const tokens = getStoredTokens();
    if (tokens && tokens.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const originalRequest = error.config;

      if (!originalRequest._retry) {
        originalRequest._retry = true;
        const newAccessToken = await refreshToken();

        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      }
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;