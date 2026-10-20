import type { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '../styles.css';
import { AuthProvider } from '../features/auth/AuthProvider';

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MantineProvider>
      <Notifications />
      <AuthProvider>{children}</AuthProvider>
    </MantineProvider>
  );
}