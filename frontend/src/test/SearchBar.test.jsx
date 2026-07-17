
import SearchBar from "../components/Body/SearchBar/SearchBar";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("should render component", () => {
  render(
    <BrowserRouter>
      <SearchBar />
    </BrowserRouter>
  );

  expect(screen.getByText("Buscar")).toBeInTheDocument();
});
