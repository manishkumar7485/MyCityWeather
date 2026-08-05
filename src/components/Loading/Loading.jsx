import { useMemo } from "react";
import { FaCloudSun } from "react-icons/fa";
import "./Loading.css";

export default function Loading() {
  // Generate rain drops only once
  const rainDrops = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random(),
        duration: 0.7 + Math.random(),
      })),
    []
  );

  return (
    <div className="loading-screen">
      <div className="loading-background">
        <div className="sun"></div>

        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>

        <div className="rain">
          {rainDrops.map((drop) => (
            <span
              key={drop.id}
              style={{
                left: `${drop.left}%`,
                animationDelay: `${drop.delay}s`,
                animationDuration: `${drop.duration}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="loading-card">
        <FaCloudSun className="weather-logo" />

        <h1>Weather Dashboard</h1>

        <p>Getting the latest weather information...</p>

        <div className="loader">
          <div className="loader-progress"></div>
        </div>

        <span>Please wait</span>
      </div>
    </div>
  );
}