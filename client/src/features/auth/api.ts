import type { AuthUser, LoginCredentials, SignUpFormData } from './types';

const API_BASE = '/api';

export async function fetchCurrentUser(): Promise<AuthUser> {
  const res = await fetch(`${API_BASE}/users/me`, { credentials: 'include' });

  if (!res.ok) {
    throw new Error('Could not load user profile');
  }

  return (await res.json()) as AuthUser;
}

export async function logoutRequest(): Promise<void> {
  await fetch(`${API_BASE}/auth/logout`, { method: 'POST', credentials: 'include' });
}

export async function loginRequest({ username, password }: LoginCredentials): Promise<AuthUser> {
  const res = await fetch(`${API_BASE}/auth/token`, {
    method: 'POST',
    credentials: 'include',
    body: new URLSearchParams({ username, password }),
  });

  if (!res.ok) {
    throw new Error(res.status === 401 ? 'Invalid username or password' : 'Login failed');
  }

  return fetchCurrentUser();
}

export async function signUpRequest(signUpData: SignUpFormData): Promise<AuthUser> {
  const response = await fetch(`${API_BASE}/auth/`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signUpData),
  });

  if (!response.ok) {
    throw new Error('Sign up failed');
  }

  // Signup may not set the cookie, so log in to guarantee a session.
  return loginRequest({ username: signUpData.username, password: signUpData.password });
}