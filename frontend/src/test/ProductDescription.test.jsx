import ProductDescription from "../components/Body/Product/ProductDescription";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { sampleProduct } from "./fixtures";

test("should render component", () => {
  render(
    <BrowserRouter>
      <ProductDescription product={sampleProduct} />
    </BrowserRouter>
  );

  expect(screen.getByText(sampleProduct.title)).toBeInTheDocument();
});
