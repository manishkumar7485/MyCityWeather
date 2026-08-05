import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <h1>404</h1>

        <p>Page Not Found</p>

        <Link to="/MyCityWeather">Go Home</Link>
      </div>
    </div>
  );
}