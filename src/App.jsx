import { useEffect, useState } from "react";

import Loading from "./components/Loading/Loading";
import AppRoutes from "./routes/AppRoutes";
import WeatherBackground from "./components/WeatherBackground/WeatherBackground";
import WeatherEffects from "./components/WeatherEffects/WeatherEffects";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <WeatherBackground />
      <WeatherEffects />
      <AppRoutes />
    </>
  );
}

export default App;