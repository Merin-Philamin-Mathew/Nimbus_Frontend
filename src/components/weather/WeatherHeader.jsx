const WeatherHeader = ({ weatherData }) => {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Weather Details</h2>
            <p className="text-gray-400">
              {new Date(weatherData.dt * 1000).toLocaleString("en-US", {
                weekday: "long",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
          <div className="flex items-center">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className="w-16 h-16"
            />
            <div className="text-right">
              <p className="text-lg font-medium text-white capitalize">{weatherData.weather[0].description}</p>
              <p className="text-gray-400">
                {weatherData.name}, {weatherData.sys.country}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default WeatherHeader
  
  