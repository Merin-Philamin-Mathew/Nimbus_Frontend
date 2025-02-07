import { useDispatch, useSelector } from "react-redux";
import { setCurrentLocationData, setWeather } from "../../redux/weatherSlice";
import { useEffect } from "react";
import Header from "../../components/partials/Header";
import CurrentWeatherDisplay from "../../components/weather/CurrentWeatherDisplay";
import LoginModal from "../../components/user/LoginModal";

function HomePage() {
  const weatherSliceData = useSelector(state => state.weather)
  const {locationData,  currentLocationData, weatherData } = weatherSliceData

  const dispatch = useDispatch()

  useEffect(() => {
    console.log(weatherData,'dslfjldsfjldjfld');
    
    if (!currentLocationData?.lat || Object.keys(currentLocationData).length === 0) {
      console.log('runing',currentLocationData)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log("Geolocation not supported");
      }
    }
  }, [weatherData]); 
  

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Make API call to OpenWeatherMap
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=565e8d804011093dc03657a23fabc685`)
      .then(response => response.json())
      .then(data => {
        dispatch(setWeather(data))
        console.log(data);
        dispatch(setCurrentLocationData({  
          lat: data.coord.lat,
          lon: data.coord.lon,
          location:data.name}))
      })
      .catch(error => console.log(error));

     
  }

  function error() {
    console.log("Unable to retrieve your location");
  }
  return (
    <div>
      <Header currentLocation={currentLocationData.location} searchLocation={locationData.location}/>
      
      <LoginModal />

      
      {/* Main Content Area */}
      <div className='bg-gradient-to-b from-teal-800 to-amber-800 text-slate-200 shadow-lg'>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Weather Card */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-xl shadow-xl p-6">
            <CurrentWeatherDisplay weatherData={weatherData}></CurrentWeatherDisplay>
          </div>

          {/* Hourly Forecast Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-xl p-6 h-[300px]">
            <h2 className="text-xl font-semibold text-white mb-4">Hourly Forecast</h2>
            {/* Add Hourly Forecast Component Here */}
          </div>

          {/* Weekly Forecast Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-xl p-6 h-[300px]">
            <h2 className="text-xl font-semibold text-white mb-4">10-Day Forecast</h2>
            {/* Add Weekly Forecast Component Here */}
          </div>


          {/* Map Card */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-xl shadow-xl p-6 h-[400px]">
            <h2 className="text-xl font-semibold text-white mb-4">Weather Map</h2>
            {/* Add Map Component Here */}
          </div>
        </div>
      </main>
      </div>
    </div>
  )
}

export default HomePage
