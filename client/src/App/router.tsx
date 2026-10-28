import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { DashboardPage } from '../features/user_dashboard/pages/DashboardPage';
import { SignUpPage } from '../features/auth/pages/SignUp';


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
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}