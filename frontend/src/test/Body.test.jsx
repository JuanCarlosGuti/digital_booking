import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi, test, expect } from "vitest";

vi.mock("../components/Body/SearchBar/SearchBar", () => ({ default: () => <div>SearchBar</div> }));
vi.mock("../components/Body/CategoryList/CategoryList", () => ({ default: () => <div>CategoryList</div> }));
vi.mock("../components/Body/ProductList/ProductList", () => ({ default: () => <div>ProductList</div> }));

import Body from "../components/Body/Body";

test("should render component", () => {
  render(
    <BrowserRouter>
      <Body />
    </BrowserRouter>
  );

  expect(screen.getByText("SearchBar")).toBeInTheDocument();
  expect(screen.getByText("CategoryList")).toBeInTheDocument();
  expect(screen.getByText("ProductList")).toBeInTheDocument();
});
