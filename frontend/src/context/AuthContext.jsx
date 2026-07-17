import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { clearSession, readSession, writeSession } from "../services/authStorage";
import { parseJwt } from "../services/fetchService";

const AuthContext = createContext(null);

function sessionFromToken(token) {
  const claims = parseJwt(token);
  return {
    token,
    id: claims.id,
    name: claims.name,
    lastname: claims.lastname,
    email: claims.sub,
    role: claims.role,
  };
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  const login = useCallback((token) => {
    const nextSession = sessionFromToken(token);
    writeSession(nextSession);
    setSession(nextSession);
    return nextSession;
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      isAdmin: session?.role === "ADMIN",
      login,
      logout,
    }),
    [session, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }
  return context;
}
