import React, { useState } from "react";
import "./DropDownSelectStyle.scss";
import DropdownOption from "../../../containers/SearchBar/DropdownOptions";
import { ImLocation } from "react-icons/im";

const DropdownSelect = (props) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <div className="SelectContainer" onClick={() => setToggle(!toggle)}>
        <div className="SelectContainer__iconContainer">
          <ImLocation className="SelectContainer__iconContainer-icon" />
        </div>
        <p> {props.currentPlace} </p>
      </div>
      <div
        className={
          toggle ? "optionsContainer animation" : "optionsContainer enlace"
        }
      >
        {props.places.map((c) => (
          <DropdownOption
            key={c.id}
            country={c.country}
            city={c.city}
            setPlace={props.setPlace}
            setDisplay={setToggle}
            displayValue={toggle}
            id={c.id}
            setPlaceId={props.setPlaceId}
          />
        ))}
      </div>
    </div>
  );
};
export default DropdownSelect;
