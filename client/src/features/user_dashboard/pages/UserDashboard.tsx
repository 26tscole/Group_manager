import { useAuth } from '../../auth/hooks/useAuth';
import { Center, Grid, Paper, Text } from '@mantine/core';

export function UserDashboard() {
  const { user } = useAuth();

  return (
    <main className="page-shell">
      <section className="auth-card dashboard-card">
        <Center>
          <p className="subtitle">
            Welcome, <strong>{user?.first_name}</strong> ({user?.phone_number}).
          </p>
        </Center>
        <Grid grow gap={{ base: 5, xs: 'md', md: 'xl', xl: 10 }}>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}><Paper shadow="xs" p="xl">
            <Text>Paper is the most basic ui component</Text>
            <Text>
              Use it to create cards, dropdowns, modals and other components that require background
              with shadow
            </Text>
          </Paper></Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}><Paper shadow="xs" p="xl">
            <Text>Another Paper component</Text>
            <Text>
              You can use multiple Paper components to create a grid of cards or sections within your dashboard.
            </Text>
          </Paper></Grid.Col>

        </Grid>
        <Center>
        </Center>
      </section>
    </main>
  );
}
