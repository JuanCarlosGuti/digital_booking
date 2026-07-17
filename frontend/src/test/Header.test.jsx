import Header from "../components/Header/Header";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { withProviders } from "./testUtils";
import { sampleSession } from "./fixtures";

test("shows auth buttons when logged out", () => {
  render(withProviders(<Header />));

  expect(screen.getByText("Crear cuenta")).toBeInTheDocument();
  expect(screen.getAllByText("Iniciar sesión").length).toBeGreaterThan(0);
});

test("shows the user's name and nav links when logged in", () => {
  render(withProviders(<Header />, { session: sampleSession }));

  expect(screen.getByText("Publicar propiedad")).toBeInTheDocument();
  expect(screen.getByText("Mis Reservas")).toBeInTheDocument();
  expect(screen.getByText(`${sampleSession.name} ${sampleSession.lastname}`)).toBeInTheDocument();
});
