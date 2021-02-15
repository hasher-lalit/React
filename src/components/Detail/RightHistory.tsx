import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Detail from "../Detail/Detail";
import Clock from "../../images/clock.svg";
import { RightViewForecast, RightViewHistory } from "../Home/CityDTO";
import CreateGraph from "./CreateGraph";
function RightHistory(props: any) {
  const dateUnix = Math.round(new Date().getTime() / 1000);
  const [history, setHistory] = useState<RightViewHistory[]>([]);
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  useEffect(() => {
    tempFun();
    async function tempFun() {
      for (let i = 1; i <= 5; i++) {
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${
              props.lat
            }&lon=${props.lon}&dt=${
              dateUnix - 10 - i * 86400
            }&appid=a9c7a346f3196bdf3072d1b5efdb5a34&units=metric`
          )
          .then((response) => {
            let THistory = response.data.current;
            setHistory((history) => [
              ...history,
              {
                sunriseTime: formatTime(THistory.sunrise),
                sunsetTime: formatTime(THistory.sunset),
                temperature: THistory.temp,
                day: days[new Date(THistory.dt * 1000).getDay()],
              },
            ]);
          })
          .catch((error) => console.log(error));
      }
    }
  }, []);
  return (
    <>
      <div className="HeaderTitle">History</div>
      <div className="RightSideBottom">
        {history.map((day) => (
          <div key={day.day} className="RightCard">
            <div className="dayTitle">{day.day}</div>
            <img className="rclockImgCard" src={Clock} alt="Clock" />
            <div className="tempHistory">{Math.round(day.temperature)}`C</div>
            <div>
              <p className="sunDesc">Sunrise </p>{" "}
              <p className="sunTime">{day.sunriseTime}</p>
            </div>
            <div>
              <p className="sunDesc">Sunset </p>
              <p className="sunTime">{day.sunsetTime}</p>
            </div>
          </div>
        ))}
      </div>
      <CreateGraph data={history}></CreateGraph>
    </>
  );
}
function formatTime(newDate: number) {
  var date = new Date(newDate * 1000);
  var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  var ampm = date.getHours() > 12 ? " pm" : " am";
  var minutes = "0" + date.getMinutes();
  return hours + ":" + minutes.substr(-2) + ampm;
}
export default RightHistory;
