import React, { useEffect, useState } from "react";
import DropdownSelect from "./DropDownSelect";
import { getAllCities } from "../../../services/fetchService";
import "./SeacrhBarStyle.scss";
import { HashLink } from "react-router-hash-link";
import { DateRange } from "react-date-range";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { BsCalendar3 } from "react-icons/bs";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const SearchBar = () => {
  const [place, setPlace] = useState("¿A dónde vamos?");
  const [cities, setCities] = useState([]);
  const [placeId, setPlaceId] = useState(0);
  const [status, setStatus] = useState("loading");
  // Fechas opcionales: sin elegir, la búsqueda filtra solo por municipio como siempre.
  const [range, setRange] = useState({ startDate: new Date(), endDate: new Date(), key: "selection" });
  const [datesChosen, setDatesChosen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getAllCities()
      .then((res) => {
        if (cancelled) return;
        setCities(res);
        setStatus(res.length === 0 ? "empty" : "ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleRangeChange = (item) => {
    setRange(item.selection);
    setDatesChosen(true);
  };

  const clearDates = () => {
    setDatesChosen(false);
    setCalendarOpen(false);
    setRange({ startDate: new Date(), endDate: new Date(), key: "selection" });
  };

  const dateLabel = datesChosen
    ? `${format(range.startDate, "dd/MM/yyyy")} — ${format(range.endDate, "dd/MM/yyyy")}`
    : "¿Cuándo? (opcional)";

  const searchTarget = () => {
    if (placeId === 0) return "#title";
    let target = `/city/${placeId}`;
    if (datesChosen && range.endDate > range.startDate) {
      target += `?from=${format(range.startDate, "yyyy-MM-dd")}&to=${format(range.endDate, "yyyy-MM-dd")}`;
    }
    return `${target}#title`;
  };

  return (
    <div className="SearchBarContainer">
      <div className="SearchBarContainer__container">
        <h1>Alojamientos con el sol del Cesar y el mar de La Guajira</h1>
        <form>
          <div className="SearchBarContainer__formContainer-inputBox">
            {status === "error" && (
              <p className="SearchBarContainer__status">No pudimos cargar los municipios. Intentá de nuevo más tarde.</p>
            )}
            {status === "empty" && <p className="SearchBarContainer__status">Todavía no hay municipios cargados.</p>}
            <DropdownSelect places={cities} currentPlace={place} setPlace={setPlace} setPlaceId={setPlaceId} />
          </div>

          <div className="SearchBarContainer__datesBox">
            <div className="SearchBarContainer__datesInput" onClick={() => setCalendarOpen(!calendarOpen)}>
              <BsCalendar3 className="SearchBarContainer__datesInput-icon" />
              <p>{dateLabel}</p>
            </div>
            {calendarOpen && (
              <div className="SearchBarContainer__calendar">
                <DateRange
                  ranges={[range]}
                  onChange={handleRangeChange}
                  minDate={new Date()}
                  locale={es}
                  showDateDisplay={false}
                  moveRangeOnFirstSelection={false}
                />
                <div className="SearchBarContainer__calendarActions">
                  <button type="button" onClick={clearDates}>
                    Limpiar
                  </button>
                  <button type="button" onClick={() => setCalendarOpen(false)}>
                    Listo
                  </button>
                </div>
              </div>
            )}
          </div>

          <HashLink to={searchTarget()} className="SearchBarContainer__formContainer-button">
            Buscar
          </HashLink>
        </form>
      </div>
    </div>
  );
};
export default SearchBar;
