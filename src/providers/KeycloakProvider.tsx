
import React, { useState, useEffect, ReactNode } from 'react';
import { isAuthenticated, logout, getUsername, getToken, refreshSession } from '../services/supabase';

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  username: string | undefined;
  login: () => void;
  logout: () => void;
  token: string | undefined;
  hasRole: (roles: string[]) => boolean;
  refresh: () => Promise<boolean>;
}

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  username: undefined,
  login: () => {},
  logout: () => {},
  token: undefined,
  hasRole: () => false,
  refresh: async () => false,
});

export const KeycloakProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    const isAuth = isAuthenticated();
    setAuthenticated(isAuth);
    setIsLoading(false);
    return isAuth;
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const refresh = async () => {
    try {
      const result = await refreshSession();
      setAuthenticated(result);
      return result;
    } catch (error) {
      console.error('Failed to refresh authentication', error);
      return false;
    }
  };

  const contextValue: AuthContextType = {
    isAuthenticated: authenticated,
    isLoading,
    username: getUsername(),
    login: () => {}, // This is handled in the Login component
    logout: () => logout(),
    token: getToken(),
    hasRole: () => true, // Simplified role check
    refresh,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
