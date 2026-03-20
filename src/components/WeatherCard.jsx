import React from "react";

function WeatherCard({ weather, unit = "C", getWeatherIcon }) {
  if (!weather) return null; // Gracefully handle missing weather data

  // Convert temperature if unit is Fahrenheit
  const temperature =
    unit === "C" ? weather.temp : ((weather.temp * 9) / 5 + 32).toFixed(2);

  return (
    // w-full on mobile, fixed w-80 on desktop
    <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-4 md:p-6 
rounded-2xl shadow-xl text-center w-full md:w-80 text-white mx-auto">

      {/* Weather Icon */}
      <div className="text-5xl">{getWeatherIcon(weather.condition)}</div>

      {/* City Name returned by API */}
      <h2 className="text-2xl font-bold mt-2">{weather.name}</h2>

      {/* Temperature */}
      <p className="text-xl mt-2">
        {temperature}°{unit}
      </p>

      {/* Weather Condition - Clear,Rain,Cloudy */}
      <p className="mt-1 text-lg capitalize">{weather.condition}</p>

      {/* Extra Info - temperature + humidity*/}
      <div className="flex flex-col md:flex-row justify-between w-full mt-4 text-base md:text-lg gap-1 md:gap-0">
        <span>🌡 Temp: {temperature}°{unit}</span>
        <span>💧 Humidity: {weather.humidity}%</span>
      </div>
    </div>
  );
}

export default WeatherCard;