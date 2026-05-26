
import ProductCharacteristics from "../components/Body/Product/ProductCharacteristics";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

test("should render component", () => {
  render(
    <MemoryRouter initialEntries={["/products/1"]}>
      <Routes>
        <Route path="/products/:id" element={<ProductCharacteristics />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText("Cargando")).toBeInTheDocument();
});
