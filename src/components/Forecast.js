import React from "react";
import dayjs from "dayjs";

const Forecast = ({ dailyData }) => {
  return (
    <section className="forecast-container">
      <section className="forecast">
        {dailyData.slice(1, 6).map((day, index) => (
          <article key={index} className="day-card card">
            <section className="day-card-title-container">
              <h3 className="day">{dayjs.unix(day.dt).format("dddd")}</h3>
              <p className="date">{dayjs.unix(day.dt).format("MMM DD")}</p>
            </section>
            <section className="day-pic-container">
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`}
                alt={day.weather[0].description}
                className="weather-pic"
              />
            </section>
            <section className="day-card-info">
              <p className="weather-desc">
                <span>Cond:</span>
                <span>{day.weather[0].description}</span>
              </p>
              <p className="temp-max">
                <span>High:</span>
                <span>{day.temp.max} &#8451;</span>
              </p>
              <p className="temp-min">
                <span>Low:</span>
                <span>{day.temp.min} &#8451;</span>
              </p>
              <p className="wind-speed">
                <span>Wind:</span>
                <span>{day.wind_speed} m/s</span>
              </p>
              <p className="humidity">
                <span>Humidity:</span>
                <span>{day.humidity}%</span>
              </p>
            </section>
          </article>
        ))}
      </section>
    </section>
  );
};

export default Forecast;
