import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useWeather } from "../../context/WeatherContext";
import "./WeatherChart.css";

export default function WeatherChart() {
  const { weather } = useWeather();

  if (!weather) return null;

  const chartData = weather.hourly.slice(0, 12).map((hour) => ({
    time: hour.time.split(" ")[1].substring(0, 5),
    temperature: hour.temp_c,
    humidity: hour.humidity,
    wind: hour.wind_kph,
  }));

  return (
    <div className="card chart-card">

      <div className="chart-header">

        <h3>Temperature Trend</h3>

        <p>Next 12 Hours</p>

      </div>

      <ResponsiveContainer width="100%" height={320}>

        <AreaChart data={chartData}>

          <defs>

            <linearGradient
              id="tempGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#4F8EF7"
                stopOpacity={0.8}
              />

              <stop
                offset="95%"
                stopColor="#4F8EF7"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="temperature"
            stroke="#4F8EF7"
            fill="url(#tempGradient)"
            strokeWidth={3}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}