
import ProductLocation from "../components/Body/Product/ProductLocation";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { sampleCity } from "./fixtures";

test("should render component", () => {
  render(
    <BrowserRouter>
      <ProductLocation city={sampleCity} />
    </BrowserRouter>
  );

  expect(
    screen.getByText(`${sampleCity.city}, ${sampleCity.department}`)
  ).toBeInTheDocument();
});
