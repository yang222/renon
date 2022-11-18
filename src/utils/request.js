import axios, {AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig} from 'axios';
import { ElMessage } from 'element-plus';
import router from '../router';

const service = axios.create({
    timeout: 5000,
    baseURL:"/v1"
});


service.interceptors.request.use(
    (config) => {
        console.log(config)
        if(config.url.indexOf("?") > -1){
            config.url= config.url+"&jwt="+(localStorage.getItem("jwt") || '')
        }else{
            config.url= config.url+"?jwt="+(localStorage.getItem("jwt") || '')
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
        console.log(response)
        if (response.status === 200) {
            if(response.data && response.data.successful == 1){
                return response.data;
            }else{
                if(response.data.token || response.data.data){
                    return response.data
                }
               
                ElMessage.error(response.data.responseMsg)
                Promise.reject();
            }
        } else {
            
            Promise.reject();
        }
    },
    (error) => {
        if(error?.response?.data ){
            // router.push("/login")
            ElMessage.error(error?.response?.data.message)
        }else{
            ElMessage.error(error.message)
            // return Promise.reject();
        }
        
    }
);

export default service;
