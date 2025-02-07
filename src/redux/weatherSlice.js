// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  locationData:  {
    lat: '',
    lon: '',
    address: '',
    location: '',
    city: '',
  },
  currentLocationData:  {
    lat: '',
    lon: '',
    location:''
  },

  weatherData: {},
  forecastData: {}
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLocationData: (state, action) => {
      state.locationData = action.payload;
    },
    setCurrentLocationData: (state, action) => {
      state.currentLocationData = action.payload;
    },
    setWeather: (state, action) => {
      state.weatherData = action.payload;
    },
    setForecastData: (state, action) => {
      state.forecastData = action.payload;
    },
    resetDetails: (state,action) => {
      state.weatherData = {}
      state.forecastData = {}
      state.locationData=  {
          lat: '',
          lon: '',
          address: '',
          location: '',
          city: '',
        },
      state.currentLocationData=  {
          lat: '',
          lon: '',
          location:''
        }

    }
  },
});

export const { setLocationData, 
               setCurrentLocationData,
               setWeather,
               setForecastData,
               resetDetails
          } = weatherSlice.actions;

export default weatherSlice.reducer;