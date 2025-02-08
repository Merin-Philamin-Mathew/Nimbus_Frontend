import React, { useState } from 'react';
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
);

const WeatherCharts = ({ forecastData }) => {
  const [activeChart, setActiveChart] = useState('temperature');

  const next24Hours = forecastData?.list?.slice(0, 10) || [];

  const processedData = next24Hours.map(item => ({
    time: new Date(item.dt * 1000).toLocaleString('en-US', {
      hour: 'numeric'
    }),
    temp: +(item.main.temp - 273.15).toFixed(1),
    feels_like: +(item.main.feels_like - 273.15).toFixed(1),
    humidity: item.main.humidity,
    windSpeed: +(item.wind.speed * 3.6).toFixed(1), // Convert to km/h
    icon: item.weather[0].icon
  }));

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: 'white' }
      }
    },
    scales: {
      y: {
        ticks: { 
          color: 'white',
          callback: (value) => activeChart === 'temperature' ? `${value}°C` : 
                              activeChart === 'humidity' ? `${value}%` :
                              `${value} km/h`
        },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    }
  };

  const temperatureData = {
    labels: processedData.map(item => item.time),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: processedData.map(item => item.temp),
        borderColor: '#ff7c43',
        backgroundColor: 'rgba(255, 124, 67, 0.5)',
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
      {
        label: 'Feels Like (°C)',
        data: processedData.map(item => item.feels_like),
        borderColor: '#00bfa5',
        backgroundColor: 'rgba(0, 191, 165, 0.5)',
        tension: 0.4,
      }
    ]
  };

  const humidityData = {
    labels: processedData.map(item => item.time),
    datasets: [{
      label: 'Humidity (%)',
      data: processedData.map(item => item.humidity),
      backgroundColor: 'rgba(0, 188, 212, 0.7)',
    }]
  };

  const windData = {
    labels: processedData.map(item => item.time),
    datasets: [{
      label: 'Wind Speed (km/h)',
      data: processedData.map(item => item.windSpeed),
      borderColor: '#69b3a2',
      backgroundColor: 'rgba(105, 179, 162, 0.5)',
      tension: 0.4,
    }]
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-center gap-4">
        <button
          onClick={() => setActiveChart('temperature')}
          className={`px-4 py-2 rounded ${
            activeChart === 'temperature' ? 'bg-blue-500' : 'bg-gray-700'
          }`}
        >
          Temperature
        </button>
        <button
          onClick={() => setActiveChart('humidity')}
          className={`px-4 py-2 rounded ${
            activeChart === 'humidity' ? 'bg-blue-500' : 'bg-gray-700'
          }`}
        >
          Humidity
        </button>
        <button
          onClick={() => setActiveChart('wind')}
          className={`px-4 py-2 rounded ${
            activeChart === 'wind' ? 'bg-blue-500' : 'bg-gray-700'
          }`}
        >
          Wind
        </button>
      </div>

      <div className="h-[400px]">
        {activeChart === 'temperature' && (
          <div className="h-full flex flex-col">
            <div className="h-3/4">
              <Line options={commonOptions} data={temperatureData} />
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs text-white">
              {next24Hours.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 rounded p-2 flex flex-row items-center justify-between space-x-4"
                >
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                    className="w-10 h-10"
                  />
                  <div className="flex flex-col items-end">
                    <p className="text-xs">{new Date(item.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric" })}</p>
                    <p className="text-xs font-semibold">{(item.main.temp - 273.15).toFixed(1)}°C</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeChart === 'humidity' && (
          <Bar options={commonOptions} data={humidityData} />
        )}
        {activeChart === 'wind' && (
          <Line options={commonOptions} data={windData} />
        )}
      </div>
    </div>
  );
};

export default WeatherCharts;