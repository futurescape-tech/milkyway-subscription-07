
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/providers/KeycloakProvider';
import { supabase } from '@/services/supabase';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, refresh } = useAuth();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const isAuth = !!data.session;
        setAuthorized(isAuth);
        
        if (isAuth) {
          // Refresh the auth context to update user info
          await refresh();
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setAuthorized(false);
      } finally {
        setChecking(false);
      }
    };

    if (!isLoading) {
      if (isAuthenticated) {
        setAuthorized(true);
        setChecking(false);
      } else {
        checkAuth();
      }
    }
  }, [isLoading, isAuthenticated, refresh]);

  if (isLoading || checking) {
    // You can show a loading spinner here if needed
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!authorized) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
