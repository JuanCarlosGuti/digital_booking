// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

jest.mock("./services/fetchService", () => ({
  getAllCities: jest.fn().mockResolvedValue([]),
  getAllCategory: jest.fn().mockResolvedValue([]),
  getAllProducts: jest.fn().mockResolvedValue([]),
  getFeaturesByProduct: jest.fn().mockResolvedValue([]),
  getBookingDates: jest.fn().mockResolvedValue([]),
  postBooking: jest.fn().mockResolvedValue({}),
  authenticateUser: jest.fn(() =>
    Promise.resolve({ status: 401, json: async () => ({}) })
  ),
  postUser: jest.fn(() => Promise.resolve({ status: 201 })),
  parseJwt: jest.fn(() => ({
    id: 1,
    rol: "USER",
    name: "Test",
    lastname: "User",
  })),
}));

jest.mock("react-date-range", () => {
  const React = require("react");
  return {
    DateRangePicker: () =>
      React.createElement("div", { "data-testid": "date-range" }),
  };
});

if (!require.context) {
  require.context = () => {
    const context = (key) => key;
    context.keys = () => [];
    return context;
  };
}

if (!window.matchMedia) {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}

beforeEach(() => {
  const user = {
    id: 1,
    rol: "USER",
    name: "Test",
    lastname: "User",
    email: "test@example.com",
  };
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.user = JSON.stringify(user);
  localStorage.setItem("prevUrl", "");
});

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});
