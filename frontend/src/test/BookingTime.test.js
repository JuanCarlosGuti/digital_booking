
import BookingTime from "../components/Body/Booking/BookingTime";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("should render component", () => {
  render(
    <BrowserRouter>
      <BookingTime setBookinHour={jest.fn()} />
    </BrowserRouter>
  );

  expect(
    screen.getByText(
      "indicá tu horario estimado de llegada",
      { exact: false }
    )
  ).toBeInTheDocument();
});
