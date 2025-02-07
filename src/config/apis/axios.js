import axios from "axios"


const OPENWEATHERAPI_BASEURL = import.meta.env.VITE_OPENWEATHERAPI_BASEURL;
const METABLUEAPI_BASEURL = import.meta.env.VITE_METABLUE_BASEURL;

export const OPENWEATHER_Instance = axios.create({
    baseURL:OPENWEATHERAPI_BASEURL,
})

export const METABLUE_Instance = axios.create({
    baseURL:METABLUEAPI_BASEURL,
})



const BASE_URL = import.meta.env.VITE_BASEURL;
// USER API
// const csrfToken = Cookies.get('csrftoken'); // Django's default CSRF cookie name is 'csrftoken'

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        // 'X-CSRFToken': csrfToken, 
    },
});


// ADMIN API
const admin_api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export { BASE_URL, api,admin_api };
