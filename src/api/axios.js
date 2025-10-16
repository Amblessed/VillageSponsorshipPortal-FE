import axios from "axios";
import {getBaseUrl} from "./getBaseUrl";

const api = axios.create({
    // baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080",
    baseURL: getBaseUrl(),
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
