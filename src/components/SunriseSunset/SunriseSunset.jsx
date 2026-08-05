import { FaSun, FaMoon } from "react-icons/fa";
import { useWeather } from "../../context/WeatherContext";
import "./SunriseSunset.css";

export default function SunriseSunset(){

const { weather } = useWeather();

if(!weather) return null;

return(

<div className="card">

<h3>Sun & Moon</h3>

<div className="sun-grid">

<div className="sun-card">

<FaSun/>

<h2>{weather.astronomy.sunrise}</h2>

<p>Sunrise</p>

</div>

<div className="sun-card">

<FaMoon/>

<h2>{weather.astronomy.sunset}</h2>

<p>Sunset</p>

</div>

</div>

</div>

)

}