import { useWeather } from "../../context/WeatherContext";
import "./DailyForecast.css";

export default function DailyForecast(){

const { weather } = useWeather();

if(!weather) return null;

return(

<div className="card">

<h3>10-Day Forecast</h3>

<div className="daily-list">

{weather.forecast.map((day)=>(

<div
className="day-row"
key={day.date}
>

<span>{day.date}</span>

<img
src={`https:${day.day.condition.icon}`}
alt=""
/>

<strong>

{day.day.maxtemp_c}° / {day.day.mintemp_c}°

</strong>

</div>

))}

</div>

</div>

)

}