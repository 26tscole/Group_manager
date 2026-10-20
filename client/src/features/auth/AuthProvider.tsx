import { createContext, useState, type ReactNode } from 'react';
import { loginRequest, signUpRequest } from './api';
import type { AuthUser, LoginCredentials, SignUpFormData } from './types';

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
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
  const [token, setToken] = useState<string | null>(null);

  async function login(credentials: LoginCredentials) {
    const session = await loginRequest(credentials);
    setToken(session.token);
    setUser(session.user);
  }

  async function signUp(signUpData: SignUpFormData) {
    const session = await signUpRequest(signUpData);
    setToken(session.token);
    setUser(session.user);
  }

  async function logout() {
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
