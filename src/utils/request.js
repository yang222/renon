import axios, {AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig} from 'axios';
import { ElMessage } from 'element-plus';
import router from '../router';

const service = axios.create({
    timeout:11000,
    baseURL:import.meta.env.VITE_BASE_URL
});


service.interceptors.request.use(
    (config) => {
        if(config.params){
            config.params['jwt'] = localStorage.getItem("jwt") || ''
        }else{
            config.url = config.url.indexOf('?')> -1?config.url+"&jwt="+(localStorage.getItem("jwt") || ''):config.url+"?jwt="+(localStorage.getItem("jwt") || '')
        }
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    (response) => {

        if (response.status === 200 || response.status === 201) {
            if(response.data && response.data.result){
                return response.data;
            }else{
               if(response.data.version || response.data._id){
                    return response.data;
               }else{
                ElMessage.error(response.data.message)
                Promise.reject();
               }
            }
        } else if(response.status === 401){
           
        } else {
            Promise.reject();
        }
    },
    (error) => {
        // console.log(error)
        if(error?.response?.status == '401' ){
            // router.push("/login")
            router.push("/login")
        }else if(error?.response?.data ){
            // router.push("/login")
            ElMessage.error(error?.response?.data.message)
        }else{
            ElMessage.error(error.message)
            // return Promise.reject();
        }
        
    }
);

export default service;
