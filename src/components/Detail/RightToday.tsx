function RightSideView(props: any) {
  return (
    <>
      <div className="HeaderTitle">Today's HighLight</div>
      <div className="RightSideBottom">
        <div className="correctStyle">
          <div className="RightCard">
            <div className="TitleCard">Temperature</div>
            <div>
              <p className="maxDesc">Max </p>{" "}
              <p className="maxTemp">{props.data.maxTemp}&#8451;</p>
            </div>
            <div>
              <p className="maxDesc">Min </p>
              <p className="maxTemp">{props.data.minTemp}&#8451;</p>
            </div>
          </div>
          <div className="RightCard">
            <div className="TitleCard">Wind Status</div>
            <div className="windSpeed">
              {props.data.windSpeed} <span>km/h</span>
            </div>
            <div className="windDeg">
              {props.data.windDirection}
              <sup>o</sup>
            </div>
          </div>
          <div className="RightCard">
            <div className="TitleCard">Sunrise/ Sunset</div>
            <div className="sunWeather">
              <p className="sunDesc">Sunrise </p>{" "}
              <p className="sunTime">{formatTime(props.data.sunriseTime)}</p>
            </div>
            <div className="sunWeather">
              <p className="sunDesc">Sunset </p>
              <p className="sunTime">{formatTime(props.data.sunsetTime)}</p>
            </div>
          </div>
          <div className="RightCard">
            <div className="TitleCard">Humidity</div>
            <div className="HumidityRight">
              {props.data.humidity}%<p>Normal</p>
            </div>
          </div>
        </div>
      </div>
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
export default RightSideView;
