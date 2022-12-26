import { useState } from "react";
import "./styles.css";

export default function App() {
  const [search, SetSearch] = useState("");
  const [title, setTitle] = useState("");
  const [weatherData, setWeatherData] = useState({});

  const handleEnter = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=546b8e7bc2e42c8c92a2572386d39b0a&units=metric`
    )
      .then((data) => data.json())
      .then((data) => {
        setTitle(search);
        setWeatherData(data);
      });
  };

  return (
    <div className="App">
      <h1>Weather in</h1>

      <input
        className="inputBox"
        type="text"
        value={search}
        onChange={(e) => SetSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleEnter();
          }
        }}
      />

      {weatherData?.weather ? (
        <div className="mainBox">
          <div className="f-28">{title}</div>
          <div className="row">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <div className="row-center">
            <div className="mainTemp">{weatherData?.main?.temp}&deg;C</div>
            <div className="w-40">
              <div className="f-14 bold">
                weather {weatherData?.weather[0]?.description}
              </div>
            </div>
          </div>
          <div className="minmax">
            <div>Min: {weatherData?.main?.temp_min}&deg;C</div>
            <div>Max: {weatherData?.main?.temp_max}&deg;C</div>
          </div>
          <img
            alt="icon"
            className="icon"
            src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
          />
          <div className="row-center">
            <div className="w-50">
              <div className="f-30">{weatherData?.main?.feels_like}&deg;C</div>
              <div>Feels Like</div>
            </div>
            <div className="w-50">
              <div className="f-30">{weatherData?.main?.humidity}%</div>
              <div>Humidity</div>
            </div>
          </div>
        </div>
      ) : weatherData?.message ? (
        <div className="errorMsg">{weatherData.message}, Please Try Again!</div>
      ) : null}
    </div>
  );
}
