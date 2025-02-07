import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';

const WeatherCharts = ({ forecastData }) => {
  const [activeChart, setActiveChart] = useState('temperature');

  // Process data for 5 days
  const next24Hours = forecastData?.list?.slice(0, 10) || [] // Fallback to empty array

  const processedData = forecastData?.list?.map(item => ({
    time: new Date(item.dt * 1000).toLocaleString('en-US', {
      weekday: 'short',
      hour: 'numeric'
    }),
    temp: +(item.main.temp - 273.15).toFixed(1),
    feels_like: +(item.main.feels_like - 273.15).toFixed(1),
    humidity: item.main.humidity,
    windSpeed: +(item.wind.speed * 3.6).toFixed(1), // Convert to km/h
    icon: item.weather[0].icon
  })) || [];

  // Calculate daily aggregates
  const dailyData = processedData.reduce((acc, item) => {
    const date = new Date(item.time).toLocaleDateString('en-US', { weekday: 'short' });
    if (!acc[date]) {
      acc[date] = {
        date,
        maxTemp: item.temp,
        minTemp: item.temp,
        avgHumidity: item.humidity,
        avgWindSpeed: item.windSpeed,
        count: 1
      };
    } else {
      acc[date].maxTemp = Math.max(acc[date].maxTemp, item.temp);
      acc[date].minTemp = Math.min(acc[date].minTemp, item.temp);
      acc[date].avgHumidity += item.humidity;
      acc[date].avgWindSpeed += item.windSpeed;
      acc[date].count++;
    }
    return acc;
  }, {});

  const dailyArray = Object.values(dailyData).map(day => ({
    ...day,
    avgHumidity: +(day.avgHumidity / day.count).toFixed(1),
    avgWindSpeed: +(day.avgWindSpeed / day.count).toFixed(1)
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
        ticks: { color: 'white' },
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
        label: 'Temperature',
        data: processedData.map(item => item.temp),
        borderColor: '#ff7c43',
        backgroundColor: 'rgba(255, 124, 67, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Feels Like',
        data: processedData.map(item => item.feels_like),
        borderColor: '#00bfa5',
        backgroundColor: 'rgba(0, 191, 165, 0.5)',
        tension: 0.4,
      }
    ]
  };

  const humidityData = {
    labels: dailyArray.map(day => day.date),
    datasets: [{
      label: 'Average Humidity',
      data: dailyArray.map(day => day.avgHumidity),
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
            <>
          <Line options={commonOptions} data={temperatureData} />
        
        </>
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