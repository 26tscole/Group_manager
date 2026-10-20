import { useState, type SubmitEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { TextInput } from '@mantine/core';
import { AuthForm } from '../components/AuthForm';
import { notifications } from '@mantine/notifications';
import type { SignUpFormData } from '../types';

export function SignUpPage() {
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const signUpData: SignUpFormData = {
      email: String(form.get('email')),
      username: String(form.get('username')),
      password: String(form.get('password')),
      first_name: String(form.get('first_name')),
      last_name: String(form.get('last_name')),
      date_of_birth: String(form.get('date_of_birth')),
      phone_number: String(form.get('phone_number')),
      address: String(form.get('address')),
    };
    setError('');
    setSubmitting(true);

    try {
      await signUp({
        username: signUpData.username,
        password: signUpData.password,
        email: signUpData.email,
        first_name: signUpData.first_name,
        last_name: signUpData.last_name,
        date_of_birth: signUpData.date_of_birth,
        phone_number: signUpData.phone_number,
        address: signUpData.address,
      });
      navigate('/login', { replace: true });
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
      title="Create Group Account"
      legend="Sign Up Information"
      submitLabel="Sign up"
      submittingLabel="Signing up…"
      submitting={submitting}
      error={error}
      onSubmit={handleSubmit}
      maxWidth={480}
      footer={
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      }
    >
      <TextInput
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        autoComplete="email"
        required
      />
      <TextInput
        id="username"
        name="username"
        type="text"
        label="Username"
        placeholder="Enter your username"
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
      <TextInput
        id="firstName"
        name="first_name"
        type="text"
        label="First Name"
        placeholder="Enter your first name"
        autoComplete="given-name"
        required
      />
      <TextInput
        id="lastName"
        name="last_name"
        type="text"
        label="Last Name"
        placeholder="Enter your last name"
        autoComplete="family-name"
        required
      />
      <TextInput
        id="date"
        name="date_of_birth"
        type="date"
        label="Date of Birth"
        placeholder="Enter your date of birth"
        autoComplete="bday"
        required
      />
      <TextInput
        id="phone"
        name="phone_number"
        type="tel"
        label="Phone Number"
        placeholder="Enter your phone number"
        autoComplete="tel"
        required
      />
      <TextInput
        id="address"
        name="address"
        type="text"
        label="Address"
        placeholder="Enter your address"
        autoComplete="street-address"
        required
      />
    </AuthForm>
  );
}
