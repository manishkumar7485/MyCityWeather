import { useEffect } from "react";
import { useWeather } from "../../context/WeatherContext";

export default function WeatherBackground() {
  const { weather } = useWeather();

  useEffect(() => {
    if (!weather) return;

    // Keep a gradient background
    document.body.style.backgroundImage = `
      linear-gradient(
        135deg,
        rgba(79,142,247,0.95),
        rgba(35,60,120,0.95)
      )
    `;
  }, [weather]);

  if (!weather) return null;

  return (
    <div className="weather-background-icon">
      <img
        src={weather.current.icon}
        alt={weather.current.condition}
      />
    </div>
  );
}