
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/KeycloakProvider';

const Login = () => {
  const { isAuthenticated, login, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="container mx-auto px-4 h-screen flex items-center justify-center">
      <div className="apple-card max-w-md w-full p-8 flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-semibold apple-header">Welcome to OneMilk</h1>
        <p className="text-muted-foreground apple-text text-center">
          Please sign in to access your account and explore our products.
        </p>
        <div className="w-full mt-6">
          <Button 
            className="w-full apple-button h-12 bg-primary hover:bg-primary/90 apple-transition"
            onClick={login}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Sign in with Keycloak'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
