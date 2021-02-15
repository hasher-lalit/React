import React, { useState, useEffect, useRef } from "react";
import CityCard from "./CityCard";
import "./Home.css";
import axios from "axios";
import { City } from "./CityDTO";
import { useHistory } from "react-router-dom";

function HomeLower() {
  const [cities, setCities] = useState<City[]>([]);
  const [search, setSearch] = useState<string>("");
  const allCities = require("indian-cities-json").cities;
  const [suggestedCities, setSuggestion] = useState<string[]>([]);
  const node = useRef(null);
  useOutsideAlerter(node);
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        // console.log("u lcicked");
        if (ref.current && !ref.current.contains(event.target)) {
          let temp = document.getElementById("myDropdown");
          if (temp != null) {
            temp.style.display = "none";
          }
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  function loadCities() {
    let temp = document.getElementById("myDropdown");
    if (temp != null) {
      temp.style.display = "block";
    }
  }
  useEffect(() => {
    var filter: string;
    filter = search.toUpperCase();
    setSuggestion(allCities);
    let tempCities = [];
    for (let i = 0; i < allCities.length; i++) {
      let txtValue = allCities[i].name;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tempCities.push(txtValue);
      }
    }
    setSuggestion(tempCities);
  }, [search, cities]);

  function addCity(myCity: string) {
    let newCity: City;
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].name === myCity) {
        alert(`${myCity} already exists in our Bag.`)
        let temp = document.getElementById("myDropdown");
        if (temp != null) {
          temp.style.display = "none";
        }
        return null;
      }
    }

    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=a9c7a346f3196bdf3072d1b5efdb5a34&units=metric`
      )
      .then((response) => {
        closeDropDown();
        newCity = {
          name: response.data.name,
          longitude: response.data.coord.lon,
          latitude: response.data.coord.lat,
          temperature: response.data.main.temp,
          title: response.data.weather[0].main,
          timestamp: new Date(response.data.dt * 1000),
        };
        setCities([...cities, newCity]);
        // console.log(cities);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <div className="upperHalf">
        <p className="headerText">Weather App</p>
        <div ref={node} className="drop-down-menu">
          <input
            id="myInput"
            type="text"
            placeholder="Enter your City Name"
            onChange={(event) => setSearch(event.target.value)}
            onClick={() => loadCities()}
            autoComplete="off"
          />
          <div id="myDropdown" className="dropdown-content">
            {suggestedCities.map((city) => (
              <div onClick={() => addCity(city)}>{city}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="lowerHalf">
        {cities.map((city) => (
          <CityCard key={city.name} city={city} />
        ))}
      </div>
    </div>
  );
}
function closeDropDown() {
  let temp = document.getElementById("myDropdown");
  if (temp != null) {
    temp.style.display = "none";
  }
}
export default HomeLower;
