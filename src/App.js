import React, { useState, useEffect } from "react";
import "./App.css";
import dayjs from "dayjs";
import Header from "./components/Header";
import SearchForm from "./components/searchForm";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import WeatherChart from "./components/WeatherChart";
import DateRangePicker from "./components/DateRangerPicker";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

  const filterDataByDateRange = (data) => {
    if (!data || !Array.isArray(data.daily)) {
      return [];
    }

    if (!dateRange.startDate || !dateRange.endDate) {
      return data.daily;
    }

    const start = dayjs(dateRange.startDate);
    const end = dayjs(dateRange.endDate);

    return data.daily.filter((day) => {
      const date = dayjs.unix(day.dt);
      return date.isAfter(start) && date.isBefore(end);
    });
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
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setDateRange={setDateRange}
          />
          <Forecast dailyData={filterDataByDateRange(weatherData.data)} />
        </>
      )}
    </div>
  );
};

export default App;
