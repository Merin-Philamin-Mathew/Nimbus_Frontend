import React from "react"
import { Line, Bar } from "react-chartjs-2"
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
} from "chart.js"

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
)

export const HourlyForecast = ({ forecastData }) => {
  const next24Hours = forecastData?.list?.slice(0, 10) || [] // Fallback to empty array

  const data = {
    labels: next24Hours.map((item) => 
      new Date(item.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric" })
    ),
    datasets: [
      {
        label: "Temperature (°C)",
        data: next24Hours.map((item) => (item.main.temp - 273.15).toFixed(1)),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4, // Smooth curve
      },
      {
        label: 'Feels Like',
        data: next24Hours.map((item) => (item.main.feels_like - 273.15).toFixed(1)),
        borderColor: '#00bfa5',
        backgroundColor: 'rgba(0, 191, 165, 0.5)',
        tension: 0.4,
      }
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `${value}°C`,
          color: 'white'
        },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      x: {
        ticks: { color: 'white' },
        grid: { display: false }
      }
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="">
        <Line options={options} data={data} />
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs text-white">
      {next24Hours.map((item, index) => (
        <div 
            key={index} 
            className="bg-white/10 rounded p-2 flex flex-row items-center justify-between space-x-4"
        >
            {/* Weather Icon on the Left */}
            <img
            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
            alt={item.weather[0].description}
            className="w-10 h-10"
            />

            {/* Other Details on the Right */}
            <div className="flex flex-col items-end">
            <p className="text-xs">{new Date(item.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric" })}</p>
            <p className="text-xs font-semibold">{(item.main.temp - 273.15).toFixed(1)}°C</p>
            </div>
        </div>
        ))}

      </div>
    </div>
  )
}

export const TenDayForecast = ({ forecastData }) => {
  const dailyData = forecastData?.list?.filter((item, index) => index % 1 === 0) || []

  const data = {
    labels: dailyData.map((item) => 
      new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })
    ),
    datasets: [
      {
        label: "Max Temp (°C)",
        data: dailyData.map((item) => (item.main.temp_max - 273.15).toFixed(1)),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
      {
        label: "Min Temp (°C)",
        data: dailyData.map((item) => (item.main.temp_min - 273.15).toFixed(1)),
        backgroundColor: "rgba(53, 162, 235, 0.7)",
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `${value}°C`,
          color: 'white'
        },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      x: {
        ticks: { color: 'white' },
        grid: { display: false }
      }
    }
  }

  return (
    <div className="h-full pb-10 flex flex-col">
      <div className="flex-grow">
        <Bar options={options} data={data} />
      </div>
      <div className="mt-2 grid grid-cols-5 gap-1 text-center text-xs text-white">
        {dailyData.map((item, index) => (
          <div 
            key={index} 
            className="bg-white/10 rounded p-1 flex flex-col items-center justify-between"
          >
            <p>{new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}</p>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
              className="w-6 h-6"
            />
            <p className="text-red-300">{(item.main.temp_max - 273.15).toFixed(1)}°C</p>
            <p className="text-blue-300">{(item.main.temp_min - 273.15).toFixed(1)}°C</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default { HourlyForecast, TenDayForecast }