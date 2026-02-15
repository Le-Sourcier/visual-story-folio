import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from '@/services/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();

  // The real token in localStorage is the single source of truth
  const apiToken = getToken();

  if (!apiToken) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
