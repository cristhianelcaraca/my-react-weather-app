import React from "react";

export default function WeatherTemperature(props) {
  function fahrenheit() {
    return (props.celsius * 9) / 5 + 32;
  }

  function handleClick(event) {
    event.preventDefault();
    props.toggleUnit();
  }

  if (props.unit === "celsius") {
    return (
      <div className="WeatherTemperature">
        <span className="temperature">{Math.round(props.celsius)}</span>
        <span className="unit">
          ℃ |{" "}
          <a
            href="/"
            onClick={handleClick}
            aria-label="Mostrar temperatura em Fahrenheit"
          >
            ℉
          </a>
        </span>
      </div>
    );
  }

  return (
    <div className="WeatherTemperature">
      <span className="temperature">{Math.round(fahrenheit())}</span>
      <span className="unit">
        <a href="/" onClick={handleClick}>
          ℃
        </a>{" "}
        | ℉
      </span>
    </div>
  );
}
