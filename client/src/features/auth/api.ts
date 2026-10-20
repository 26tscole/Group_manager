import type { AuthSession, AuthUser, LoginCredentials, SignUpFormData } from './types';

const API_BASE = '/api';

export async function loginRequest({ username, password }: LoginCredentials): Promise<AuthSession> {
  const tokenResponse = await fetch(`${API_BASE}/auth/token`, {
    method: 'POST',
    body: new URLSearchParams({ username, password }),
  });

  if (!tokenResponse.ok) {
    throw new Error(tokenResponse.status === 401 ? 'Invalid username or password' : 'Login failed');
  }

  const { access_token: token } = (await tokenResponse.json()) as { access_token: string };

  const userResponse = await fetch(`${API_BASE}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!userResponse.ok) {
    throw new Error('Could not load user profile');
  }

  return { token, user: (await userResponse.json()) as AuthUser };
}

export async function signUpRequest(signUpData: SignUpFormData): Promise<AuthSession> {
  const response = await fetch(`${API_BASE}/auth/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signUpData),
  });

  if (!response.ok) {
    throw new Error('Sign up failed');
  }

  return response.json() as Promise<AuthSession>;
}