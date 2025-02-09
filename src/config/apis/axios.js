import axios from "axios"
import  store  from "../../redux/store"; 
import { logoutUser, updateAccessToken } from "../../redux/userSlice";


const OPENWEATHERAPI_BASEURL = import.meta.env.VITE_OPENWEATHERAPI_BASEURL;
const METABLUEAPI_BASEURL = import.meta.env.VITE_METABLUE_BASEURL;

export const OPENWEATHER_Instance = axios.create({
    baseURL:OPENWEATHERAPI_BASEURL,
})

export const METABLUE_Instance = axios.create({
    baseURL:METABLUEAPI_BASEURL,
})


const BASE_URL = import.meta.env.VITE_BASEURL;

const state = store.getState();  
// USER API
// const csrfToken = Cookies.get('csrftoken'); // Django's default CSRF cookie name is 'csrftoken'

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
;



    api.interceptors.request.use(
        (config) => {
            // Get the access token from Redux store
        
            const accessToken = state?.user?.user_details?.access; 

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
    
            // If refresh token fails, logout the user
            if (originalRequest.url.includes('/auth/token/refresh/')) {
                store.dispatch(logoutUser());
                toast.warning('Your session has expired');
                return Promise.reject(error);
            }
    
            // If access token expired, refresh it
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    console.log('Calling refresh token...');
                    const refreshToken = store.getState()?.user?.user_details?.refresh; 
    
                    const { data } = await api.post('api/auth/token/refresh/', { refresh: refreshToken });
                    console.log('New access token received:', data);
    
                    store.dispatch(updateAccessToken(data.access)); // Update token in Redux
    
                    originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
                    return api(originalRequest); // Retry the failed request with new token
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                } 
            }
    
            return Promise.reject(error);
        }
    );
    

export { BASE_URL, api };
