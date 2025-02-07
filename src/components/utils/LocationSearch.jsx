import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import { setLocationData, setWeather } from '../../redux/weatherSlice';
import { fetch_openWeather_weatherDetails } from '../../features/weatherActions';

const libraries = ["places"]; 

const LocationSearch = ({ searchLocation, setSearchLocation }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [locationInput, setLocationInput] = useState(searchLocation || '');  // Control input value
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries
  });

  useEffect(() => {
    setIsApiLoaded(isLoaded);
  }, [isLoaded]);

  const searchBoxRef = useRef();

  const handleOnPlacesChanged = async () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places?.length > 0) {
      const place = places[0];
      const newLocationData = {
        lat: place.geometry.location.lat(),
        lon: place.geometry.location.lng(),
        address: place.formatted_address,
        location: place.name,
        city: '',
      };

      place.address_components?.forEach(component => {
        if (component.types.includes('locality')) {
          newLocationData.city = component.long_name;
        }
      });

      dispatch(setLocationData(newLocationData));
      console.log('Selected location data:', newLocationData);
      const weatherDetails = await fetch_openWeather_weatherDetails(newLocationData.lat, newLocationData.lon);
      console.log(weatherDetails, 'weatherDetails... checking empty');
      dispatch(setWeather(weatherDetails));

      // **Update the input field value**
      setLocationInput(newLocationData.location);
      if (setSearchLocation) {
        setSearchLocation(newLocationData.location);
      }
    } else {
      console.error('No places found');
    }
  };

  return isLoaded ? (
    <StandaloneSearchBox
      onLoad={ref => searchBoxRef.current = ref}
      onPlacesChanged={handleOnPlacesChanged}
    >
      <div className="flex justify-between border border-sky-100 focus-within:ring-1 focus-within:ring-blue-500 focus:outline-none shadow-md rounded-xl">
        <div className="flex items-center p-2 text-sky-200">
          <MapPin className="h-5 w-5" />
        </div>
        <input
          type="text"
          ref={inputRef}
          value={locationInput}  // Controlled input
          onChange={(e) => setLocationInput(e.target.value)} // Allow user input
          placeholder="Search for location"
          className="flex-1 py-3 px-4 text-sky-50 bg-transparent focus:outline-none text-lg"
        />
      </div>
    </StandaloneSearchBox>
  ) : (
    <div className="flex justify-between border border-sky-100 focus-within:ring-1 focus-within:ring-blue-500 focus:outline-none shadow-md rounded-xl">
      <div className="flex items-center p-2 text-sky-200">
        <MapPin className="h-5 w-5" />
      </div>
      <input
        type="text"
        disabled
        placeholder="Loading location search..."
        className="flex-1 py-3 px-4 text-sky-800 bg-transparent focus:outline-none text-lg"
      />
    </div>
  );
};

export default LocationSearch;
