import "./Weather.css";
import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [weatherData, setWeatherData] = useState({ ready: false });

  function handleResponse(response) {
    console.log(response.data);

    setWeatherData({
      ready: true,
      temperature: response.data.temperature,
      wind: response.data.wind,
      city: response.data.city,
      date: "Wednesday 10:00",
      condition: response.data.condition,
      feels_like: response.data.temperature.feels_like,
    });
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city..."
                className="form-control"
                autoFocus="on"
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <h1>{weatherData.city}</h1>
        <ul>
          <li>{weatherData.date}</li>
          <li className="text-capitalize">
            {weatherData.condition.description}
          </li>
        </ul>
        <div className="row">
          <div className="col-6">
            <div className="d-flex align-items-center">
              <img
                src={weatherData.condition.icon_url}
                alt={weatherData.condition.description}
              />
              <div className="ms-2">
                <span className="temperature">
                  {Math.round(weatherData.temperature.current)}
                </span>
                <span className="unit">℃</span>
              </div>
            </div>
          </div>
          <div className="col-6">
            <ul>
              <li>
                Feels like: {Math.round(weatherData.temperature?.feels_like)}°C
              </li>
              <li>Humidity: {weatherData.temperature?.humidity}%</li>
              <li>Wind: {weatherData.wind?.speed} km/h</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    const apiKey = "fad20348e4cdad62eo6a43actbfe6170";
    let city = "New York";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
    return "Loading...";
  }
}
