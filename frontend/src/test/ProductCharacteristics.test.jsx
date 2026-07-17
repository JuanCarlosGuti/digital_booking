import ProductCharacteristics from "../components/Body/Product/ProductCharacteristics";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { sampleFeature } from "./fixtures";

test("renders each feature passed in", () => {
  render(<ProductCharacteristics features={[sampleFeature]} />);

  expect(screen.getByText("¿Qué ofrece este lugar?")).toBeInTheDocument();
  expect(screen.getByText(sampleFeature.name)).toBeInTheDocument();
});

test("renders nothing when there are no features", () => {
  const { container } = render(<ProductCharacteristics features={[]} />);

  expect(container).toBeEmptyDOMElement();
});
