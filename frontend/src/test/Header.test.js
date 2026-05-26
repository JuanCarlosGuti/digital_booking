import Header from "../components/Header/Header";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EmailContext from "../context/Context";

test("should render component", () => {
  localStorage.removeItem("user");
  delete localStorage.user;

  render(
    <BrowserRouter>
      <EmailContext.Provider value={{ email: "", setEmail: jest.fn() }}>
        <Header />
      </EmailContext.Provider>
    </BrowserRouter>
  );

  expect(screen.getByText("Crear cuenta")).toBeInTheDocument();
});
