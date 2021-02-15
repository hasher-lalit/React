import { useHistory } from "react-router-dom";
import { City } from "./CityDTO";
import Clock from "../../images/clock.svg";
import "./cityCard.css";
interface iProps {
  city: City;
  key: string;
}
function CityCard(props: iProps) {
  const history = useHistory();
  const handleClick = () => {
    let state = {
      lat: props.city.latitude,
      lon: props.city.longitude,
      city: props.city.name,
    };
    history.push({
      pathname: "/Detail",
      state,
    });
  };
  return (
    <div className="cityCard" onClick={handleClick}>
      <div className="cityName">{props.city.name}</div>
      <div className="cityTime">{props.city.timestamp.toLocaleString()}</div>
      <img className="clockImgCard" src={Clock} alt="clock" />
      <div className="cityTemp">{Math.round(props.city.temperature)}`C</div>
      <div className="cityTitle">{props.city.title}</div>
    </div>
  );
}
export default CityCard;
