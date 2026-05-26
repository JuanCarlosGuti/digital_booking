import NotFound from "../components/NotFound/index";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("should render component", () => {
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );

  expect(screen.getByText("404")).toBeInTheDocument();
});
