import axios from "axios";
import { useEffect, useState } from "react";
import { RightViewToday, LeftViewToday } from "../Home/CityDTO";
import LeftSideView from "./LeftSideView";
import "./LeftSideView.css";
import RightForecast from "./RightForecast";
import RightHistory from "./RightHistory";
import "./RightSideView.css";
import RightToday from "./RightToday";
function Detail(props: any) {
  const [leftSide, setLeft] = useState<LeftViewToday>();
  const [rightSide, setRight] = useState<RightViewToday>();
  const [btn, setBtn] = useState<string>("todayRight");
  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${props.location.state.city}&appid=e899757c1162bf7b2b2684a0b2b8f5cc&units=metric`
      )
      .then((response) => {
        let temp = response.data;
        let tempLeft: LeftViewToday = {
          temperature: 0,
          humidity: 0,
          timestamp: new Date(),
          name: "",
          title: "",
        };
        let tempRight: RightViewToday = {
          minTemp: 0,
          maxTemp: 0,
          windSpeed: 0,
          windDirection: "",
          sunsetTime: "",
          sunriseTime: "",
          humidity: 0,
        };
        tempLeft.temperature = temp.main.temp;
        tempLeft.humidity = temp.main.humidity;
        tempLeft.name = props.location.state.city;
        tempLeft.title = temp.weather[0].main;
        tempLeft.timestamp = temp.dt;

        tempRight.minTemp = temp.main.temp_min;
        tempRight.maxTemp = temp.main.temp_max;
        tempRight.humidity = temp.main.humidity;
        tempRight.windSpeed = temp.wind.speed;
        tempRight.windDirection = temp.wind.deg;
        tempRight.sunsetTime = temp.sys.sunset;
        tempRight.sunriseTime = temp.sys.sunrise;
        setLeft(tempLeft);
        setRight(tempRight);
      })
      .catch((error) => console.log(error));
  }, []);
  function changeState(id: string) {
    let addBtn = document.getElementById(id);
    let removeBtn = document.getElementById(btn);
    if (addBtn != null && removeBtn != null) {
      setBtn(id);
      addBtn.className = "ActiveNavBtn";
      removeBtn.className = "NavBtn";
    }
  }
  return (
    <div className="DetailView">
      {leftSide != null ? <LeftSideView props={leftSide} /> : null}
      <div className="RightNavBar">
        <button
          id="todayRight"
          className="ActiveNavBtn"
          onClick={() => changeState("todayRight")}
        >
          Today
        </button>
        <button
          id="forecastRight"
          className="NavBtn"
          onClick={() => changeState("forecastRight")}
        >
          Forecast
        </button>
        <button
          id="historyRight"
          className="NavBtn"
          onClick={() => changeState("historyRight")}
        >
          History
        </button>
      </div>
      <div className="RightNavBar">
        {rightSide != null && btn != null ? (
          btn === "todayRight" ? (
            <RightToday data={rightSide} />
          ) : btn === "forecastRight" ? (
            <RightForecast
              lon={props.location.state.lon}
              lat={props.location.state.lat}
            />
          ) : (
            <RightHistory
              lon={props.location.state.lon}
              lat={props.location.state.lat}
            />
          )
        ) : null}
      </div>
    </div>
  );
}
export default Detail;
