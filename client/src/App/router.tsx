import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { UserDashboard } from '../features/user_dashboard/pages/UserDashboard';
import { GroupDashboard } from '../features/group_dashboard/pages/GroupDashboard';
import { SignUpPage } from '../features/auth/pages/SignUp';
import { BasicAppShell } from '../components/AppShell';


function RequireAuth() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<BasicAppShell />}>
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/group-dashboard" element={<GroupDashboard />} />
          </Route>
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}