import { readSession } from "./authStorage";

// api-gateway (ver docs/ARCHITECTURE.md) — único punto de entrada al backend.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

async function apiFetch(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const session = readSession();
    if (session?.token) {
      headers.Authorization = `Bearer ${session.token}`;
    }
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || `Error ${response.status} al conectar con el servidor`);
  }

  return data;
}

// Auth ------------------------------------------------------------------

export const login = (email, password) =>
  apiFetch("/api/auth/login", { method: "POST", body: { email, password } });

// phone es opcional (celular colombiano 3XXXXXXXXX para WhatsApp) — si viene vacío se omite
// del body: el backend valida el formato con @Pattern solo cuando el campo está presente.
export const register = (name, lastname, email, password, phone) =>
  apiFetch("/api/auth/register", {
    method: "POST",
    body: { name, lastname, email, password, phone: phone || undefined },
  });

/** Resuelve nombre/email de un huésped por id, para mostrarlo en la vista de ocupantes del
 * propietario (auth-service expone esto para consumo entre servicios, ver docs/ARCHITECTURE.md;
 * cualquier usuario autenticado puede resolver cualquier id, no solo el dueño del inmueble). */
export const getUserById = (id) => apiFetch(`/api/auth/users/${id}`, { auth: true });

export const parseJwt = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
};

// Categorías / ciudades ---------------------------------------------------

export const getAllCategories = () => apiFetch("/api/categories");

export const getAllCities = () => apiFetch("/api/cities");

export const getAllFeatures = () => apiFetch("/api/features");

// Propiedades ---------------------------------------------------------------

export const getAllProducts = ({ categoryId, cityId } = {}) => {
  const params = new URLSearchParams();
  if (categoryId) params.set("categoryId", categoryId);
  if (cityId) params.set("cityId", cityId);
  const query = params.toString();
  return apiFetch(`/api/properties${query ? `?${query}` : ""}`);
};

export const getProduct = (id) => apiFetch(`/api/properties/${id}`);

export const getProductsByOwner = (ownerId) => apiFetch(`/api/properties/owner/${ownerId}`, { auth: true });

export const createProduct = (product) => apiFetch("/api/properties", { method: "POST", body: product, auth: true });

/** Ojo: el PUT reemplaza TODO, incluidas las imágenes — el body debe reenviar las existentes
 * como images: [{title, url}] o se borran (así funciona applyRequest en property-service). */
export const updateProduct = (id, product) =>
  apiFetch(`/api/properties/${id}`, { method: "PUT", body: product, auth: true });

export const deleteProduct = (id) => apiFetch(`/api/properties/${id}`, { method: "DELETE", auth: true });

/** Sube archivos de imagen reales para una propiedad ya creada (ver ADR-0005) — multipart, por
 * eso no usa apiFetch (que siempre serializa el body a JSON). */
export const uploadProductImages = async (productId, files) => {
  const session = readSession();
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const response = await fetch(`${API_URL}/api/properties/${productId}/images`, {
    method: "POST",
    headers: session?.token ? { Authorization: `Bearer ${session.token}` } : {},
    body: formData,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || `Error ${response.status} al subir las imágenes`);
  }
  return data;
};

// Reservas ------------------------------------------------------------------

export const createBooking = (productId, checkIn, checkOut) =>
  apiFetch("/api/bookings", { method: "POST", body: { productId, checkIn, checkOut }, auth: true });

export const getMyBookings = () => apiFetch("/api/bookings/mine", { auth: true });

/** Quién reservó un inmueble y cuándo — solo para el propietario (ver booking-service). */
export const getBookingsByProperty = (productId) =>
  apiFetch(`/api/bookings/property/${productId}`, { auth: true });

/** Fechas ya ocupadas, sin identidad del huésped — pública, para el calendario del detalle. */
export const getAvailability = (productId) => apiFetch(`/api/bookings/availability/${productId}`);

/** Ids de inmuebles con reservas solapadas en el rango (fechas yyyy-MM-dd) — pública, para
 * que la búsqueda por fechas excluya los no disponibles. */
export const getUnavailableProductIds = (from, to) =>
  apiFetch(`/api/bookings/unavailable?from=${from}&to=${to}`);

export const cancelBooking = (id) => apiFetch(`/api/bookings/${id}`, { method: "DELETE", auth: true });

// Reseñas -------------------------------------------------------------------

/** Solo permitido con una estadía ya finalizada en esa propiedad (403 si no; 409 si repite). */
export const createReview = (productId, rating, comment) =>
  apiFetch("/api/reviews", { method: "POST", body: { productId, rating, comment }, auth: true });

export const getReviewsByProperty = (productId) => apiFetch(`/api/reviews/property/${productId}`);

/** Promedio + cantidad por inmueble, batch — una sola llamada para todas las tarjetas. */
export const getReviewSummaries = (productIds) =>
  apiFetch(`/api/reviews/summary?productIds=${productIds.join(",")}`);

/** Ids de inmuebles que el usuario ya reseñó — para ocultar el botón en "mis reservas". */
export const getMyReviews = () => apiFetch("/api/reviews/mine", { auth: true });

// Chat interno huésped↔dueño (ver ADR-0009 — reemplaza el contacto por WhatsApp) ----------

/** Abre (o recupera) la conversación con el dueño del inmueble. */
export const openChat = (productId) =>
  apiFetch("/api/chats", { method: "POST", body: { productId }, auth: true });

export const getMyChats = () => apiFetch("/api/chats", { auth: true });

export const getChatMessages = (chatId) => apiFetch(`/api/chats/${chatId}/messages`, { auth: true });

export const sendChatMessage = (chatId, body) =>
  apiFetch(`/api/chats/${chatId}/messages`, { method: "POST", body: { body }, auth: true });

export const markChatRead = (chatId) => apiFetch(`/api/chats/${chatId}/read`, { method: "POST", auth: true });

/** Total de mensajes sin leer — para el badge de "Mensajes" en el header. */
export const getUnreadCount = () => apiFetch("/api/chats/unread-count", { auth: true });
