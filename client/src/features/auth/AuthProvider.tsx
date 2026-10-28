import { createContext, useEffect, useState, type ReactNode } from 'react';
import { fetchCurrentUser, loginRequest, logoutRequest, signUpRequest } from './api';
import type { AuthUser, LoginCredentials, SignUpFormData } from './types';

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signUp: (signUpData: SignUpFormData) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore the session from the cookie on page load.
  useEffect(() => {
    fetchCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function login(credentials: LoginCredentials) {
    setUser(await loginRequest(credentials));
  }

  async function signUp(signUpData: SignUpFormData) {
    setUser(await signUpRequest(signUpData));
  }

  async function logout() {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
