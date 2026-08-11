import "./Weather.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  const [unit, setUnit] = useState("celsius");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function toggleUnit() {
    if (unit === "celsius") {
      setUnit("fahrenheit");
    } else {
      setUnit("celsius");
    }
  }

  function handleResponse(response) {
    // Verifica se a API encontrou os dados necessários
    if (!response.data.condition) {
      setLoading(false);
      setError(true);
      setWeatherData({ ready: false });
      return;
    }

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

    setLoading(false);
    setError(false);
  }

  function handleError() {
    setLoading(false);
    setError(true);
    setWeatherData({ ready: false });
  }

  function search() {
    setLoading(true);
    setError(false);

    const apiKey = "fad20348e4cdad62eo6a43actbfe6170";

    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse).catch(handleError);
  }

  useEffect(() => {
    search();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (city.trim() !== "") {
      search();
    }
  }

  function handleCityChange(event) {
    setCity(event.target.value);
    setError(false);
  }

  return (
    <div className="Weather">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-12 col-md-9">
            <input
              type="search"
              placeholder="Enter a city..."
              className="form-control"
              autoFocus
              value={city}
              onChange={handleCityChange}
            />
          </div>

          <div className="col-12 col-md-3">
            <input
              type="submit"
              value="Search"
              className="btn btn-primary w-100"
            />
          </div>
        </div>
      </form>

      {error ? (
        <div className="text-center weather-error">
          <p>City not found.</p>
          <small>Please try another city.</small>
        </div>
      ) : loading || !weatherData.ready ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <WeatherInfo data={weatherData} unit={unit} toggleUnit={toggleUnit} />

          <WeatherForecast data={weatherData.coordinates} unit={unit} />
        </>
      )}
    </div>
  );
}
