import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay(props) {
  function celsiusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  }

  function maxTemperature() {
    let temperature =
      props.unit === "celsius"
        ? props.data.temperature.maximum
        : celsiusToFahrenheit(props.data.temperature.maximum);
    return `${Math.round(temperature)}°`;
  }

  function minTemperature() {
    let temperature =
      props.unit === "celsius"
        ? props.data.temperature.minimum
        : celsiusToFahrenheit(props.data.temperature.minimum);
    return `${Math.round(temperature)}°`;
  }

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }

  return (
    <div>
      <div className="WeatherForecast-day">{formatDay(props.data.time)}</div>
      <WeatherIcon code={props.data.condition.icon} size={36} />
      <div className="WeatherForecast-temperatures">
        <span className="WeatherForecast-temperature-max">
          {maxTemperature()}
        </span>
        <span>
          <span className="WeatherForecast-temperature-min">
            {minTemperature()}
          </span>
        </span>
      </div>
    </div>
  );
}
