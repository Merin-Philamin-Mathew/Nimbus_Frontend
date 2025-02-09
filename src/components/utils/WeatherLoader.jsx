import React from 'react';

const WeatherLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-teal-400 to-teal-600">
      {/* Animated Weather Icons */}
      <div className="relative w-32 h-32 mb-8">
        {/* Cloud SVG with animation */}
        <svg 
          className="absolute animate-bounce" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
          fill="white"
          opacity="0.9"
        >
          <path d="M19.5 14.5A5.5 5.5 0 0 0 14 9c-2.7 0-4.9 1.9-5.4 4.5A3.5 3.5 0 0 0 5 17a3.5 3.5 0 0 0 3.5 3.5h11a4.5 4.5 0 0 0 0-9z" />
        </svg>
        
        {/* Animated Rain Drops */}
        <div className="absolute top-20 left-4 flex space-x-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="w-1 h-4 bg-white rounded-full animate-rainfall"
              style={{
                animationDelay: `${index * 0.2}s`,
                opacity: 0.7
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-white text-xl font-semibold">
        <span className="inline-block animate-pulse">Loading Weather Data...</span>
      </div>

      {/* Loading Progress Bar */}
      <div className="mt-6 w-64 h-2   bg-teal-300 rounded-full overflow-hidden">
        <div className="h-full bg-white rounded-full animate-loadingBar" />
      </div>

      <style jsx>{`
        @keyframes rainfall {
          0% {
            transform: translateY(0);
            opacity: 0.7;
          }
          70% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(100px);
            opacity: 0;
          }
        }

        .animate-rainfall {
          animation: rainfall 1.5s infinite;
        }

        @keyframes loadingBar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .animate-loadingBar {
          animation: loadingBar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WeatherLoader;