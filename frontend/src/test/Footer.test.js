import Footer from "../components/Footer/Footer";
import { render, screen } from "@testing-library/react";

test("should render component", () => {
  render(<Footer />);

  expect(screen.getByText("©2022 Digital Booking")).toBeInTheDocument();
});
