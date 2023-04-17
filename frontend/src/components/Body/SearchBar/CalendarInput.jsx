import React from "react";
import { addDays } from "date-fns";
import { es } from "date-fns/locale";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import "./CalendarInputStyle.scss";
import { BsCalendar4Event } from "react-icons/bs";

export default class CalendarInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      calendarPages: 1,
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
      const firstDate = value[0].startDate.toISOString().split("T")[0];
      const lastDate = value[0].endDate.toISOString().split("T")[0];

      this.props.setStartDate(firstDate);
      this.props.setEndDate(lastDate);
    }
  };
  updateCalendarPages = () => {
    const pages = window.innerWidth < 768 ? 1 : 2;
    this.updateState("calendarPages", pages);
  };

  areValidDates = (date1, date2) => {
    const startDateFormat = Date.parse(date1);
    const endDateFormat = Date.parse(date2);
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);
    return (
      date1 !== undefined &&
      date2 !== undefined &&
      date2 !== date1 &&
      startDateFormat >= currentDate &&
      endDateFormat >= currentDate
    );
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
  componentDidMount() {
    this.updateCalendarPages();
    window.addEventListener("resize", this.updateCalendarPages);
  }

  render() {
    const disableDatesArray = this.disableDatesArray();
    return (
      <div>
        <div
          className="CalendarInputBox"
          onClick={() => this.updateState("toggle", !this.state.toggle)}
        >
          <div className="CalendarInputBox__iconContainer">
            <BsCalendar4Event className="CalendarInputBox__iconContainer-icon" />
          </div>
          <p> {this.props.value} </p>
        </div>
        <div
          className={
            this.state.toggle
              ? "optionsContainer inSight"
              : "optionsContainer hidden"
          }
        >
          <div className="calendarContainer">
            <DateRangePicker
              className="prueba"
              ranges={[this.state.state[0]]}
              onChange={(item) => this.updateState("state", [item.selection])}
              months={this.state.calendarPages}
              disabledDates={disableDatesArray}
              direction={"horizontal"}
              showDateDisplay={false}
              retainEndDateOnFirstSelection={true}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              locale={es}
            />
             
          </div>
          <div className="CalendarButtonContainer">
            <button onClick={this.handleClick}>Aplicar</button>
          </div>
        </div>
      </div>
    );
  }
}
/*      <DateRangePicker
            className="prueba"
            ranges={[this.state.state[0]]}
            onChange={(item) => this.updateState("state", [item.selection])}
            months={this.state.calendarPages}
            disabledDates={disableDatesArray}
            direction={"horizontal"}
            showDateDisplay={false}
            retainEndDateOnFirstSelection={true}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            locale={es}
          /> */
