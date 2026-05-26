
import ProductHeader from "../components/Body/Product/ProductHeader/index";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { sampleCategory, sampleProduct } from "./fixtures";

test("should render component", () => {
  render(
    <BrowserRouter>
      <ProductHeader category={sampleCategory} product={sampleProduct} />
    </BrowserRouter>
  );

  expect(screen.getByText(sampleProduct.name)).toBeInTheDocument();
});
