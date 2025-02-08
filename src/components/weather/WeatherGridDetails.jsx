import { Sun, Wind, Droplets, CloudRain, Thermometer } from "lucide-react"

const WeatherDetailsGrid = ({ weatherData }) => {
  // Convert Kelvin to Celsius
  const toCelsius = (kelvin) => (kelvin - 273.15).toFixed(1)

  // Convert timestamp to time
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Temperature Card */}
      <div className="bg-amber-50/10 shadow-lg rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-200">Temperature</h3>
          <Thermometer className="w-5 h-5 text-blue-400" />
        </div>
        <div className="text-4xl font-bold text-white mb-2">{toCelsius(weatherData?.main?.temp)}°C</div>
        <div className="text-sm text-gray-400">
          <div>Min: {toCelsius(weatherData?.main?.temp_min)}°C</div>
          <div>Max: {toCelsius(weatherData?.main?.temp_max)}°C</div>
        </div>
      </div>

      {/* Feels Like Card */}
      <div className="bg-amber-50/10 shadow-lg rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-200">Feels Like</h3>
          <Thermometer className="w-5 h-5 text-red-400" />
        </div>
        <div className="text-4xl font-bold text-white mb-2">{toCelsius(weatherData?.main?.feels_like)}°C</div>
        <div className="text-sm text-gray-400">Humidity factor included</div>
      </div>

      {/* Wind Card */}
      <div className="bg-amber-50/10 shadow-lg rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-200">Wind</h3>
          <Wind className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-14 h-14 border-2 border-cyan-400 rounded-full flex items-center justify-center"
                style={{ transform: `rotate(${weatherData?.wind?.deg}deg)` }}
              >
                <div className="w-2 h-8 bg-cyan-400 rounded transform -translate-y-1"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{weatherData?.wind?.speed} m/s</div>
            <div className="text-sm text-gray-400">From {weatherData?.wind?.deg}°</div>
          </div>
        </div>
      </div>

      {/* Humidity Card */}
      <div className="bg-amber-50/10 shadow-lg rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-200">Humidity</h3>
          <Droplets className="w-5 h-5 text-blue-400" />
        </div>
        <div className="text-4xl font-bold text-white mb-2">{weatherData?.main?.humidity}%</div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: `${weatherData?.main?.humidity}%` }}></div>
        </div>
      </div>

      {/* Sun Times Card */}
      <div className="bg-amber-50/10 shadow-lg rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-200">Sun</h3>
          <Sun className="w-5 h-5 text-yellow-400" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Sunrise</span>
            <span className="text-white">{formatTime(weatherData?.sys?.sunrise)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Sunset</span>
            <span className="text-white">{formatTime(weatherData?.sys?.sunset)}</span>
          </div>
        </div>
      </div>

      {/* Pressure Card */}
      <div className="bg-amber-50/10 shadow-lg rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-200">Pressure</h3>
          <CloudRain className="w-5 h-5 text-purple-400" />
        </div>
        <div className="text-4xl font-bold text-white mb-2">{weatherData?.main?.pressure} hPa</div>
        <div className="text-sm text-gray-400">
          Sea Level: {weatherData?.main?.sea_level || weatherData?.main?.pressure} hPa
        </div>
      </div>
    </div>
  )
}

export default WeatherDetailsGrid

