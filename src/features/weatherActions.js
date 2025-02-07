import { OPENWEATHER_Instance } from "../config/apis/axios"
import { WEATHER_URLS } from "../config/apis/urls"


export async function fetch_openWeather_weatherDetails(lat,lon) {
    try {
        const response = await OPENWEATHER_Instance.get(WEATHER_URLS.weather(lat,lon))
        console.log('kitty kitty', response, response.data)
        return response.data
    }
    catch (e) {
    }
}