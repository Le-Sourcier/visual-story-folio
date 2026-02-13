import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore, selectIsAuthenticated } from '@/stores/authStore';
import { getToken } from '@/services/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const storeToken = useAuthStore((s) => s.token);
  const location = useLocation();

  // Check Zustand store token OR localStorage token (from api client)
  const apiToken = getToken();
  const hasValidToken = !!(storeToken || apiToken);

  if (!isAuthenticated && !hasValidToken) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
