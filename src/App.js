import React, { useState, useEffect } from "react";
import "./App.css";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import Header from "./components/Header";
import SearchForm from "./components/searchForm";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import WeatherChart from "./components/WeatherChart";
import DateRangePicker from "./components/DateRangerPicker";
import TemperatureChart from "./components/TemperatureChart";
import FilterForm from "./components/FilterForm";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    minTemp: null,
    maxTemp: null,
  });
  const [filteredTemperatureData, setFilteredTemperatureData] = useState([]);
  const [error, setError] = useState(null);

  const fetchWeatherByCoordinates = async (latitude, longitude) => {
    const apiKey = "cf0f236d99f05f78766736970398dfe2";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error fetching weather data. Please try again.");
      }
      const data = await response.json();
      saveToLocalStorage(data.name, latitude, longitude);
      return { name: data.name, data };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw new Error("Error fetching weather data. Please try again.");
    }
  };

  useEffect(() => {
    const fetchWeatherByLocation = async () => {
      try {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetchWeatherByCoordinates(
              latitude,
              longitude
            );
            setWeatherData(response);
          });
        } else {
          throw new Error("Geolocation not supported.");
        }
      } catch (error) {
        console.error("Error fetching weather by location:", error);
        setError("Error fetching weather data. Please try again.");
      }
    };

    fetchWeatherByLocation();
  }, []);

  // useEffect(() => {
  //   const cities = localStorage.getItem("cities");
  //   if (cities) {
  //     const lastCity = JSON.parse(cities)[0];
  //     fetchWeather(lastCity.name, lastCity.lat, lastCity.lon);
  //   }
  // }, []);

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
        setError(null);
      } else {
        setError(
          "An error occurred while verifying the city. Please try again."
        );
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };

  const saveToLocalStorage = (name, lat, lon) => {
    if (name && lat && lon) {
      const cities = JSON.parse(localStorage.getItem("cities")) || [];
      const updatedCities = [
        { name, lat, lon },
        ...cities.filter((city) => city.name !== name),
      ];
      localStorage.setItem("cities", JSON.stringify(updatedCities));
    } else {
      console.error("Invalid data provided to saveToLocalStorage");
    }
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

  const formatTemperatureData = (data) => {
    if (!data || !Array.isArray(data.daily)) {
      return [];
    }

    return data.daily.map((day) => ({
      date: dayjs.unix(day.dt).format("YYYY-MM-DD"),
      maxTemp: day.temp.max,
      minTemp: day.temp.min,
    }));
  };

  const filterTemperatureData = (data, filters) => {
    const { startDate, endDate, minTemp, maxTemp } = filters;
    // console.log("Original Data:", data);
    // console.log("Filters:", filters);

    let filteredData = data;

    if (startDate) {
      const start = dayjs(startDate);
      filteredData = filteredData.filter((day) => {
        const date = dayjs(day.date);
        return date.isSameOrAfter(start);
      });
    }

    if (endDate) {
      const end = dayjs(endDate);
      filteredData = filteredData.filter((day) => {
        const date = dayjs(day.date);
        return date.isSameOrBefore(end);
      });
    }

    if (minTemp !== null && minTemp !== "" && !isNaN(minTemp)) {
      filteredData = filteredData.filter(
        (day) => day.maxTemp >= parseFloat(minTemp)
      );
    }

    if (maxTemp !== null && maxTemp !== "" && !isNaN(maxTemp)) {
      filteredData = filteredData.filter(
        (day) => day.minTemp <= parseFloat(maxTemp)
      );
    }

    // console.log("Filtered Data:", filteredData);
    return filteredData;
  };

  const applyFilters = () => {
    if (weatherData) {
      const formattedData = formatTemperatureData(weatherData.data);
      // console.log("Formatted Data:", formattedData);
      const filteredData = filterTemperatureData(formattedData, filters);
      // console.log("Filtered Data After Applying Filters:", filteredData);
      setFilteredTemperatureData(filteredData);
    }
  };

  return (
    <div className="App">
      <Header />
      <SearchForm
        city={city}
        setCity={setCity}
        handleCitySearch={handleCitySearch}
        error={error}
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
          <section className="cards-container">
            <h2>5 Day Forecast</h2>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setDateRange={setDateRange}
            />
            <Forecast dailyData={filterDataByDateRange(weatherData.data)} />
          </section>
          <section className="chart-lines">
            <h2>Daily Temperatures</h2>
            <FilterForm
              filters={filters}
              setFilters={setFilters}
              applyFilters={applyFilters}
            />
            <TemperatureChart data={filteredTemperatureData} />
          </section>
        </>
      )}
    </div>
  );
};

export default App;
