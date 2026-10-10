import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { Center } from '@mantine/core';

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <main className="page-shell">
      <section className="auth-card dashboard-card">
        <Center>
          <p className="eyebrow">YOUR WORKSPACE</p>
        </Center>
        <Center>
          <h1>You’re signed in</h1>
        </Center>
        <Center>
          <p className="subtitle">
            Welcome, <strong>{user?.first_name}</strong> ({user?.phone_number}).
          </p>
        </Center>
        <Center>
          <button className="secondary-button" type="button" onClick={handleLogout}>
            Sign out
          </button>
        </Center>
      </section>
    </main>
  );
}
