import { OPENWEATHER_Instance } from "../config/apis/axios"
import { WEATHER_URLS } from "../config/apis/urls"


export async function fetch_openWeather_weatherDetails(lat,lon) {
    try {
        const response = await OPENWEATHER_Instance.get(WEATHER_URLS.weather(lat,lon))
        console.log('weather response from the actions', response, response.data)
        return response.data
    }
    catch (e) {
        console.log(e);
        
    }
}
export async function fetch_openWeather_forecastDetails(lat,lon,count) {
    try {
        const response = await OPENWEATHER_Instance.get(WEATHER_URLS.forecast(lat,lon,count))
        console.log('forecast response from the actions', response, response.data)
        return response.data
    }
    catch (e) {
        console.log(e);
        
    }
}