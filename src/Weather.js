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

  // remove acentos e deixa tudo minúsculo, para comparar textos de forma mais justa
  function normalizeText(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  // verifica se a cidade digitada tem relação com a cidade que a API retornou
  function citiesMatch(typedCity, returnedCity) {
    const typed = normalizeText(typedCity);
    const returned = normalizeText(returnedCity);
    return returned.includes(typed) || typed.includes(returned);
  }

  function handleResponse(response) {
    const data = response.data;
    console.log("Cidade digitada:", city);
    console.log("Resposta da API:", data);

    const isValid =
      data &&
      data.city &&
      data.temperature &&
      data.condition &&
      citiesMatch(city, data.city);

    if (!isValid) {
      setLoading(false);
      setError(true);
      setWeatherData({ ready: false });
      return;
    }

    setWeatherData({
      ready: true,
      coordinates: data.coordinates,
      temperature: data.temperature,
      wind: data.wind,
      city: data.city,
      date: new Date(data.time * 1000),
      icon: data.condition.icon,
      condition: data.condition.description,
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
    setLoading(true);

    const apiKey = "fad20348e4cdad62eo6a43actbfe6170";

    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${props.defaultCity}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse).catch(handleError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.defaultCity]);

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
