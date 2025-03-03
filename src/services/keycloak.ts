
import Keycloak from 'keycloak-js';

// Initialize Keycloak instance
const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080/auth',
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'your-realm',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'your-client-id'
};

// Initialize Keycloak
const keycloak = new Keycloak(keycloakConfig);

// Export initialized Keycloak instance
export default keycloak;

// Helper functions for authentication
export const initKeycloak = () => {
  return keycloak.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
  });
};

export const login = () => keycloak.login();
export const logout = () => keycloak.logout();
export const isLoggedIn = () => !!keycloak.token;
export const getToken = () => keycloak.token;
export const updateToken = (minValidity: number) => keycloak.updateToken(minValidity);
export const getUsername = () => keycloak.tokenParsed?.preferred_username;
export const hasRole = (roles: string[]) => roles.some((role) => keycloak.hasRealmRole(role));
