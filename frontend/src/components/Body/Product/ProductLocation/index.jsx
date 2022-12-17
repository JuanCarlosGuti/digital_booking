import "./ProductLocation.scss";
import { ImLocation } from "react-icons/im";

export default function ProductLocation(props) {
  return (
    <div className="productLocation">
      <div className="productLocation__container">
        <ImLocation />
        <span>
          {props.city.city}, {props.city.country}
        </span>
      </div>
    </div>
  );
}
