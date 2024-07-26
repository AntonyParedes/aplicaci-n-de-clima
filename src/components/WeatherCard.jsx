import { useState } from "react";

const WeatherCard = ({ weather, temp }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const changeDegrees = () => {
    setIsCelsius(!isCelsius);
  };
  return (
    <section>
      <h1>Wheather App</h1>
      <h2>
        {weather?.name}, {weather?.sys.country}
      </h2>
      <article>
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
            alt={weather?.weather[0].main}
          />
        </div>
        <article>
          <h3>{weather?.weather[0].description}</h3>
          <ul>
            <li>
              <span>Wind Speed</span>
              <span>{weather?.wind.speep} m/s</span>
            </li>
            <li>
              <span>Clouds </span>
              <span>{weather?.clouds.all}%</span>
            </li>
            <li>
              <span>Pressure </span>
              <span>{weather?.main.pressure} hPa</span>
            </li>
          </ul>
        </article>
        <h2>{isCelsius ? `${temp?.celsius}°C` : `${temp?.fahrenheit}°F`}</h2>
        <button onClick={changeDegrees}>
          Change to {isCelsius ? "°F" : "°C"}
        </button>
      </article>
    </section>
  );
};

export default WeatherCard;
