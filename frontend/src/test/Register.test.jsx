import Register from "../components/Body/Register/Register";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";

test("should render component", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  expect(screen.getByRole("button", { name: "Crear Cuenta" })).toBeInTheDocument();
});
