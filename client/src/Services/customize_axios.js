import axios from "axios";
import NProgress from "nprogress";

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.3,
    easing: "ease",
    speed: 500,
    trickle: true,
});

// Tạo ra phiên bản axios mà theo í của mình
const instance = axios.create({
    baseURL: "http://localhost:3037",
    withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    NProgress.start();
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance;