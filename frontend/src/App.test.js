import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("renders app shell", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen.getByText("©2022 Digital Booking")).toBeInTheDocument();
});
