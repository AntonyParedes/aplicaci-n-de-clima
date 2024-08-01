import "./App.css";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import { useEffect, useState } from "react";
function App() {
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [city, setCity] = useState("");
  const [messageError, setMessageError] = useState(false);
  const [background, setBackground] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowMessage(true);
    }, 3000);
    const success = (position) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    };
    const error = () => {
      setHasError(true);
      setIsLoading(false);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    if (coords) {
      const API_KEY = "fa49fb404e2b2b46b21955e82154e590";

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;

      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const fahrenheit = ((celsius * 9) / 5 + 32).toFixed(1);
          setTemp({ celsius, fahrenheit });
          setMessageError(false);
          setBackground(res.data.weather[0].main);
        })
        .catch((err) => {
          console.error(err);
          setMessageError(true);
        })

        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [coords, city]);

  const objStyles = {
    background: `url(/images/${background}.webp)`,
  };

  return (
    <div style={objStyles} className="app flex-container full">
      {isLoading ? (
        <div>
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          {showMessage && <p>Por favor activa la localización</p>}
        </div>
      ) : hasError ? (
        <div className="ubi">
          <h1 texUbi>
            Para obtener el clima de tu ciudad debes aceptar los permisos
          </h1>
        </div>
      ) : (
        <WeatherCard
          weather={weather}
          temp={temp}
          setCity={setCity}
          messageError={messageError}
          city={city}
        />
      )}
    </div>
  );
}
export default App;
