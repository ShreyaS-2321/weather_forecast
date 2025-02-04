import './App.css';
import React, { useState, useEffect, useCallback } from "react";

function App() {
  const [city, setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentDate = new Date();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  // Using the environment variable for the API key
  const API_KEY ="bcda10ba323e88e96cb486015a104d1d";

  const fetchWeatherData = useCallback(async () => {
    setLoading(true);  // Set loading to true when we start fetching data
    setError(null);    // Reset any previous errors
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
      } else {
        throw new Error(data.message || "Error fetching weather data");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data. Please try again later.");
    } finally {
      setLoading(false);  // Set loading to false once the request is done
    }
  }, [city, API_KEY]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const getWeatherImg = (main) => {
    switch (main) {
      case "Clear":
        return "/images/clear.png";
      case "Rain":
        return "/images/rainy.png";
      case "Snow":
        return "/images/snowy.png";
      case "Haze":
        return "/images/sun.png";
      case "Clouds":
        return "/images/clouds.png";
      case "Mist":
        return "/images/mist.png";
      default:
        return "/images/default.png"; // Provide a default image if none match
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="container_date">{formattedDate}</h1>

        {/* Show loading state while fetching the data */}
        {loading && <p>Loading...</p>}

        {/* Show error if there is one */}
        {error && <p className="error">{error}</p>}

        {/* Show weather data once it has been successfully fetched */}
        {weatherData && !loading && !error && (
          <div className="weather_data">
            <h2 className="container_city">{weatherData.name}</h2>
            <img
              className="container_img"
              src={getWeatherImg(weatherData.weather[0].main)}
              width="180px"
              alt="Weather Icon"
            />
            <h2 className="container_degree">{weatherData.main.temp}°C</h2>
            <h2 className="country_per">
              {weatherData.weather[0].main}
              <span className="degree_icon"></span>
            </h2>
          </div>
        )}

        {/* Form to enter the city */}
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Get</button>
        </form>
      </div>
    </div>
  );
}

export default App;
