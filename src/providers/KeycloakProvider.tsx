
import React, { useState, useEffect, ReactNode } from 'react';
import keycloak, { initKeycloak } from '../services/keycloak';

interface KeycloakProviderProps {
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
}

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  username: undefined,
  login: () => {},
  logout: () => {},
  token: undefined,
  hasRole: () => false,
});

export const KeycloakProvider: React.FC<KeycloakProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initKeycloak()
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        setIsLoading(false);

        if (authenticated) {
          // Set up token refresh
          keycloak.onTokenExpired = () => {
            keycloak.updateToken(30).catch(() => {
              // If token refresh fails, log out
              keycloak.logout();
            });
          };
        }
      })
      .catch((error) => {
        console.error('Failed to initialize Keycloak', error);
        setIsLoading(false);
      });
  }, []);

  const login = () => keycloak.login();
  const logout = () => keycloak.logout();

  const contextValue: AuthContextType = {
    isAuthenticated,
    isLoading,
    username: keycloak.tokenParsed?.preferred_username,
    login,
    logout,
    token: keycloak.token,
    hasRole: (roles: string[]) => roles.some((role) => keycloak.hasRealmRole(role)),
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
    throw new Error('useAuth must be used within a KeycloakProvider');
  }
  return context;
};
