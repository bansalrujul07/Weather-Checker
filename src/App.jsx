import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import bgImage from "./assets/beach_aesthetic.jpeg";

function App() {
  const [city, setCity] = useState("");               //Tracks input field value
  const [weather, setWeather] = useState(null);       //Stores fetched weather data
  const [loading, setLoading] = useState(false);      //Shows loading message during API call
  const [error, setError] = useState("");             //Stores error message if city not found
  const [unit, setUnit] = useState("C");              //Temperature Units 
  const [history, setHistory] = useState([]); // Store last searched cities

  const api_key = import.meta.env.VITE_WEATHER_API_KEY;
  if (!api_key) {
    console.warn('VITE_WEATHER_API_KEY is not set in environment variables');
  }

  // Fetch weatherData for a city
  const fetchWeather = async (cityName) => {
    if (!api_key) {
      setError('API key not found. Please add VITE_WEATHER_API_KEY to .env');
      return;
    }
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`  //api always return the metric value
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      //Extracts only the fields we need from API calls
      const weatherData = {
        name: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        condition: data.weather[0].main,
      };

      setWeather(weatherData);

      //Add the recent searched city to the top(Only recent 5 searches)
      const newHistory = [data.name, ...history.filter(c => c !== data.name)];
      setHistory(newHistory.slice(0, 5)); //slice - to keep last 5 searches
      localStorage.setItem("searchHistory", JSON.stringify(newHistory.slice(0, 5)));
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);    //stops loading - whether success or failure

    }
  };


  //only the search history is stored 
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);


  //only triggers search if input is empty
  const handleSearch = () => {
    if (!city) return;
    fetchWeather(city);
  };

  //toggles between Units - Celsius and Fahrenheit
  const toggleUnit = () => {
    setUnit(prev => (prev === "C" ? "F" : "C"));
  };

  //return icon based on weather condition
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear": return "☀️";
      case "Clouds": return "☁️";
      case "Rain": return "🌧️";
      case "Snow": return "❄️";
      case "Thunderstorm": return "⛈️";
      default: return "🫧";
    }
  };


  //represents the feature of dynamic background
  //returns the image background based on type of weather conditions 
  const getBackgroundImage = (condition) => {
    switch (condition) {
      case "Clear":
        return "url('https://img.freepik.com/premium-photo/sunlight-rays-filtering-through-green-leaves-with-bokeh-background-creating-tranquil-vibrant-scene-generative-ai_58409-85472.jpg?semt=ais_hybrid&w=740&q=80')";
      case "Clouds":
        return "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj5db_C_dvLW4xBcQqTUOqX7Ea80CHP61gQg&s')";
      case "Rain":
        return "url('https://cdn.pixabay.com/photo/2022/05/28/13/02/plant-7227222_1280.jpg')";
      case "Snow":
        return "url('https://images.unsplash.com/photo-1518873890627-d4b177c06e51?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ludGVyJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D')";
      case "Thunderstorm":
        return "url('https://st.depositphotos.com/39412972/58780/i/450/depositphotos_587803166-stock-photo-thunderstorm-lightning-sunset-fir-forest.jpg')";
      default:
        return `url(${bgImage})`; // Default beach image
    }
  };

  return (
    //background changes dynamically with weather 
    <div
      className="fixed inset-0 flex items-center justify-center text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: getBackgroundImage(weather?.condition) }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-2xl mx-4 p-6 md:p-10 rounded-3xl 
backdrop-blur-sm bg-white/10 border border-white/20 shadow-2xl min-h-[350px]">


        <div className="flex flex-col justify-center items-center gap-6 ">

          <h1 className="text-2xl md:text-4xl font-serif font-semibold">Weather Check</h1>

          <SearchBar
            city={city}
            setCity={setCity}
            handleSearch={handleSearch}
          />

          <button
            onClick={toggleUnit}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 opacity-55"
          >
            Switch to °{unit === "C" ? "F" : "C"}
          </button>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-300">{error}</p>}


          {/* weather card only renders when data is available */}
          {weather && (
            <WeatherCard
              weather={weather}
              unit={unit}
              getWeatherIcon={getWeatherIcon}
            />
          )}

          {/* SEARCH HISTORY */}
          {history.length > 0 && (
            <div className="mt-4 w-full">
              <h2 className="text-base md:text-xl font-semibold mb-2">Last Searched Cities:</h2>
              <div className="flex flex-wrap gap-2">
                {history.map((c, index) => (
                  <button
                    key={index}
                    onClick={() => fetchWeather(c)}
                    className="bg-white/30 hover:bg-white/50 px-3 py-1 rounded-full"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;