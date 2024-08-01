import { useState } from "react";
import "./styles/WeatherCard.css";
import { useRef } from "react";

const WeatherCard = ({ weather, temp, setCity, messageError, city }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const changeDegrees = () => {
    setIsCelsius(!isCelsius);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(inputSearch.current.value);
  };

  const inputSearch = useRef();

  return (
    <section className="card flex-container">
      <h1 className="card__title">App del Clima</h1>
      <h2 className="card__country">
        {weather?.name}, {weather?.sys.country}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          className="buscar"
          type="search"
          placeholder="Search by City"
          ref={inputSearch}
        />

        <button className="fas fa-search icon"></button>
      </form>
      {messageError && <p>{city} doesn't exist ❌</p>}
      <article className="card__body grid-container">
        <div className="card__image-container">
          <img
            className="card__image"
            src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
            alt={weather?.weather[0].main}
          />
        </div>
        <article className="info grid-container">
          <h3 className="info__title">{weather?.weather[0].description}</h3>
          <ul className="info__list grid-container">
            <li className="info__item grid-container">
              <span className="info__label">Viento 🌬️</span>
              <span className="info__value">{weather?.wind.speed}m/s</span>
            </li>
            <li className="info__item grid-container">
              <span className="info__label">Nubes ☁️</span>
              <span className="info__value">{weather?.clouds.all}%</span>
            </li>
            <li className="info__item grid-container">
              <span className="info__label">Presión:</span>
              <span className="info__value">{weather?.main.pressure}hPa</span>
            </li>
          </ul>
        </article>
      </article>
      <h2 className="card__temp">
        {isCelsius ? `${temp?.celsius}°C` : `${temp?.fahrenheit}°F`}
      </h2>
      <button className="card__btn" onClick={changeDegrees}>
        Convertir a {isCelsius ? "°F" : "°C"}
      </button>
    </section>
  );
};

export default WeatherCard;
