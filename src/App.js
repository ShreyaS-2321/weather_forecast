import './App.css';
import React, { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);

  const currentDate = new Date();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  const API_KEY = "bcda10ba323e88e96cb486015a104d1d"; // Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]); // Add 'city' to the dependency array to refetch when it changes

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
        return "/images/mist.png"
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="container">
        {weatherData && (
          <>
            <h1 className="container_date">{formattedDate}</h1>
            <div className="weather_data">
              <h2 className="container_city">{weatherData.name}</h2>
              <img className="container_img" src={getWeatherImg(weatherData.weather[0].main)} width="180px" alt="Weather Icon" />
              <h2 className="container_degree">{weatherData.main.temp}</h2>
              <h2 className="country_per">{weatherData.weather[0].main}<span className="degree_icon"></span></h2>
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
          </>
        )}
      </div>
    </div>
  );
}

export default App;
