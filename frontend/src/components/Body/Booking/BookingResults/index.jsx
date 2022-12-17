import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FcApproval } from "react-icons/fc";
import "./BookingResults.scss";

const BookingResults = (props) => {
  const navigate = useNavigate();
  const { type } = useParams();
  const [toggle, setToggle] = useState(false);
  return (
    <section className="newContainer">
      <div className="ResultsContainer">
        <FcApproval className="ResultsContainer_icon" />
        {type === "product" && <h4>¡Muchas gracias!</h4>}
        {type === "product" ? (
          <p>Su reserva se ha realizado con éxito</p>
        ) : (
          <p>Tu propiedad se ha creado con éxito</p>
        )}

        <button onClick={() => navigate("/home")}> Ok</button>
      </div>
    </section>
  );
};
export default BookingResults;
