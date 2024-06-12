import axios from "axios";

// Tạo ra phiên bản axios mà theo í của mình
const instance = axios.create({
    baseURL: "http://localhost:3037",
    withCredentials: true,
});

export default instance;