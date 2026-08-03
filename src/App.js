import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Weather from "./Weather";

console.log(Weather);

function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather />

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
