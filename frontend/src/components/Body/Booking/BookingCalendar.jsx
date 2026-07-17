import { useEffect, useMemo, useState } from "react";
import { addDays } from "date-fns";
import { es } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { getAvailability } from "../../../services/fetchService";
import "./Booking.scss";

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

export default function BookingCalendar({ productId, setStartDate, setEndDate }) {
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

  const disabledDates = useMemo(() => [...pastDates(), ...reservedDates], [reservedDates]);

  const handleChange = (item) => {
    setRange(item.selection);
    setStartDate(item.selection.startDate);
    setEndDate(item.selection.endDate);
  };

  return (
    <div className="calendarContainer">
      <h3>Seleccioná tu fecha de Reserva</h3>
      <div className="calendarContainer_box">
        <DateRangePicker
          className="calendarContainer_box__drp"
          disabledDates={disabledDates}
          ranges={[range]}
          onChange={handleChange}
          months={calendarPages}
          direction="horizontal"
          showDateDisplay={false}
          retainEndDateOnFirstSelection={true}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          locale={es}
        />
      </div>
    </div>
  );
}
