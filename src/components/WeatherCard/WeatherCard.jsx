import { motion } from "framer-motion";
import { useWeather } from "../../context/WeatherContext";
import "./WeatherCard.css";

export default function WeatherCard() {

  const { weather } = useWeather();

  if (!weather) return null;

  return (

    <motion.div
      className="card weather-card"
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
    >

      <div className="weather-left">

        <h2>{weather.location.city}</h2>

        <p>{weather.location.state}</p>

        <h1>{weather.current.temperature}°</h1>

        <span>{weather.current.condition}</span>

      </div>

      <div className="weather-right">

        <img
          src={weather.current.icon}
          alt=""
        />

      </div>

    </motion.div>

  );

}