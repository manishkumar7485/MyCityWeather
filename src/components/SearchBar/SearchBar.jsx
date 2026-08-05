import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { FaSearch, FaSearchLocation } from "react-icons/fa";
import { useWeather } from "../../context/WeatherContext";
import "./SearchBar.css";

export default function SearchBar() {
  const [city, setCity] = useState("");

  // const navigate = useNavigate();

  const { fetchWeather, fetchCurrentLocation, loading } = useWeather();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cityName = city.trim();

    if (!cityName || loading) return;

    await fetchWeather(cityName);

    setCity("");
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <FaSearch />

      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button type="submit" className="search" >
        Search
      </button>

      <button type="button" className="loc" onClick={fetchCurrentLocation}>
        <FaSearchLocation />
      </button>
    </form>
  );
}