import axios, { AxiosRequestConfig } from "axios";

const baseURL = process.env.API_URL ?? "http://localhost:3030";
export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(function (config: AxiosRequestConfig) {
  let token = localStorage.getItem("jadedragon.token");
  if (config?.headers) config.headers["Authorization"] = "Bearer " + token;
  return config;
});
