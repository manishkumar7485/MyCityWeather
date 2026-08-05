import { FaBars, FaMapMarkerAlt } from "react-icons/fa";
import { useWeather } from "../../context/WeatherContext";
import SearchBar from "../SearchBar/SearchBar";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Navbar.css";

export default function Navbar({ setDrawerOpen }) {
  const { weather } = useWeather();

  return (
    <header className="navbar">
      <div className="nav-left">
        <button
          className="menu-btn"
          onClick={() => setDrawerOpen(true)}
        >
          <FaBars />
        </button>

        <h2 className="logo">MyCityWeather</h2>

        {weather?.location && (
          <div className="current-city">
            <FaMapMarkerAlt />
            <span>{weather.location.city}</span>
          </div>
        )}
      </div>

      <div className="nav-search">
        <SearchBar />
      </div>

      <div className="nav-right">
        <ThemeToggle />
      </div>
    </header>
  );
}