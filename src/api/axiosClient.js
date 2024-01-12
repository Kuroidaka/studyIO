import axios from "axios";
import { config } from "../config";


const axiosClient = axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
        'content-type': 'application/json',
    }
})

axiosClient.interceptors.request.use(async config => {
    return config;
  },
  error => {
    Promise.reject(error)
})

axiosClient.interceptors.response.use((res) => {
    if( res && res.data ){
        return res
    }

    return res
}, error => {
    
    // throw error
    console.log(error.response);
    
    return error.response
})

export default axiosClient