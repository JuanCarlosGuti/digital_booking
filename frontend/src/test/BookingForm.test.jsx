import BookingForm from "../components/Body/Booking/BookingForm";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { withProviders } from "./testUtils";
import { sampleCity, sampleSession } from "./fixtures";

test("should render component", () => {
  render(withProviders(<BookingForm city={sampleCity} />, { session: sampleSession }));

  expect(screen.getByText("Completá tus datos")).toBeInTheDocument();
  expect(screen.getByDisplayValue(sampleSession.name)).toBeInTheDocument();
});
