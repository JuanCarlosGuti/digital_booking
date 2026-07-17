import BookingCalendar from "../components/Body/Booking/BookingCalendar";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";

test("should render component", () => {
  render(
    <BrowserRouter>
      <BookingCalendar productId={1} setStartDate={vi.fn()} setEndDate={vi.fn()} />
    </BrowserRouter>
  );

  expect(screen.getByText("Seleccioná tu fecha de Reserva")).toBeInTheDocument();
});
