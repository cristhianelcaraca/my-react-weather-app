import "./Weather.css";
import React, { useState } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    console.log(response.data);
    console.log(response.data.condition.icon);

    setWeatherData({
      ready: true,
      coordinates: response.data.coordinates,
      temperature: response.data.temperature,
      wind: response.data.wind,
      city: response.data.city,
      date: new Date(response.data.time * 1000),
      icon: response.data.condition.icon,
      condition: response.data.condition.description,
    });
  }

  function search() {
    const apiKey = "fad20348e4cdad62eo6a43actbfe6170";

    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city..."
                className="form-control"
                autoFocus="on"
                value={city}
                onChange={handleCityChange}
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
        <WeatherInfo data={weatherData} />
        <WeatherForecast data={weatherData.coordinates} />
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
