// Formato de sesión compartido entre AuthContext (lo escribe/lee para el estado de React)
// y fetchService (lo lee para agregar el header Authorization) — un solo lugar para la clave
// de localStorage evita que ambos se desincronicen.
const STORAGE_KEY = "cesartravel.session";

export function readSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}
