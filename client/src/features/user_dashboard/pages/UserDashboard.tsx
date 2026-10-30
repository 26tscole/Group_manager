import { useAuth } from '../../auth/hooks/useAuth';
import { Center, Grid, } from '@mantine/core';
import { UserInfoCard } from '../components/UserInfoCard';

export function UserDashboard() {
  const { user } = useAuth();

  return (
    <main className="page-shell">
      <section className="auth-card dashboard-card">
        <Center>
          <p className="subtitle">
            Welcome, <strong>{user?.first_name}</strong>
          </p>
        </Center>
        <Grid gap={{ base: 5, xs: 'md', md: 'xl', xl: 10 }}>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <UserInfoCard />
          </Grid.Col>
        </Grid>
        <Center>
        </Center>
      </section>
    </main>
  );
}
