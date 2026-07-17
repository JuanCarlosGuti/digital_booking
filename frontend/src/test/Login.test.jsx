import Login from "../components/Body/Login/Login";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { withProviders } from "./testUtils";

test("should render component", () => {
  render(withProviders(<Login />));

  expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
});
