import ProductCalendar from "../components/Body/Product/ProductCalendar";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { withProviders } from "./testUtils";

test("should render component", () => {
  render(withProviders(<ProductCalendar productId={1} />));

  expect(screen.getByText("Fechas disponibles")).toBeInTheDocument();
});
