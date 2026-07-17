import BookingDetails from "../components/Body/Booking/BookingDetails";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import { sampleCity, sampleProduct } from "./fixtures";

test("should render component", () => {
  render(
    <BrowserRouter>
      <BookingDetails
        product={sampleProduct}
        city={sampleCity}
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-01-02")}
        hour="10:00 AM"
      />
    </BrowserRouter>
  );

  expect(screen.getByText("Detalle de la reserva")).toBeInTheDocument();
});
