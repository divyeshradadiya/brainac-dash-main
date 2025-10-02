import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedAdminRoute() {
  const token = localStorage.getItem('brainac_admin_token');
  
  if (!token) {
    // Redirect to admin login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
