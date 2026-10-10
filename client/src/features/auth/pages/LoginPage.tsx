import { useState, type SubmitEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Fieldset, TextInput, Button, Center } from '@mantine/core';


export function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError('');
    setSubmitting(true);

    try {
      await login({
        username: String(form.get('username')),
        password: String(form.get('password')),
      });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="page-shell">
      <section className="auth-card" aria-labelledby="login-title">
        <Center>
          <h1 id="login-title">Welcome to Group Manager</h1>
        </Center>
        <Center>
          <form className="login-form" onSubmit={handleSubmit}>
            <Fieldset legend="Login Information">
              <TextInput
                id="username"
                name="username"
                type="text"
                label="Username"
                placeholder="Enter your username"
                autoComplete="username"
                required
              />
              <TextInput
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="Enter any password"
                autoComplete="current-password"
                required
              />
            </Fieldset>

            {error && <p className="form-error" role="alert">{error}</p>}

            <Button type="submit" disabled={submitting}>
              {submitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </Center>
      </section>
    </main>
  );
}
