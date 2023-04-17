import React from "react";
import { addDays } from "date-fns";
import { es } from "date-fns/locale";
import "react-date-range/dist/styles.css"; // main style file
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
    this.setState({
      ...this.state,
      [property]: value,
    });
    if (property === "state") {
      this.state.num = this.state.num + 1;
      this.props.setStartDate(value[0].startDate);
      this.props.setEndDate(value[0].endDate);
    }
  };
  handleClick = (e) => {
    e.preventDefault();
    const firstDate = this.state.state[0].startDate.toLocaleDateString(
      "es-co",
      { weekday: "short", year: "numeric", month: "short", day: "numeric" }
    );
    const lastDate = this.state.state[0].endDate.toLocaleDateString("es-co", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const inputCalendarText = this.areValidDates(
      this.state.state[0].startDate,
      this.state.state[0].endDate
    )
      ? `${firstDate} - ${lastDate}`
      : "Check In - Check out";
    this.props.setValue(inputCalendarText);
    if (
      this.areValidDates(
        this.state.state[0].startDate,
        this.state.state[0].endDate
      )
    )
      this.updateState("toggle", !this.state.toggle);
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
      response.map((r) => {
        const startDate = new Date(r.checkIn);
        let endDate = new Date(r.checkOut);
        const userTimezoneOffset = startDate.getTimezoneOffset() * 60000;

        const date = new Date(startDate.getTime() + userTimezoneOffset);
        endDate = new Date(endDate.getTime() + userTimezoneOffset);

        date.setDate(date.getDate());

        const currentDates = this.state.disabledDates;

        while (date <= endDate) {
          currentDates.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }

        this.updateState("disabledDates", currentDates);
        return true
      });
    });
  };

  updateCalendarPages = () => {
    const pages = window.outerWidth < 768 ? 1 : 2;
    this.updateState("calendarPages", pages);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateCalendarPages);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
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
