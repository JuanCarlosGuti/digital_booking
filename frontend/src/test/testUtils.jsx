import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { writeSession } from "../services/authStorage";

/** Envuelve un componente con Router + AuthProvider, opcionalmente ya autenticado
 * (pre-cargando la sesión en localStorage antes del render, como haría un usuario real). */
export function withProviders(children, { session } = {}) {
  if (session) {
    writeSession(session);
  }
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
}
