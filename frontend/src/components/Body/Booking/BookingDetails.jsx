import "./Booking.scss";
import { useState } from "react";
import { ImLocation } from "react-icons/im";
import { RiStarSFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../../services/fetchService";

export default function BookingDetails({ product, city, startDate, endDate, hour }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  let firstDate;
  let lastDate;
  if (startDate !== undefined) {
    firstDate = startDate.toLocaleDateString("es-co", { weekday: "short", year: "numeric", month: "short", day: "numeric" });
    lastDate = endDate.toLocaleDateString("es-co", { weekday: "short", year: "numeric", month: "short", day: "numeric" });
  }

  const validateBooking = async () => {
    if (startDate === undefined || endDate === undefined) {
      setError("Ingrese las fechas de reserva");
      return;
    }
    if (hour === "") {
      setError("Ingrese una hora");
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      await createBooking(product.id, startDate.toISOString().split("T")[0], endDate.toISOString().split("T")[0]);
      navigate(`/product/${product.id}/booking/results`);
    } catch (err) {
      setError(err.message || "No se pudo confirmar la reserva. Intente nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="detailsContainer">
      <h3>Detalle de la reserva</h3>
      <img src={product.images.length > 0 ? product.images[0].url : ""} alt={product.title} />

      <div className="locationDetails">
        <div className="category">{product.category.title.toUpperCase()}</div>
        <div className="title">{product.title}</div>
        <RiStarSFill className="stars" />
        <RiStarSFill className="stars" />
        <RiStarSFill className="stars" />
        <div className="productAddress">
          <ImLocation />
          <span> {product.address}, {city.city}, {city.department}</span>
        </div>
      </div>
      <div className="dateDetails">
        <hr />
        <div className="dateDetails__in">
          <span>Check In</span> <span>{startDate === undefined ? "_/_/_" : firstDate}</span>
        </div>
        <hr />
        <div className="dateDetails__out">
          <span>Check Out</span> <span>{endDate === undefined ? "_/_/_" : lastDate}</span>
        </div>
        <hr />
        {error && <p className="formError">{error}</p>}
        <button onClick={validateBooking} disabled={submitting}>
          {submitting ? "Confirmando..." : "Confirmar Reserva"}
        </button>
      </div>
    </div>
  );
}
