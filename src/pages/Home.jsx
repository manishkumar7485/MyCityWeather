import Swal from "sweetalert2";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import { useWeather } from "../context/WeatherContext";

import WeatherCard from "../components/WeatherCard/WeatherCard";
import AirQuality from "../components/AirQuality/AirQuality";
import HourlyForecast from "../components/HourlyForecast/HourlyForecast";
import DailyForecast from "../components/DailyForecast/DailyForecast";
import WeatherHighlights from "../components/WeatherHighlights/WeatherHighlights";
import SunriseSunset from "../components/SunriseSunset/SunriseSunset";
import WeatherChart from "../components/WeatherChart/WeatherChart";
import WeatherMap from "../components/WeatherMap/WeatherMap";

import "./Home.css";

export default function Home() {
const { city } = useParams();
  const { weather } = useWeather();

  // Prevent duplicate alerts
  const alertShown = useRef(false);

  useEffect(() => {
  if (!weather || alertShown.current) return;

  const hasAlerts =
    weather.alerts &&
    Array.isArray(weather.alerts) &&
    weather.alerts.length > 0;

  if (hasAlerts) {
    const alert = weather.alerts[0];

    Swal.fire({
      icon: "warning",
      title: alert.headline || "Weather Alert",
      html: `
        <div style="text-align:left">
          <p><strong>Event:</strong> ${alert.event || "-"}</p>
          <p><strong>Area:</strong> ${alert.areas || "-"}</p>
          <p><strong>Effective:</strong> ${alert.effective || "-"}</p>
          <p><strong>Expires:</strong> ${alert.expires || "-"}</p>
          <hr>
          <p>${alert.desc || "Stay safe and follow local authorities."}</p>
        </div>
      `,
      confirmButtonColor: "#0cf159",
      // timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  } else {
    // Your own custom alert
    Swal.fire({
      icon: "success",
      title: "🌤 Weather Update",
      html: `
        <div style="text-align:center">
          <h3>Feel Good Vibes 😎</h3>

          <p>No official weather alerts for <b>${weather.location.city}</b>.</p>

          <p>Enjoy your day and stay hydrated! ☀️</p>

          <hr>

          <b>Temperature:</b> ${weather.current.temperature}°C<br>
          <b>Condition:</b> ${weather.current.condition}
        </div>
      `,
      iconColor: "#22c55e",
      confirmButtonColor: "#2563eb",
      confirmButtonText: "Awesome!",
      width: 400,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }

  alertShown.current = true;
}, [weather]);



  const { fetchWeather } = useWeather();

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  return (
    <MainLayout>
      <div className="dashboard">

        {/* Row 1 */}
        <div className="dashboard-row">
          <div className="weather-card-wrapper">
            <WeatherCard />
          </div>

          <div className="air-quality-wrapper">
            <AirQuality />
          </div>
        </div>

        {/* Row 2 */}
        {/* <div className="dashboard-row"> */}
          <div className="hourly-wrapper">
            <HourlyForecast />
          </div>

          <div className="highlight-wrapper">
            <WeatherHighlights />
          </div>
        {/* </div> */}

        {/* Row 3 */}
        <div className="dashboard-row">
          <div className="daily-wrapper">
            <DailyForecast />
          </div>

          <div className="sunrise-wrapper">
            <SunriseSunset />
          </div>
        </div>

        {/* Row 4 */}
        {/* <div className="dashboard-row"> */}
          <div className="chart-wrapper">
            <WeatherChart />
          </div>

          <div className="map-wrapper">
            <WeatherMap />
          </div>
        {/* </div> */}

      </div>
    </MainLayout>
  );
}