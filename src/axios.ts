// axios.ts (or wherever your HTTP instance is defined)
import axios from "axios";
import helpers from "./helpers";

const baseURL = import.meta.env.VITE_BASE_API;
const token = helpers.getCookie("token");

export const HTTP = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

if (token) {
  HTTP.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Request interceptor (your existing code)
HTTP.interceptors.request.use(
  function (config) {
    const currentToken = helpers.getCookie("token");
    const isAuthRequired = config.url !== "/user/login";
    if (isAuthRequired && !currentToken) {
      console.error(
        "⛔️ Interceptor Blocked: Authentication token is missing."
      );
      return Promise.reject({
        message:
          "Authentication token is missing. Request aborted before sending.",
        response: {
          status: 401,
          data: { error: "Unauthorized access: Token required." },
        },
      });
    }
    return config;
  },
  function (error) {
    console.error("❌ Request Interceptor Setup Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling 401 errors
HTTP.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      window.dispatchEvent(
        new CustomEvent("auth:logout", {
          detail: { reason: "session_expired" },
        })
      );
    }

    return Promise.reject(error);
  }
);
