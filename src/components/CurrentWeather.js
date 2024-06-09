import React from "react";
import dayjs from "dayjs";

const CurrentWeather = ({ weatherData }) => {
  const {
    name,
    data: { current },
  } = weatherData;

  return (
    <article className="today-card card">
      <section className="current-header">
        <div className="title-date-container">
          <h2 id="city-name">{name}</h2>
          <p id="date-today">{dayjs.unix(current.dt).format("MMMM DD")}</p>
        </div>
        <img
          src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
          alt={current.weather[0].description}
          className="weather-pic"
        />
      </section>

      <section className="today-info">
        <p id="condition">
          <span>Condition</span>
          <span>{current.weather[0].description}</span>
        </p>
        <p id="temp">
          <span>Temp</span>
          <span>{current.temp} &#8451;</span>
        </p>
        <p id="wind">
          <span>Wind</span>
          <span>{current.wind_speed} m/s</span>
        </p>
        <p id="humidity">
          <span>Humidity</span>
          <span>{current.humidity} %</span>
        </p>
        <p id="uv">
          <span>UV</span>
          <span id="uvi">{current.uvi}</span>
        </p>
      </section>
    </article>
  );
};

export default CurrentWeather;
