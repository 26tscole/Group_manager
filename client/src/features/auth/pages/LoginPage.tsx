import { useState, type SubmitEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { TextInput } from '@mantine/core';
import { AuthForm } from '../components/AuthForm';
import { notifications } from '@mantine/notifications';

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
      const message = err instanceof Error ? err.message : 'Sign up failed';
      setError(message);
      notifications.show({ title: 'Error', message, color: 'red' });
    } finally {
      setSubmitting(false);
    }
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthForm
      title="Group Manager"
      legend="Login Information"
      submitLabel="Sign in"
      submittingLabel="Signing in…"
      submitting={submitting}
      error={error}
      onSubmit={handleSubmit}
      maxWidth={480}
      footer={
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      }
    >
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
    </AuthForm>
  );
}
