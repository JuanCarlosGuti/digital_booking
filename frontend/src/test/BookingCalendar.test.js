
import BookingCalendar from "../components/Body/Booking/BookingCalendar";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { sampleProduct } from "./fixtures";

test("should render component", () => {
  render(
    <BrowserRouter>
      <BookingCalendar
        product={sampleProduct}
        setStartDate={jest.fn()}
        setEndDate={jest.fn()}
        setValue={jest.fn()}
      />
    </BrowserRouter>
  );

  expect(
    screen.getByText("Seleccioná tu fecha de Reserva")
  ).toBeInTheDocument();
});
