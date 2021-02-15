import React, { useState } from "react";
import Clock from "../../images/alarm_clock.svg";
import Bino from "../../images/binoculars.svg";
import Humid from "../../images/align_center.svg";
import { City, RightViewToday, LeftViewToday } from "../Home/CityDTO";
function LeftSideView(props: any) {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const newDate = new Date(props.props.timestamp * 1000);
  var date = newDate;
  var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  var ampm = date.getHours() > 12 ? "pm" : "am";
  var minutes = "0" + date.getMinutes();
  var formattedTime = hours + ":" + minutes.substr(-2);

  return (
    <div className="LeftView">
      <div className="lcityName">{props.props.name}</div>
      <img className="lclockImgCard" src={Clock} alt="Clock" />
      <div className="lcityTemp">{props.props.temperature}&#8451;</div>
      <div className="lcityDate">
        {days[newDate.getDay()]} {formattedTime} {ampm}
      </div>
      <div className="lcityTitle"><img className="bino" src={Bino} alt="Bino" />  {props.props.title}</div>
      <div className="lcityHumidity"><img className="humid" src={Humid} alt="Humid" />  Rain {props.props.humidity}%</div>
    </div>
  );
}

export default LeftSideView;
