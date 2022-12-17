import "./Booking.scss";
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";
import React from "react";
import { useState } from "react";

export default function BookingTime({ setBookinHour }) {
  const [toggle, setToggle] = useState(false);
  const [time, setTime] = useState("Seleccione una hora");
  const setInputContent = (content) => {
    setTime(content);
    setBookinHour(content);
    setToggle(!toggle);
  };
  const createHours = (meridian) => {
    let hours = [];
    for (let i = 1; i <= 12; i++) {
      hours.push(`${i}:00 ${meridian}`);
    }

    return hours;
  };
  const hours = [...createHours("AM"), ...createHours("PM")];

  return (
    <div className="TimeMainContainer">
      <div className="TimeMainContainer_resultMessage">
        <i>
          <BsCheckCircle />
        </i>
        <p>
          Tu habitación va a estar lista para el checking 30 minutos antes de la
          hora que indiques según las normas establecidas
        </p>
      </div>
      <label htmlFor="">indicá tu horario estimado de llegada</label>
      <div
        className={
          toggle
            ? "TimeMainContainer_HoursContainer inSightHours"
            : "TimeMainContainer_HoursContainer hiddenHours"
        }
      >
        {hours.map((h) => (
          <div key={h} onClick={() => setInputContent(h)}>
            {h}
          </div>
        ))}
      </div>
      <div className="TimeMainContainer_inputContainer">
        <p>{time}</p>
        <i onClick={() => setToggle(!toggle)}>
          <AiOutlineDown />
        </i>
      </div>
    </div>
  );
}
