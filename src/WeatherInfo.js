import React from "react";
import FormattedDate from "./formattedDate";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <h1>{props.data.city}</h1>
      <ul>
        <li>
          <FormattedDate date={props.data.date} />
        </li>
        <li className="text-capitalize">{props.data.condition.description}</li>
      </ul>
      <div className="row">
        <div className="col-6">
          <div className="d-flex align-items-center">
            <img
              src={props.data.condition.icon_url}
              alt={props.data.condition.description}
            />
            <div className="ms-2">
              <span className="temperature">
                {Math.round(props.data.temperature.current)}
              </span>
              <span className="unit">℃</span>
            </div>
          </div>
        </div>
        <div className="col-6">
          <ul>
            <li>Humidity: {props.data.temperature?.humidity}%</li>
            <li>Wind: {props.data.wind?.speed} km/h</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
