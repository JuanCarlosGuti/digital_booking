import { useState } from "react";


function CalendarButton(props) {
  const [dateState, setDateState] = useState(false);

  const areValidDates = () => {
    const startDateFormat = Date.parse(props.startDate);
    const endDateFormat = Date.parse(props.endDate);
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);

    return (
      props.startDate !== undefined &&
      props.endDate !== undefined &&
      startDateFormat >= currentDate &&
      endDateFormat >= currentDate
    );
  };

  const handleClick = (e) => {
    e.preventDefault();

    const calendarValue = areValidDates()
      ? `${props.startDate} - ${props.endDate}`
      : "Check In - Check out";

    props.f(calendarValue);

    if (areValidDates()) props.changeDisplayFunction(!props.displayState);
  };

  return (
    <div>
      <button onClick={handleClick}>
        Aplicar
      </button>
    </div>
  );
}

export default CalendarButton;
