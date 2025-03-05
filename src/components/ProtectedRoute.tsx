
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/providers/KeycloakProvider';
import { supabase } from '@/services/supabase';
import { toast } from 'sonner';

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
        toast.error("Authentication error. Please try logging in again.");
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

  // For development purposes, we'll bypass authentication if in development mode
  // This allows you to see the app without being authenticated
  if (import.meta.env.DEV) {
    console.log("Development mode: bypassing authentication");
    return <>{children}</>;
  }

  if (isLoading || checking) {
    // Show loading spinner with a message
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600">Loading application...</p>
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
