import { createContext, useContext, useEffect, useState } from "react";
import {
  getWeatherData,
  getWeatherDataByCoordinates,
} from "../services/weatherApi";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ============================
  // Search Weather by City
  // ============================
  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError("");

      const data = await getWeatherData(city);

      setWeather(data);
    } catch (err) {
      setError(err.message || "Unable to fetch weather.");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Current Location Weather
  // ============================
  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          setLoading(true);
          setError("");

          const data = await getWeatherDataByCoordinates(
            position.coords.latitude,
            position.coords.longitude
          );

          setWeather(data);
        } catch (err) {
          setError(err.message || "Unable to fetch current location weather.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission denied.");
      }
    );
  };

  // ============================
  // Load Current Location
  // ============================
  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        loading,
        error,
        fetchWeather,
        fetchCurrentLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWeather = () => useContext(WeatherContext);