import React, { useState, useEffect } from "react";
import "./App.css";
import dayjs from "dayjs";
import Header from "./components/Header";
import SearchForm from "./components/searchForm";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import WeatherChart from "./components/WeatherChart";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const cities = localStorage.getItem("cities");
    if (cities) {
      const lastCity = JSON.parse(cities)[0];
      fetchWeather(lastCity.name, lastCity.lat, lastCity.lon);
    }
  }, []);

  const fetchWeather = async (name, lat, lon) => {
    const apiKey = "cf0f236d99f05f78766736970398dfe2";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData({ name, data });
      saveToLocalStorage(name, lat, lon);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleCitySearch = async (cityName, country = null) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cf0f236d99f05f78766736970398dfe2`;
    if (country) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${country}&appid=cf0f236d99f05f78766736970398dfe2`;
    }

    try {
      const response = await fetch(url);
      if (response.ok) {
        const info = await response.json();
        const {
          name,
          coord: { lat, lon },
        } = info;
        fetchWeather(name, lat, lon);
        setCity("");
      } else {
        console.error("City not found");
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };

  const saveToLocalStorage = (name, lat, lon) => {
    const cities = JSON.parse(localStorage.getItem("cities")) || [];
    const updatedCities = [
      { name, lat, lon },
      ...cities.filter((city) => city.name !== name),
    ];
    localStorage.setItem("cities", JSON.stringify(updatedCities));
  };

  // Manejador de eventos de teclado para la accesibilidad
  const handleKeyPress = (event, callback) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      callback();
    }
  };

  return (
    <div className="App">
      <Header />
      <SearchForm
        city={city}
        setCity={setCity}
        handleCitySearch={handleCitySearch}
      />
      {weatherData && (
        <>
          <section className="current-weather-container">
            <h2>Today</h2>
            <section className="current-weather">
              <CurrentWeather weatherData={weatherData} />
              <WeatherChart hourlyData={weatherData.data.hourly} />
            </section>
          </section>
          <Forecast dailyData={weatherData.data.daily} />
        </>
      )}
    </div>
  );
};

export default App;
