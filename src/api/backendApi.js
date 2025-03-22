import axios from "axios";

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL ? process.env.BACKEND_BASE_URL : "http://localhost:8080/api";

export const backendApi = axios.create({
  baseURL: BACKEND_BASE_URL,
});

export const jwtBackendApi = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("minimartJwtToken")}`,
  },
});
