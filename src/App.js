// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import "./App.css";
import dayjs from "dayjs";
import Header from "./components/Header";
import SearchForm from "./components/searchForm.js";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import WeatherChart from "./components/WeatherChart.js";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const cities = localStorage.getItem("cities");
    if (cities) {
      const lastCity = JSON.parse(cities)[0];
      fetchWeather(lastCity.name, lastCity.lat, lastCity.lng);
    }
  }, []);

  const fetchWeather = async (name, lat, lon) => {
    const apiKey = "cf0f236d99f05f78766736970398dfe2";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData({ name, data });
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
          <CurrentWeather weatherData={weatherData} />
          <WeatherChart hourlyData={weatherData.data.hourly} />
          <Forecast dailyData={weatherData.data.daily} />
        </>
      )}
    </div>
  );
};

export default App;
