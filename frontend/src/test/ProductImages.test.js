
import ProductImages from "../components/Body/Product/ProductImages";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { sampleProduct } from "./fixtures";

test("should render component", async () => {
  const { container, rerender } = render(
    <BrowserRouter>
      <ProductImages product={{ images: [] }} />
    </BrowserRouter>
  );

  rerender(
    <BrowserRouter>
      <ProductImages product={sampleProduct} />
    </BrowserRouter>
  );

  await waitFor(() => {
    const mainImage = container.querySelector(
      ".MainContainerProductImages_imgPpal"
    );
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute("src", sampleProduct.images[0].url);
  });

  expect(
    screen.getByRole("button", { name: /ver más/i })
  ).toBeInTheDocument();
});
