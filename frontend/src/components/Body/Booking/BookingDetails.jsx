import "./Booking.scss";
import { useEffect } from "react";
import { ImLocation } from "react-icons/im";
import { RiStarSFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { postBooking } from "../../../services/fetchService";

export default function BookingDetails({
  product,
  city,
  category,
  startDate,
  endDate,
  hour,
}) {
  const navigate = useNavigate();
  let firstDate;
  let lastDate;
  if (startDate !== undefined) {
    firstDate = startDate.toLocaleDateString("es-co", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    lastDate = endDate.toLocaleDateString("es-co", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const validateBooking = async () => {
    if (endDate !== undefined && startDate !== undefined) {
      if (hour !== "") {
        await postBooking(
          startDate.toISOString().split("T")[0],
          endDate.toISOString().split("T")[0],
          product.id,
          JSON.parse(localStorage.getItem("user")).id
        ).then((response) => {
          navigate(`/product/${product.id}/booking/results`);
        });
      } else {
        alert("Ingrese una hora");
      }
    } else {
      alert("Ingrese las fechas de reserva");
    }
  };
  useEffect(() => {
    if (localStorage.token) {
      // getUserByToken().then((response) => {
      //   setUser(response);
      // });
    }
    //console.log(city);
    //console.log(category);
  }, []);

  return (
    <div className="detailsContainer">
      <h3>Detalle de la reserva</h3>
      <img
        src={
          product.images.length > 0
            ? product.images[0].url
            : ""
        }
        alt="imagenPpalPropiedad"
      />

      <div className="locationDetails">
        <div className="category">{category.title.toUpperCase()}</div>
        <div className="title">{product.name}</div>
        <RiStarSFill className="stars" />
        <RiStarSFill className="stars" />
        <RiStarSFill className="stars" />
        <div className="productAddress">
          <ImLocation />
          <span>
            {" "}
            Direccion exacta, {city.city}, {city.country}
          </span>
        </div>
      </div>
      <div className="dateDetails">
        <hr />
        <div className="dateDetails__in">
          <span>Check In</span>{" "}
          <span>{startDate === undefined ? "_/_/_" : firstDate}</span>
        </div>
        <hr />
        <div className="dateDetails__out">
          <span>Check Out</span>{" "}
          <span>{endDate === undefined ? "_/_/_" : lastDate}</span>
        </div>
        <hr />
        <button onClick={() => validateBooking()}>Confirmar Reserva</button>
      </div>
    </div>
  );
}
