import ProductHeader from "../components/Body/Product/ProductHeader/index";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import { sampleCategory, sampleProduct } from "./fixtures";

test("should render component", () => {
  render(
    <BrowserRouter>
      <ProductHeader category={sampleCategory} product={sampleProduct} />
    </BrowserRouter>
  );

  expect(screen.getByText(sampleProduct.title)).toBeInTheDocument();
});
