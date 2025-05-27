import React from "react";
import PropTypes from 'prop-types'; // Importa PropTypes
import { addDays } from "date-fns";
import { es } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { getBookingDates } from "../../../services/fetchService";
import "./Booking.scss";

export default class BookingCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledDates: [],
      calendarPages: 1,
      num: 0,
      state: [
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: "selection",
        },
      ],
    };
  }

  updateState = (property, value) => {
    if (property === "state") {
      this.setState(prevState => ({
        ...prevState,
        [property]: value,
        num: prevState.num + 1
      }), () => {
        this.props.setStartDate(value[0].startDate);
        this.props.setEndDate(value[0].endDate);
      });
    } else  {
  this.setState(prevState => ({
    ...prevState,
    [property]: value
  }));
}
  };

  areValidDates = (startDate, endDate) => {
    // Implementa tu lógica de validación de fechas aquí
    return startDate && endDate && startDate < endDate;
  };

  

  disableDatesArray = () => {
    let disableDatesArray = [];
    for (let i = 1; i <= 60; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      disableDatesArray.push(date);
    }
    return disableDatesArray;
  };

  updateBookingDates = () => {
    getBookingDates(this.props.product.id).then((response) => {
      const newDisabledDates = [...this.state.disabledDates];
      
      response.forEach((r) => {
        const startDate = new Date(r.checkIn);
        let endDate = new Date(r.checkOut);
        const userTimezoneOffset = startDate.getTimezoneOffset() * 60000;

        const date = new Date(startDate.getTime() + userTimezoneOffset);
        endDate = new Date(endDate.getTime() + userTimezoneOffset);

        date.setDate(date.getDate());

        while (date <= endDate) {
          newDisabledDates.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
      });

      this.updateState("disabledDates", newDisabledDates);
    });
  };

  updateCalendarPages = () => {
    const pages = window.outerWidth < 768 ? 1 : 2;
    this.updateState("calendarPages", pages);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateCalendarPages);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      this.updateBookingDates();
    }
  }

  componentDidMount() {
    this.updateCalendarPages();
    this.updateBookingDates();
    window.addEventListener("resize", this.updateCalendarPages);
  }

  render() {
    const disableDatesArray = [
      ...this.disableDatesArray(),
      ...this.state.disabledDates,
    ];
    return (
      <div className="calendarContainer">
        <h3>Seleccioná tu fecha de Reserva</h3>
        <div className="calendarContainer_box">
          <DateRangePicker
            className="calendarContainer_box__drp"
            disabledDates={disableDatesArray}
            ranges={[this.state.state[0]]}
            onChange={(item) => this.updateState("state", [item.selection])}
            months={this.state.calendarPages}
            direction={"horizontal"}
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
}

// Validación de props (esto va al final del archivo, fuera de la clase)
BookingCalendar.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  }).isRequired,
  setValue: PropTypes.func.isRequired,
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  toggle: PropTypes.bool // Si es opcional, quita el isRequired
};

// Valores por defecto para props opcionales
BookingCalendar.defaultProps = {
  toggle: false // Solo si toggle es opcional
};