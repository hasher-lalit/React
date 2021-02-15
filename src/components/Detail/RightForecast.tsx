import axios from "axios";
import React, { useEffect, useState } from "react";
import Clock from "../../images/alarm_clock.svg";
import { RightViewForecast } from "../Home/CityDTO";
import CreateGraph from "./CreateGraph";

function RightForecast(props: any) {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [dailyWeather, setWeather] = useState<RightViewForecast[]>([]);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&exclude=hourly,minutely,alerts&appid=a9c7a346f3196bdf3072d1b5efdb5a34&units=metric`
      )
      .then((response) => {
        let dailyData = response.data.daily;
        let tempDaily: RightViewForecast[] = [];
        for (let i = 1; i < dailyData.length; i++) {
          tempDaily.push({
            minTemp: dailyData[i].temp.min,
            maxTemp: dailyData[i].temp.max,
            day: days[new Date(dailyData[i].dt * 1000).getDay()],
          });
        }
        setWeather(tempDaily);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="HeaderTitle">Week's Forecast</div>
      <div className="RightSideBottom">
        {dailyWeather.map((day) => (
          <div key={day.day} className="RightCard">
            <div className="dayTitle">{day.day}</div>
            <img className="rclockImgCard" src={Clock} alt="Clock" />
            <div className="tempHistory">
              {Math.round(day.minTemp + day.maxTemp) / 2}`C
            </div>
            <div>
              <p className="sunDesc">Max </p>{" "}
              <p className="sunTime">{Math.round(day.maxTemp)}`C</p>
            </div>
            <div>
              <p className="sunDesc">Min </p>
              <p className="sunTime">{Math.round(day.minTemp)}`C</p>
            </div>
          </div>
        ))}
      </div>
      <CreateGraph data={dailyWeather} />
    </>
  );
}
export default RightForecast;
