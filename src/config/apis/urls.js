const OPENWEATHERAPI_ID = import.meta.env.VITE_OPENWEATHERAPI_ID;
const METABLUEAPI_ID = import.meta.env.VITE_METABLUE_API_ID;

export const WEATHER_URLS = {
    weather: (lat,lon) => `/weather/?lat=${lat}&lon=${lon}&appid=${OPENWEATHERAPI_ID}`,
    forecast: (lat,lon,count) => `/forecast/?lat=${lat}&lon=${lon}&cnt=${count}&appid=${OPENWEATHERAPI_ID}`,

    metablue: (lat,lon) => `/packages/basic-1h_basic-day?apikey=${METABLUEAPI_ID}&lat=${lat}&lon=${lon}&asl=9&format=json`
}
export const USER_URLS = {
    admin_login:  `api/auth/admin-login/`,
    google_login:  `api/auth/google-login/`,
    get_users:  `api/auth/users/`,
    user_active_status:  `api/auth/user-active-status/`
}