import React, { useState, useEffect } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  let [forecast, setForecast] = useState(null);

  function handleResponse(response) {
    console.log(response.data);
    setForecast(response.data.daily);
  }

  useEffect(() => {
    let apiKey = "fad20348e4cdad62eo6a43actbfe6170";
    let longitude = props.data.longitude;
    let latitude = props.data.latitude;
    let ApiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;

    axios.get(ApiUrl).then(handleResponse);
  }, [props.data]);

  if (forecast) {
    return (
      <div className="WeatherForecast mt-2">
        <div className="row g-3">
          {forecast.map(function (day, index) {
            if (index < 6) {
              return (
                <div className="col-6 col-md" key={index}>
                  <WeatherForecastDay data={day} unit={props.unit} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
