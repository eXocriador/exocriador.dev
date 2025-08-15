// Конфігурація API
const API_CONFIG = {
  // Базовий URL для API
  BASE_URL:
    process.env.NODE_ENV === "production"
      ? import.meta.env.VITE_API_BASE_URL_PRODUCTION ||
        "https://exocriador-backend.onrender.com"
      : import.meta.env.VITE_API_BASE_URL_DEVELOPMENT ||
        "http://localhost:10000",

  // Endpoints
  ENDPOINTS: {
    CONTACT: "/api/contact",
    HEALTH: "/api/health"
  },

  // Налаштування запитів
  REQUEST_CONFIG: {
    headers: {
      "Content-Type": "application/json"
    },
    timeout: 10000 // 10 секунд
  }
};

// Функція для отримання повного URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Функція для створення конфігурації запиту
export const createRequestConfig = (
  method: "GET" | "POST" | "PATCH" | "DELETE",
  body?: any
) => {
  const config: RequestInit = {
    method,
    headers: API_CONFIG.REQUEST_CONFIG.headers
  };

  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  return config;
};

export default API_CONFIG;
