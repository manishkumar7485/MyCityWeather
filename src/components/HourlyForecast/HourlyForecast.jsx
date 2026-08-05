import { useWeather } from "../../context/WeatherContext";
import "./HourlyForecast.css";

export default function HourlyForecast(){

const { weather } = useWeather();

if(!weather) return null;

return(

<div className="card">

<h3>Today's Forecast</h3>

<div className="hour-scroll">

{weather.hourly.slice(0,24).map((hour)=>(

<div
className="hour-card"
key={hour.time_epoch}
>

<p>{hour.time.split(" ")[1]}</p>

<img
src={`https:${hour.condition.icon}`}
alt=""
/>

<h4>{hour.temp_c}°</h4>

</div>

))}

</div>

</div>

)

}