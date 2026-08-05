import {
  FaTint,
  FaWind,
  FaCompressAlt,
  FaEye,
} from "react-icons/fa";

import { useWeather } from "../../context/WeatherContext";

import "./WeatherHighlights.css";

export default function WeatherHighlights() {

  const { weather } = useWeather();

  if (!weather) return null;

  const data = [

    {
      icon:<FaTint/>,
      title:"Humidity",
      value:`${weather.current.humidity}%`
    },

    {
      icon:<FaWind/>,
      title:"Wind",
      value:`${weather.current.windSpeed} km/h`
    },

    {
      icon:<FaCompressAlt/>,
      title:"Pressure",
      value:`${weather.current.pressure} mb`
    },

    {
      icon:<FaEye/>,
      title:"Visibility",
      value:`${weather.current.visibility} km`
    }

  ];

  return(

<div className="card">

<h3>Today's Highlights</h3>

<div className="highlight-grid">

{data.map((item)=>(

<div
className="highlight-card"
key={item.title}
>

{item.icon}

<h2>{item.value}</h2>

<p>{item.title}</p>

</div>

))}

</div>

</div>

)

}