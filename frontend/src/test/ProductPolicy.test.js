
import ProductPolicy from "../components/Body/Product/ProductPolicy";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { samplePolicies } from "./fixtures";

test("should render component", () => {
  render(
    <BrowserRouter>
      <ProductPolicy
        policy1={samplePolicies.policy1}
        policy2={samplePolicies.policy2}
        policy3={samplePolicies.policy3}
      />
    </BrowserRouter>
  );

  expect(screen.getByText("Qué tenés que saber")).toBeInTheDocument();
});
