import type { ReactNode, SubmitEvent } from 'react';
import { Button, Center, Fieldset, Paper } from '@mantine/core';

type AuthFormProps = {
  title: string;
  legend: string;
  submitLabel: string;
  submittingLabel: string;
  submitting: boolean;
  error?: string;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void | Promise<void>;
  maxWidth?: number;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthForm({
  title,
  legend,
  submitLabel,
  submittingLabel,
  submitting,
  onSubmit,
  maxWidth = 640,
  children,
  footer,
}: AuthFormProps) {
  return (
    <main className="page-shell">
      <section className="auth-card" aria-labelledby="auth-title">
        <Center>
          <h1 id="auth-title">{title}</h1>
        </Center>
        <Center>
          <Paper shadow="xs" p="xl" w="100%" maw={maxWidth}>
            <form className="login-form" onSubmit={onSubmit} style={{ width: '100%' }}>
              <Fieldset legend={legend}>{children}</Fieldset>
              <Button type="submit" mt="md" disabled={submitting}>
                {submitting ? submittingLabel : submitLabel}
              </Button>
              {footer}
            </form>
          </Paper>
        </Center>
      </section>
    </main>
  );
}
