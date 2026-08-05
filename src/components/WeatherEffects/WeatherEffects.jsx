import { useMemo } from "react";
import { useWeather } from "../../context/WeatherContext";
import "./WeatherEffects.css";

export default function WeatherEffects() {
  const { weather } = useWeather();

  // Generate rain particles once
  const rainDrops = useMemo(
    () =>
      Array.from({ length: 180 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 0.6 + Math.random(),
      })),
    []
  );

  // Generate snow particles once
  const snowFlakes = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 3 + Math.random() * 6,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 5,
      })),
    []
  );

  // Generate stars once
  const stars = useMemo(
    () =>
      Array.from({ length: 150 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 4,
      })),
    []
  );

  // Hooks are finished. Now it's safe to return.
  if (!weather || !weather.current) return null;

  const code = weather.current.code;
  const isDay = weather.current.isDay;

  const rainCodes = [
    1063, 1150, 1153, 1168, 1171,
    1180, 1183, 1186, 1189, 1192,
    1195, 1198, 1201, 1240, 1243, 1246,
  ];

  const snowCodes = [
    1066, 1114, 1117,
    1210, 1213, 1216, 1219,
    1222, 1225, 1237, 1255, 1258,
  ];

  const stormCodes = [
    1087, 1273, 1276, 1279, 1282,
  ];

  const cloudyCodes = [
    1003, 1006, 1009,
  ];

  const fogCodes = [
    1030, 1135, 1147,
  ];

  return (
    <>
      {/* ☀ Sun Rays */}
      {code === 1000 && isDay && (
        <div className="sun-rays" />
      )}

      {/* ⭐ Stars */}
      {code === 1000 && !isDay && (
        <div className="stars">
          {stars.map((star) => (
            <span
              key={star.id}
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* ☁ Clouds */}
      {cloudyCodes.includes(code) && (
        <div className="clouds">
          <div className="cloud c1"></div>
          <div className="cloud c2"></div>
          <div className="cloud c3"></div>
        </div>
      )}

      {/* 🌫 Fog */}
      {fogCodes.includes(code) && (
        <div className="fog">
          <div className="fog-layer"></div>
          <div className="fog-layer second"></div>
        </div>
      )}

      {/* 🌧 Rain */}
      {(rainCodes.includes(code) || stormCodes.includes(code)) && (
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
      )}

      {/* ❄ Snow */}
      {snowCodes.includes(code) && (
        <div className="snow">
          {snowFlakes.map((flake) => (
            <span
              key={flake.id}
              style={{
                left: `${flake.left}%`,
                width: `${flake.size}px`,
                height: `${flake.size}px`,
                animationDelay: `${flake.delay}s`,
                animationDuration: `${flake.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* ⛈ Lightning */}
      {stormCodes.includes(code) && (
        <div className="lightning" />
      )}
    </>
  );
}