import Login from "../components/Body/Login/Login";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EmailContext from "../context/Context";

test("should render component", () => {
  render(
    <BrowserRouter>
      <EmailContext.Provider value={{ email: "", setEmail: jest.fn() }}>
        <Login />
      </EmailContext.Provider>
    </BrowserRouter>
  );

  expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
});





