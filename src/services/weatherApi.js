import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL;

/**
 * Get state, district and country using BigDataCloud
 */
const getLocationDetails = async (lat, lon) => {
  try {
    const { data } = await axios.get(
      "https://api.bigdatacloud.net/data/reverse-geocode-client",
      {
        params: {
          latitude: lat,
          longitude: lon,
          localityLanguage: "en",
        },
      }
    );

    return {
      city: data.city || data.locality || "",
      state: data.principalSubdivision || "",
      district:
        data.localityInfo?.administrative?.find(
          (item) => item.adminLevel === 4
        )?.name || "",
      country: data.countryName || "",
    };
  } catch (error) {
    console.error("Location Error:", error);

    return {
      city: "",
      state: "",
      district: "",
      country: "",
    };
  }
};

/**
 * Search Weather by City
 */
export const getWeatherData = async (city) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: 10,
        aqi: "yes",
        alerts: "yes",
      },
    });

    return formatWeatherData(data);
  } catch (error) {
    handleError(error);
  }
};

/**
 * Weather by Coordinates
 */
export const getWeatherDataByCoordinates = async (lat, lon) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: `${lat},${lon}`,
        days: 10,
        aqi: "yes",
        alerts: "yes",
      },
    });
    console.log(data);
    return formatWeatherData(data);
  } catch (error) {
    handleError(error);
  }
};

/**
 * Search Cities (Autocomplete)
 */
export const searchCities = async (query) => {
  if (!query) return [];

  try {
    const { data } = await axios.get(`${BASE_URL}/search.json`, {
      params: {
        key: API_KEY,
        q: query,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Format API Response
 */
const formatWeatherData = async (data) => {
  const location = await getLocationDetails(
    data.location.lat,
    data.location.lon
  );

  return {
    location: {
      city: location.city || data.location.name,
      state: location.state,
      district: location.district,
      country: location.country || data.location.country,
      latitude: data.location.lat,
      longitude: data.location.lon,
      timezone: data.location.tz_id,
      localTime: data.location.localtime,
    },

    current: {
      temperature: Math.round(data.current.temp_c),
      feelsLike: Math.round(data.current.feelslike_c),
      humidity: data.current.humidity,
      pressure: data.current.pressure_mb,
      visibility: data.current.vis_km,
      uv: data.current.uv,
      cloud: data.current.cloud,
      windSpeed: data.current.wind_kph,
      windDegree: data.current.wind_degree,
      windDirection: data.current.wind_dir,
      gust: data.current.gust_kph,
      condition: data.current.condition.text,
      icon: `https:${data.current.condition.icon}`,
      isDay: data.current.is_day,
      airQuality: data.current.air_quality,
      code: data.current.condition.code,
    },

    astronomy: {
      sunrise: data.forecast.forecastday[0].astro.sunrise,
      sunset: data.forecast.forecastday[0].astro.sunset,
      moonrise: data.forecast.forecastday[0].astro.moonrise,
      moonset: data.forecast.forecastday[0].astro.moonset,
      moonPhase: data.forecast.forecastday[0].astro.moon_phase,
      moonIllumination:
        data.forecast.forecastday[0].astro.moon_illumination,
    },

    hourly: data.forecast.forecastday[0].hour,

    forecast: data.forecast.forecastday,

    alerts: data.alerts?.alert || [] ,
  };
};

/**
 * Weather Icon
 */
export const getWeatherIcon = (icon) => icon;

/**
 * Error Handler
 */
const handleError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        throw new Error("City not found.");

      case 401:
        throw new Error("Invalid Weather API key.");

      case 403:
        throw new Error("API access denied.");

      default:
        throw new Error("Unable to fetch weather data.");
    }
  }

  throw new Error("Network error. Please check your internet connection.");
};