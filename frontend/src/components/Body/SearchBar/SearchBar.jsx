import React, { useEffect, useState } from "react";
import CalendarInput from "./CalendarInput";
import DropdownSelect from "./DropDownSelect";
import { getAllCities } from "../../../services/fetchService";
import "./SeacrhBarStyle.scss";
import { HashLink } from "react-router-hash-link";

const SearchBar = () => {
  const [CalendarValue, setCalendarValue] = useState("Check In - Check out");
  const [starDate, setStarDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [place, setPlace] = useState("¿A dónde vamos?");
  const [cities, setCities] = useState([]);
  const [placeId, setPlaceId] = useState(0);
  const updateLocationInput = (locationValue) => {
    setPlace(locationValue);
  };
  const updatePlaceId = (id) => {
    setPlaceId(id);
  };
  const printValues = (calendarValue) => {
    setCalendarValue(calendarValue);
  };
  useEffect(() => {
    getAllCities().then((res) => {
      setCities(res);
    });
  }, []);

  return (
    <div className="SearchBarContainer">
      <div className="SearchBarContainer__container">
        <h1>
          <p>Busca ofertas en alquiler de apartamentos, casas y mucho más</p>
        </h1>
        <div className="SearchBarContainer__formContainer"></div>
        <form>
          <div className="SearchBarContainer__formContainer-inputBox">
            <DropdownSelect
              places={cities}
              currentPlace={place}
              setPlace={updateLocationInput}
              setPlaceId={updatePlaceId}
            />
          </div>
          <div className="SearchBarContainer__formContainer-inputBox">
            <CalendarInput
              f={printValues}
              value={CalendarValue}
              setValue={setCalendarValue}
              setStartDate={setStarDate}
              setEndDate={setEndDate}
            />
          </div>
          <HashLink
            to={
              placeId !== 0 && starDate !== "" && endDate !== ""
                ? "/cityAndDate/" +
                  placeId +
                  "+" +
                  starDate +
                  "+" +
                  endDate +
                  "#title"
                : placeId
                ? "/city/" + placeId + "#title"
                : "/date/" + starDate + "+" + endDate + "#title"
            }
            className="SearchBarContainer__formContainer-button"
          >
            Buscar
          </HashLink>
        </form>
      </div>
    </div>
  );
};
export default SearchBar;
/*

{"/city/" + placeId + "#title"}
*/
