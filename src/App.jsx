import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

function App() {
  // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [temp, setTemp] = useState();

  useEffect(() => {
    const success = (position) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const API_KEY = "fa49fb404e2b2b46b21955e82154e590";

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;

      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const fahrenheit = ((celsius * 90) / 5 + 32).toFixed(1);

          setTemp({ celsius, fahrenheit });
        })
        .catch((err) => console.error(err));
    }
  }, [coords]);

  return (
    <div>
      <WeatherCard weather={weather} temp={temp} />
    </div>
  );
}

export default App;
