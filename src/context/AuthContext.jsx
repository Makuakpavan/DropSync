import { useMemo, useState } from "react";
import {
  getDashboardPathForRole,
  getStoredRole,
  isAuthenticated,
  setSession,
  clearSession,
} from "../utils/auth";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => ({
    isAuthenticated: isAuthenticated(),
    role: getStoredRole(),
  }));

  const login = (token, role) => {
    setSession(token, role);
    setAuthState({ isAuthenticated: true, role });
  };

  const logout = () => {
    clearSession();
    setAuthState({ isAuthenticated: false, role: "customer" });
  };

  const value = useMemo(
    () => ({
      isAuthenticated: authState.isAuthenticated,
      role: authState.role,
      login,
      logout,
      getDashboardPath: () => getDashboardPathForRole(authState.role || "customer"),
    }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

