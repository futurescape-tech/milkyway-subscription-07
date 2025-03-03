
// Keycloak service adapter using custom API
import { toast } from "sonner";

// API configuration
const API_URL = 'https://societybackend.cubeone.in/api/login';

// Store token information
let authToken: string | null = null;
let tokenParsed: any = null;
let authenticated = false;

// Helper functions for authentication
export const login = async (username: string, password: string) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    
    // Store token information
    authToken = data.token || data.access_token;
    tokenParsed = parseJwt(authToken);
    authenticated = true;
    
    // Store token in localStorage for persistence
    localStorage.setItem('auth_token', authToken);
    localStorage.setItem('username', username);
    
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    toast.error(error instanceof Error ? error.message : 'Login failed');
    return { success: false, error };
  }
};

export const logout = () => {
  // Clear stored tokens
  authToken = null;
  tokenParsed = null;
  authenticated = false;
  localStorage.removeItem('auth_token');
  localStorage.removeItem('username');
  window.location.href = '/login';
};

export const initKeycloak = () => {
  // Check if token exists in localStorage
  const storedToken = localStorage.getItem('auth_token');
  if (storedToken) {
    try {
      authToken = storedToken;
      tokenParsed = parseJwt(storedToken);
      authenticated = true;
      return Promise.resolve(true);
    } catch (e) {
      // Token invalid, clear it
      localStorage.removeItem('auth_token');
      localStorage.removeItem('username');
    }
  }
  return Promise.resolve(false);
};

export const isLoggedIn = () => authenticated;

export const getToken = () => authToken;

export const updateToken = () => {
  // This function would implement token refresh logic
  // For now, just return the current token
  return Promise.resolve(!!authToken);
};

export const getUsername = () => {
  return localStorage.getItem('username') || tokenParsed?.preferred_username;
};

export const hasRole = (roles: string[]) => {
  // Implement role checking if your token includes roles
  // For this example, just return true for now
  return true;
};

// Helper function to parse JWT token
function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

// Create a fake Keycloak-like object for compatibility
const keycloak = {
  token: authToken,
  tokenParsed,
  authenticated,
  login,
  logout,
  init: initKeycloak,
  updateToken,
  hasRealmRole: () => true,
};

export default keycloak;
