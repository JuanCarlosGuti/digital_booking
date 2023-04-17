import React from "react";
import { ImLocation } from "react-icons/im";
import "./DropdownOptionStyle.scss";

const DropdownOption = (props) => {
  const example = () => {
    props.setPlace(`${props.country}, ${props.city}`);
    props.setDisplay(!props.displayValue);
    props.setPlaceId(props.id);
  };
  return (
    <div className="optionMainContainer" onClick={example}>
      <div className="optionMainContainer__box">
        <i>
          <ImLocation className="optionMainContainer__box-icon" />
        </i>
        <span>
          <p className="optionMainContainer__box-city">{props.city}</p>
          <p className="optionMainContainer__box-country">{props.country}</p>
        </span>
      </div>
      <hr />
    </div>
  );
};
export default DropdownOption;
