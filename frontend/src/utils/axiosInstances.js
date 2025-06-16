import axios from "axios";
import { BASE_URL } from "./apiPath";


const axiosInstance = axios.create({
  baseURL: BASE_URL  ,
  timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response ) {
            if(error.response.status === 401){
                window.location.href = "/login"; // Redirect to login page
            }else if(error.response.status === 500){
                console.error("Server error:", error.response.data);
            }  
        }
        else if(error.code === 'ECONNABORTED'){
            console.error("Request timeout:", error.message);
        }
        return Promise.reject(error);
    }
)

export default axiosInstance