import { useDispatch, useSelector } from "react-redux";
import { setCurrentLocationData, setForecastData, setWeather } from "../../redux/weatherSlice";
import { useEffect } from "react";
import Header from "../../components/partials/Header";
import CurrentWeatherDisplay from "../../components/weather/CurrentWeatherDisplay";
import LoginModal from "../../components/user/LoginModal";
import { fetch_openWeather_forecastDetails, fetch_openWeather_weatherDetails } from "../../features/weatherActions";
import WeatherCharts from "../../components/weather/WeatherCharts";
import WeatherHeader from "../../components/weather/WeatherHeader";
import WeatherDetailsGrid from "../../components/weather/WeatherGridDetails";
import WeatherSubheader from "../../components/partials/SubHeader";

function HomePage() {
  const weatherSliceData = useSelector(state => state.weather)
  const {locationData,  currentLocationData, weatherData, forecastData } = weatherSliceData

  const dispatch = useDispatch()

  useEffect(() => {
    
    if (!currentLocationData?.lat || Object.keys(currentLocationData).length === 0) {
      console.log('runing',currentLocationData)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log("Geolocation not supported");
      }
    }
  }, [weatherData]); 
  

  async function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    
    const weather_response = await fetch_openWeather_weatherDetails(latitude,longitude)

    dispatch(setWeather(weather_response))
    dispatch(setCurrentLocationData({  
      lat: weather_response.coord.lat,
      lon: weather_response.coord.lon,
      location:weather_response.name}))
    
    const forecast_response = await fetch_openWeather_forecastDetails(latitude,longitude,10) 
    dispatch(setForecastData(forecast_response))
     
  }

  function error() {
    console.log("Unable to retrieve your location");
  }
  return (
    <div>
      <Header searchLocation={locationData.location} />
      
      <WeatherSubheader currentLocation={currentLocationData.location} />
      <LoginModal />

      
      {/* Main Content Area */}
      <div className='bg-gradient-to-b from-teal-800 to-amber-800 text-slate-200 shadow-lg'>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           {/* Current Weather Card */}
           <div id="current-conditions" className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-xl shadow-xl p-6">
              <CurrentWeatherDisplay weatherData={weatherData}></CurrentWeatherDisplay>
            </div>
            
          {/* Hourly Forecast Card */}
          <div id="hourly-forecast" className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Hourly Forecast</h2>
              <WeatherCharts forecastData={forecastData}></WeatherCharts>
            </div>
          
          {/* Weather Details Card */}
          <div id="weather-details" className="p-2 lg:col-span-2">
              <WeatherHeader weatherData={weatherData} />
              <WeatherDetailsGrid weatherData={weatherData} />
            </div>

 

          {/* <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-xl p-6 h-[300px]">
            <h2 className="text-xl font-semibold text-white mb-4">10-Day Forecast</h2>
          </div>


          <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-xl shadow-xl p-6 h-[400px]">
            <h2 className="text-xl font-semibold text-white mb-4">Weather Map</h2>
          </div> */}
        </div>
      </main>
      </div>
    </div>
  )
}

export default HomePage
