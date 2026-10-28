import { AppShell, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

export function BasicAppShell() {
    const [opened, { toggle }] = useDisclosure();
    const { logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate('/login', { replace: true });
    }

    const navItems = [
        { label: 'User Dashboard', to: '/user-dashboard' },
        { label: 'Group Dashboard', to: '/group-dashboard' },
    ];

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    Group Manager
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        component={Link}
                        to={item.to}
                        label={item.label}
                        active={location.pathname === item.to}
                        onClick={toggle}
                    />
                ))}
                <button className="secondary-button" type="button" onClick={handleLogout}>
                    Sign out
                </button>
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}