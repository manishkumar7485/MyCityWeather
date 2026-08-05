import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { WeatherProvider } from "./context/WeatherContext";
import { ThemeProvider } from "./context/ThemeContext";
import { HashRouter } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <BrowserRouter>
  <React.StrictMode>
    <ThemeProvider>
      <HashRouter>
        <WeatherProvider>
          <App />
        </WeatherProvider>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
  // </BrowserRouter>
);