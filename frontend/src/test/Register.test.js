
import Register from "../components/Body/Register/Register";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("should render component", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  expect(screen.getByText("Crear Cuenta")).toBeInTheDocument();
});
