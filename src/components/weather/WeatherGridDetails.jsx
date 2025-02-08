import React from 'react';
import { 
  Sun, 
  Wind, 
  Droplets, 
  CloudRain, 
  Thermometer, 
  Eye, 
  Moon, 
  Gauge,
  Sun as UVIcon
} from "lucide-react";

const WeatherDetailsGrid = ({ weatherData }) => {
  const toCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);
  
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // Calculate UV index based on time of day and cloud cover
  const calculateUVIndex = () => {
    const hour = new Date().getHours();
    const cloudCover = weatherData?.clouds?.all || 0;
    const baseUV = hour >= 10 && hour <= 16 ? 8 : 3;
    return Math.max(1, Math.round(baseUV * (1 - cloudCover/100)));
  };

  const getUVDescription = (uv) => {
    if (uv >= 8) return 'Very High';
    if (uv >= 6) return 'High';
    if (uv >= 3) return 'Moderate';
    return 'Low';
  };

  const getVisibilityDescription = (meters) => {
    const km = meters / 1000;
    if (km >= 10) return 'Excellent';
    if (km >= 5) return 'Good';
    if (km >= 2) return 'Moderate';
    return 'Poor';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Temperature Card with Graph */}
      <div className="bg-white/5 shadow-xl rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-200">Temperature</h3>
          <Thermometer className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-4xl font-bold text-white">{toCelsius(weatherData?.main?.temp)}°</div>
          <div className="flex-1">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 rounded-full">
              <div 
                className="h-2 bg-white rounded-full" 
                style={{
                  width: '4px',
                  marginLeft: `${((parseFloat(toCelsius(weatherData?.main?.temp)) + 20) / 60) * 100}%`
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-300 grid grid-cols-2 gap-2">
          <div>Low: {toCelsius(weatherData?.main?.temp_min)}°C</div>
          <div>High: {toCelsius(weatherData?.main?.temp_max)}°C</div>
        </div>
      </div>

      {/* Feels Like Card */}
      <div className="bg-white/5 shadow-xl rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-200">Feels Like</h3>
          <Thermometer className="w-5 h-5 text-red-400" />
        </div>
        <div className="text-4xl font-bold text-white mb-2">{toCelsius(weatherData?.main?.feels_like)}°C</div>
        <div className="text-sm text-gray-300">
          {parseFloat(toCelsius(weatherData?.main?.feels_like)) > parseFloat(toCelsius(weatherData?.main?.temp)) 
            ? 'Feels warmer due to humidity'
            : 'Feels colder due to wind'}
        </div>
      </div>

      {/* Wind Card with Compass */}
      <div className="bg-white/5 shadow-xl rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-200">Wind</h3>
          <Wind className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-14 h-14 border-2 border-cyan-400 rounded-full flex items-center justify-center transition-transform duration-500"
                style={{ transform: `rotate(${weatherData?.wind?.deg}deg)` }}
              >
                <div className="w-2 h-8 bg-cyan-400 rounded transform -translate-y-1"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{(weatherData?.wind?.speed * 3.6).toFixed(1)} km/h</div>
            <div className="text-sm text-gray-300">Gusts: {(weatherData?.wind?.gust * 3.6).toFixed(1)} km/h</div>
          </div>
        </div>
      </div>

      {/* UV Index Card */}
      <div className="bg-white/5 shadow-xl rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-200">UV Index</h3>
          <UVIcon className="w-5 h-5 text-yellow-400" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-4xl font-bold text-white">{calculateUVIndex()}</div>
          <div className="flex-1">
            <div className="text-lg text-gray-200 mb-1">{getUVDescription(calculateUVIndex())}</div>
            <div className="h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full">
              <div 
                className="h-2 bg-white rounded-full" 
                style={{
                  width: '4px',
                  marginLeft: `${(calculateUVIndex() / 11) * 100}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Visibility Card */}
      <div className="bg-white/5 shadow-xl rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-200">Visibility</h3>
          <Eye className="w-5 h-5 text-green-400" />
        </div>
        <div className="text-4xl font-bold text-white mb-2">{(weatherData?.visibility / 1000).toFixed(1)} km</div>
        <div className="text-lg text-gray-200">{getVisibilityDescription(weatherData?.visibility)}</div>
        <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-green-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (weatherData?.visibility / 100))}%` }}
          />
        </div>
      </div>

      {/* Humidity Card */}
      <div className="bg-white/5 shadow-xl rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-200">Humidity</h3>
          <Droplets className="w-5 h-5 text-blue-400" />
        </div>
        <div className="text-4xl font-bold text-white mb-2">{weatherData?.main?.humidity}%</div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {[...Array(7)].map((_, i) => (
            <div 
              key={i}
              className="h-8 rounded"
              style={{
                backgroundColor: i < Math.ceil(weatherData?.main?.humidity / 15) 
                  ? `rgba(96, 165, 250, ${0.4 + (i * 0.1)})` 
                  : 'rgba(255, 255, 255, 0.1)'
              }}
            />
          ))}
        </div>
        <div className="text-sm text-gray-300">
          Dew point: {toCelsius(weatherData?.main?.temp - ((100 - weatherData?.main?.humidity) / 5))}°C
        </div>
      </div>

      {/* Pressure Card */}
      <div className="bg-white/5 shadow-xl rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-200">Pressure</h3>
          <Gauge className="w-5 h-5 text-purple-400" />
        </div>
        <div className="text-4xl font-bold text-white mb-2">{weatherData?.main?.pressure} hPa</div>
        <div className="text-sm text-gray-300">
          <div>Sea Level: {weatherData?.main?.sea_level || weatherData?.main?.pressure} hPa</div>
          <div>Ground Level: {weatherData?.main?.grnd_level || '---'} hPa</div>
        </div>
      </div>

      {/* Sun Times Card */}
      <div className="bg-white/5 shadow-xl rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-200">Sun Position</h3>
          <Sun className="w-5 h-5 text-yellow-400" />
        </div>
        <div className="relative h-24 mb-4">
          <div className="absolute inset-x-0 bottom-0 h-32 overflow-hidden">
            <div className="w-full h-32 bg-gradient-to-b from-yellow-500/20 to-transparent rounded-t-full" />
          </div>
          <div 
            className="absolute bottom-0 left-1/2 w-4 h-4 bg-yellow-400 rounded-full transform -translate-x-1/2"
            style={{
              bottom: '20%',
              left: `${((Date.now()/1000 - weatherData?.sys?.sunrise) / 
                (weatherData?.sys?.sunset - weatherData?.sys?.sunrise)) * 100}%`
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-300">Sunrise</div>
            <div className="text-white font-medium">{formatTime(weatherData?.sys?.sunrise)}</div>
          </div>
          <div className="text-right">
            <div className="text-gray-300">Sunset</div>
            <div className="text-white font-medium">{formatTime(weatherData?.sys?.sunset)}</div>
          </div>
        </div>
      </div>

      {/* Moon Card */}
      <div className="bg-white/5 shadow-xl rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-200">Moon Phase</h3>
          <Moon className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex items-center justify-center h-24 mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-gray-800 to-gray-300" />
        </div>
        <div className="text-center text-gray-300">
          {new Date().toLocaleDateString('en-US', { month: 'long' })} Moon
        </div>
      </div>
    </div>
  );
};

export default WeatherDetailsGrid;