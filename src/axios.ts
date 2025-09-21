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

HTTP.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
