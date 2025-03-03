
import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";

// Supabase public URL and anon key
const supabaseUrl = 'https://societybackend.cubeone.in/api';
const supabaseAnonKey = 'public-key'; // This would typically be a public key

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
  }
});

// Authentication functions
export const login = async (username: string, password: string) => {
  try {
    // Since we're using a custom API, we'll implement it manually
    const response = await fetch(`${supabaseUrl}/login`, {
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
    const authToken = data.token || data.access_token;
    
    // Store token in localStorage for persistence
    localStorage.setItem('auth_token', authToken);
    localStorage.setItem('username', username);
    
    // Update Supabase session (if needed)
    // This is a simplified approach - normally Supabase would handle sessions internally
    
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    toast.error(error instanceof Error ? error.message : 'Login failed');
    return { success: false, error };
  }
};

export const logout = () => {
  // Clear stored tokens
  localStorage.removeItem('auth_token');
  localStorage.removeItem('username');
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('auth_token');
};

export const getToken = () => {
  return localStorage.getItem('auth_token');
};

export const getUsername = () => {
  return localStorage.getItem('username');
};

export const refreshSession = async () => {
  // In a real implementation, this would check if the token is valid
  // and refresh it if needed
  return !!localStorage.getItem('auth_token');
};
