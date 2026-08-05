import {
  FaSmog,
  FaWind,
  FaLeaf,
  FaCloud,
} from "react-icons/fa";
import { useWeather } from "../../context/WeatherContext";
import "./AirQuality.css";

export default function AirQuality() {
  const { weather } = useWeather();

  if (!weather) return null;

  const air = weather.current?.airQuality;

  if (!air) {
    return (
      <div className="card">
        <h3>Air Quality</h3>
        <p>Air quality unavailable.</p>
      </div>
    );
  }

  const items = [
    {
      label: "PM2.5",
      value: air.pm2_5?.toFixed(1),
      icon: <FaSmog />,
    },
    {
      label: "PM10",
      value: air.pm10?.toFixed(1),
      icon: <FaCloud />,
    },
    {
      label: "CO",
      value: air.co?.toFixed(1),
      icon: <FaWind />,
    },
    {
      label: "O₃",
      value: air.o3?.toFixed(1),
      icon: <FaLeaf />,
    },
  ];

  return (
    <div className="card">
      <h3>Air Quality</h3>

      <div className="aq-grid">
        {items.map((item) => (
          <div className="aq-item" key={item.label}>
            {item.icon}
            <h4>{item.value}</h4>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}