import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Weather from "./Weather";

function App() {
  console.log("App renderizou");
  return (
    <div className="App">
      <div className="container">
        <Weather defaultCity="New York" />

        <footer>
          This project was coded by{" "}
          <a
            href="https://www.linkedin.com/in/cris-cara%C3%A7a-b975163a8/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cristhian Caraça{" "}
          </a>
          and is open-sourced on{" "}
          <a
            href="https://github.com/cristhianelcaraca/my-react-weather-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
