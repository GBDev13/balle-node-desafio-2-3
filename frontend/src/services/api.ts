import axios, { AxiosRequestConfig } from "axios";

const envUrl = import.meta.env.API_URL;
const baseURL = typeof envUrl === "string" ? envUrl : "http://localhost:3030";

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(function (config: AxiosRequestConfig) {
  let token = localStorage.getItem("jadedragon.token");
  if (config?.headers) config.headers["Authorization"] = "Bearer " + token;
  return config;
});
