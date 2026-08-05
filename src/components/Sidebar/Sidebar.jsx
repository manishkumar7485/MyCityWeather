import {
  FaCloudSun,
  FaHome,
  FaMap,
  FaChartLine,
  FaCog,
  FaTimes,
} from "react-icons/fa";

import "./Sidebar.css";

export default function Sidebar({
  drawerOpen,
  setDrawerOpen,
}) {
  return (
    <>
      <aside
        className={`sidebar ${drawerOpen ? "open" : ""}`}
      >
        <button
          className="close-btn"
          onClick={() => setDrawerOpen(false)}
        >
          <FaTimes />
        </button>

        <ul>

          <li className="active">
            <FaHome />
            Dashboard
          </li>

          <li>
            <FaCloudSun />
            Forecast
          </li>

          <li>
            <FaChartLine />
            Charts
          </li>

          <li>
            <FaMap />
            Weather Map
          </li>

          <li>
            <FaCog />
            Settings
          </li>

        </ul>

      </aside>

      {drawerOpen && (
        <div
          className="overlay"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </>
  );
}