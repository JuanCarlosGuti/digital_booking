import { useEffect, useMemo, useState } from "react";
import { addDays } from "date-fns";
import { es } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

import "./ProductCalendar.scss";
import { Link } from "react-router-dom";
import { getAvailability } from "../../../../services/fetchService";
import { useAuth } from "../../../../context/AuthContext";

function pastDates() {
  const dates = [];
  for (let i = 1; i <= 60; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates;
}

function expandRange(checkIn, checkOut) {
  const dates = [];
  const cursor = new Date(checkIn);
  const end = new Date(checkOut);
  while (cursor <= end) {
    dates.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

export default function ProductCalendar({ productId }) {
  const { isAuthenticated } = useAuth();
  const [calendarPages, setCalendarPages] = useState(window.innerWidth < 768 ? 1 : 2);
  const [range, setRange] = useState({ startDate: new Date(), endDate: addDays(new Date(), 7), key: "selection" });
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    const updatePages = () => setCalendarPages(window.innerWidth < 768 ? 1 : 2);
    window.addEventListener("resize", updatePages);
    return () => window.removeEventListener("resize", updatePages);
  }, []);

  useEffect(() => {
    if (!productId) {
      return;
    }
    getAvailability(productId).then((bookings) => {
      setReservedDates(bookings.flatMap((b) => expandRange(b.checkIn, b.checkOut)));
    });
  }, [productId]);

  // Fechas deshabilitadas: se recalculan a partir de reservedDates en vez de mutar un array
  // guardado en estado (el bug original: cada respuesta del backend se empujaba sobre el mismo
  // array de estado, duplicando fechas en cada recarga).
  const disabledDates = useMemo(() => [...pastDates(), ...reservedDates], [reservedDates]);

  return (
    <div className="prodCalendar">
      <div className="prodCalendar__container">
        <h3>Fechas disponibles</h3>
        <div className="prodCalendar__mainContainer">
          <div className="prodCalendar__mainContainer__calendarBoxContainer">
            <div className="prodCalendar__mainContainer__calendarBoxContainer-Box">
              <DateRangePicker
                ranges={[range]}
                onChange={(item) => setRange(item.selection)}
                months={calendarPages}
                disabledDates={disabledDates}
                direction="horizontal"
                showDateDisplay={false}
                retainEndDateOnFirstSelection={true}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                locale={es}
              />
            </div>
          </div>
          <div className="prodCalendar__mainContainer__assignButtonContainer">
            <div className="prodCalendar__mainContainer__assignButtonContainer-Box">
              <p>Agregá tus fechas de reserva para obtener precios exactos </p>
              <Link to={isAuthenticated ? `/product/${productId}/booking` : "/login"}>Iniciar reserva</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
