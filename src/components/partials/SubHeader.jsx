import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const WeatherSubheader = ({ currentLocation }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 190);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`sticky top-0 z-40 backdrop-blur-sm shadow-md transition-colors duration-300 ${isSticky ? 'bg-amber-700/30' : 'bg-teal-700/90'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between py-3">
          {/* Location Display */}
          {/* Current Location Bar */}

        <div className="flex items-center text-slate-100 space-x-2 text-sm">
            <MapPin className="h-4 w-4" />
            <span>Current Location:</span>
            <span className="font-medium">{currentLocation}</span>
        </div> 
          {/* Navigation Links */}
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => scrollToSection('current-conditions')}
              className="text-slate-200 hover:text-amber-500 transition-colors text-sm font-medium"
            >
              Current Conditions
            </button>
            <button
              onClick={() => scrollToSection('hourly-forecast')}
              className="text-slate-200 hover:text-amber-500 transition-colors text-sm font-medium"
            >
              Hourly Forecast
            </button>
            <button
              onClick={() => scrollToSection('weather-details')}
              className="text-slate-200 hover:text-amber-500 transition-colors text-sm font-medium"
            >
              Atmospheric Conditions
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default WeatherSubheader;