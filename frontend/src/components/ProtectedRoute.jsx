import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/** Antes, /admin y /:userId/bookings eran rutas abiertas que solo se escondían en el menú
 * (ver docs/adr — deuda del frontend original). Esto sí bloquea la navegación de verdad. */
export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/home" replace />;
  }
  return children;
}
