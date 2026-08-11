import React from "react";
import FormattedDate from "./formattedDate";
import WeatherIcon from "./WeatherIcon";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo pt-2">
      <h1>{props.data.city}</h1>
      <ul>
        <li>
          <FormattedDate date={props.data.date} />
        </li>
        <li className="text-capitalize">{props.data.condition}</li>
      </ul>
      <div className="row">
        <div className="col-6">
          <div className="d-flex align-items-center">
            <div className="float-left mt-3">
              <WeatherIcon code={props.data.icon} size={52} />
            </div>

            <div className="float-left mt-3">
              <WeatherTemperature
                celsius={props.data.temperature.current}
                unit={props.unit}
                toggleUnit={props.toggleUnit}
              />
            </div>
          </div>
        </div>
        <div className="col-6 mt-4">
          <ul>
            <li>Humidity: {props.data.temperature?.humidity}%</li>
            <li>Wind: {props.data.wind?.speed} km/h</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
