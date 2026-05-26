import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

jest.mock("../components/Body/SearchBar/SearchBar", () => () => (
  <div>SearchBar</div>
));
jest.mock("../components/Body/CategoryList/CategoryList", () => () => (
  <div>CategoryList</div>
));
jest.mock("../components/Body/ProductList/ProductList", () => () => (
  <div>ProductList</div>
));

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
