import Footer from "../components/Footer/Footer";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";

test("should render component", () => {
  render(<Footer />);

  expect(screen.getByText(/Cesar Travel/)).toBeInTheDocument();
});
