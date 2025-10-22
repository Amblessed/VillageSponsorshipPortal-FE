import axios from "axios";
import {getBaseUrl} from "./getBaseUrl";

const api = axios.create({
    baseURL: getBaseUrl(),
});

export default api;

