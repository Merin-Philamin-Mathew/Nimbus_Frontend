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

  weatherData: {}
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
  },
});

export const { setLocationData, 
               setCurrentLocationData,
               setWeather,
          } = weatherSlice.actions;

export default weatherSlice.reducer;