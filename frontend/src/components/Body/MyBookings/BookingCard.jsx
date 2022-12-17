import React from "react";
import { ImLocation } from "react-icons/im";
import { RiStarSFill } from "react-icons/ri";
import "./../../../containers/Body/ProductCardStyle.scss";
import "./MyBookings.scss"
import { Link } from "react-router-dom";

export default function BookingCard(props) {
  return (
    <div className="productCardMainContainer reserva">
      <div className="productCardMainContainer__imageContainer">
        <img src={props.image} alt="" />
      </div>
      <div className="productCardMainContainer__contentContainer">
        <div className="productCardMainContainer__contentContainer__header">
          <div className="productCardMainContainer__contentContainer__header__startContainer">
            <span>
              {props.category}
              <RiStarSFill className="productCardMainContainer__contentContainer__header__startContainer--star" />
              <RiStarSFill className="productCardMainContainer__contentContainer__header__startContainer--star" />
              <RiStarSFill className="productCardMainContainer__contentContainer__header__startContainer--star" />
              <RiStarSFill className="productCardMainContainer__contentContainer__header__startContainer--star" />
            </span>
            <p>{props.name}</p>
          </div>
          <div className="productCardMainContainer__contentContainer__header__endContainer">
            <p className="productCardMainContainer__contentContainer__header__endContainer--calification">
              Reserva #
            </p>
            <p className="productCardMainContainer__contentContainer__header__endContainer--numberContainer">
              <span>{props.id}</span>
            </p>
          </div>
        </div>
        <div className="productAddress">
          <ImLocation />
          <span>
            {" "}
            {props.location}, {props.city.city}, {props.city.country}
          </span>
        </div>
        <div className="dateDetails">
        <hr />
        <div className="dateDetails__in">
          <span>Check In</span>{" "}
          <span>{props.checkIn}</span>
        </div>
        <hr />
        <div className="dateDetails__out">
          <span>Check Out</span>{" "}
          <span>{props.checkOut}</span>
        </div>
        <hr />
        
      </div>
      <Link className="gestionar" to="">Gestionar reserva</Link>
      </div>
    </div>
  );
}
