import React from 'react';
import { MapPin, Wind, Droplets, Eye, Gauge, Thermometer } from 'lucide-react';
import { formatTimestamp } from '../../features/logic/generalLogic';

const CurrentWeatherDisplay = ({ weatherData}) => {
  if (!weatherData) return null;

  // Convert Kelvin to Celsius
  const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);
  
  const temperature = kelvinToCelsius(weatherData?.main?.temp);
  const feelsLike = kelvinToCelsius(weatherData?.main?.feels_like);
  const minTemp = kelvinToCelsius(weatherData?.main?.temp_min);
  const maxTemp = kelvinToCelsius(weatherData?.main?.temp_max);

  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Current Weather Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-amber-500 mb-2">
          <span className="text-sm">{formatTimestamp(weatherData?.dt)}</span>
          <span className="text-sm">Current weather</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Temperature Display */}
          <div className="flex items-center space-x-4">
            <div className="text-6xl font-bold">{temperature}°C</div>
            

            <div className="flex flex-col">
              <span className="text-xl">{weatherData?.weather?.[0]?.main || 'Weather'}</span>
              <span className="text-amber-500">Feels like {feelsLike}°</span>
            </div>
          </div>

          {/* Weather Description */}
          <div className="col-span-2 flex items-center">
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
            className="w-12 h-12"
            />
            <p className="text-lg">
              There will be {weatherData?.weather?.[0]?.description || 'changing weather'}. 
              The high will reach {maxTemp}° on this {weatherData?.main?.humidity > 60 ? 'humid' : 'clear'} day.
            </p>
          </div>
        </div>

        {/* Weather Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
          {/* Air Quality */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-500">Air quality</span>
              <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
            </div>
            <div className="text-2xl font-semibold">
              {/* This is a placeholder as AQI isn't in the data */}
              136
            </div>
          </div>

          {/* Wind */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2 text-amber-500 mb-2">
              <Wind className="h-4 w-4" />
              <span>Wind</span>
            </div>
            <div className="text-2xl font-semibold">
              {Math.round(weatherData?.wind?.speed || 0)} km/h
            </div>
          </div>

          {/* Humidity */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2 text-amber-500 mb-2">
              <Droplets className="h-4 w-4" />
              <span>Humidity</span>
            </div>
            <div className="text-2xl font-semibold">
              {weatherData?.main?.humidity || 0}%
            </div>
          </div>

          {/* Visibility */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2 text-amber-500 mb-2">
              <Eye className="h-4 w-4" />
              <span>Visibility</span>
            </div>
            <div className="text-2xl font-semibold">
              {Math.round((weatherData?.visibility || 0) / 1000)} km
            </div>
          </div>

          {/* Pressure */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2 text-amber-500 mb-2">
              <Gauge className="h-4 w-4" />
              <span>Pressure</span>
            </div>
            <div className="text-2xl font-semibold">
              {weatherData?.main?.pressure || 0} mb
            </div>
          </div>

          {/* Dew Point */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2 text-amber-500 mb-2">
              <Thermometer className="h-4 w-4" />
              <span>Dew point</span>
            </div>
            <div className="text-2xl font-semibold">
              {/* This is a placeholder as dew point isn't in the data */}
              23°
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherDisplay;