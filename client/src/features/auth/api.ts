import type { AuthSession, AuthUser, LoginCredentials } from './types';

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