
import ProductCalendar from "../components/Body/Product/ProductCalendar";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { sampleProduct } from "./fixtures";

test("should render component", () => {
  render(
    <BrowserRouter>
      <ProductCalendar product={sampleProduct} setValue={jest.fn()} />
    </BrowserRouter>
  );

  expect(screen.getByText("Fechas disponibles")).toBeInTheDocument();
});
