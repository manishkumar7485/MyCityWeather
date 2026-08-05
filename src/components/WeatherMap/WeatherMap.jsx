import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useWeather } from "../../context/WeatherContext";
import "./WeatherMap.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function WeatherMap() {
  const { weather } = useWeather();

  if (!weather) return null;

  const position = [
    weather.location.latitude,
    weather.location.longitude,
  ];

  return (
    <div className="card weather-map">

      <div className="map-header">

        <h3>Weather Map</h3>

        <span>{weather.location.city}</span>

      </div>

      <MapContainer
        center={position}
        zoom={10}
        scrollWheelZoom={true}
        className="leaflet-map"
      >

        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>

          <Popup>

            <strong>{weather.location.city}</strong>

            <br />

            {weather.current.temperature}°C

            <br />

            {weather.current.condition}

          </Popup>

        </Marker>

      </MapContainer>

    </div>
  );
}