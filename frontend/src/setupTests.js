import "@testing-library/jest-dom";
import { afterEach, beforeEach, vi } from "vitest";

vi.mock("./services/fetchService", () => ({
  getAllCities: vi.fn().mockResolvedValue([]),
  getAllCategories: vi.fn().mockResolvedValue([]),
  getAllFeatures: vi.fn().mockResolvedValue([]),
  getAllProducts: vi.fn().mockResolvedValue([]),
  getProduct: vi.fn().mockResolvedValue({}),
  getProductsByOwner: vi.fn().mockResolvedValue([]),
  createProduct: vi.fn().mockResolvedValue({}),
  createBooking: vi.fn().mockResolvedValue({}),
  getMyBookings: vi.fn().mockResolvedValue([]),
  getBookingsByProperty: vi.fn().mockResolvedValue([]),
  getAvailability: vi.fn().mockResolvedValue([]),
  cancelBooking: vi.fn().mockResolvedValue(null),
  getUserById: vi.fn().mockResolvedValue({}),
  updateProduct: vi.fn().mockResolvedValue({}),
  deleteProduct: vi.fn().mockResolvedValue(null),
  uploadProductImages: vi.fn().mockResolvedValue({}),
  getUnavailableProductIds: vi.fn().mockResolvedValue([]),
  createReview: vi.fn().mockResolvedValue({}),
  getReviewsByProperty: vi.fn().mockResolvedValue([]),
  getReviewSummaries: vi.fn().mockResolvedValue([]),
  getMyReviews: vi.fn().mockResolvedValue([]),
  openChat: vi.fn().mockResolvedValue({ id: 1 }),
  getMyChats: vi.fn().mockResolvedValue([]),
  getChatMessages: vi.fn().mockResolvedValue([]),
  sendChatMessage: vi.fn().mockResolvedValue({}),
  markChatRead: vi.fn().mockResolvedValue(null),
  getUnreadCount: vi.fn().mockResolvedValue({ unread: 0 }),
  login: vi.fn().mockRejectedValue(new Error("Credenciales inválidas")),
  register: vi.fn().mockResolvedValue({}),
  parseJwt: vi.fn(() => ({
    id: 1,
    role: "USER",
    name: "Test",
    lastname: "User",
    sub: "test@example.com",
  })),
}));

vi.mock("react-date-range", () => ({
  DateRangePicker: () => null,
  DateRange: () => null,
}));

if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});
