import CategoryList from "../components/Body/CategoryList/CategoryList";
import { render, screen } from "@testing-library/react";

test("renders category heading", () => {
  render(<CategoryList />);
  expect(
    screen.getByText("Buscar por tipo de alojamiento")
  ).toBeInTheDocument();
});
