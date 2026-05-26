
import BookingForm from "../components/Body/Booking/BookingForm";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { sampleCity } from "./fixtures";

test("should render component", () => {
  render(
    <BrowserRouter>
      <BookingForm city={sampleCity} />
    </BrowserRouter>
  );

  expect(screen.getByText("Completá tus datos")).toBeInTheDocument();
});
