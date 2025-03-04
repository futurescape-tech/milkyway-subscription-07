
import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";

// Supabase public URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lcpcrdpanueafbohhbph.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjcGNyZHBhbnVlYWZib2hoYnBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMDU2ODksImV4cCI6MjA1NjU4MTY4OX0.aQVJpZofwh8SRvkGGXoyR8HSWObaDvobaTxKGyiq8zY';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Authentication functions
export const login = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Login error:', error);
    toast.error(error instanceof Error ? error.message : 'Login failed', {
      className: "bg-red-50 text-red-800 border-red-200"
    });
    return { success: false, error };
  }
};

export const register = async (email: string, password: string, first_name: string, last_name: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
          display_name: `${first_name} ${last_name}`,
        }
      }
    });

    if (error) throw error;
    
    toast.success('Registration successful! Please check your email for verification.', {
      className: "bg-green-50 text-green-800 border-green-200"
    });
    
    return { success: true, data };
  } catch (error) {
    console.error('Registration error:', error);
    toast.error(error instanceof Error ? error.message : 'Registration failed', {
      className: "bg-red-50 text-red-800 border-red-200"
    });
    return { success: false, error };
  }
};

export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
    
    toast.success('Password reset instructions sent to your email', {
      className: "bg-green-50 text-green-800 border-green-200"
    });
    
    return { success: true };
  } catch (error) {
    console.error('Password reset error:', error);
    toast.error(error instanceof Error ? error.message : 'Password reset failed', {
      className: "bg-red-50 text-red-800 border-red-200"
    });
    return { success: false, error };
  }
};

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    window.location.href = '/login';
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    toast.error(error instanceof Error ? error.message : 'Logout failed', {
      className: "bg-red-50 text-red-800 border-red-200"
    });
    return { success: false, error };
  }
};

export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
};

export const isAuthenticated = async () => {
  const session = await getSession();
  return !!session;
};

export const getUserId = async () => {
  const session = await getSession();
  return session?.user?.id;
};

export const getUserProfile = async () => {
  try {
    const userId = await getUserId();
    if (!userId) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Get user profile error:', error);
    return null;
  }
};

// File storage functions
export const uploadFile = async (bucket: string, path: string, file: File) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        upsert: true,
        cacheControl: '3600',
      });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('File upload error:', error);
    toast.error(error instanceof Error ? error.message : 'File upload failed', {
      className: "bg-red-50 text-red-800 border-red-200"
    });
    return { success: false, error };
  }
};

export const getFileUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

export const deleteFile = async (bucket: string, path: string) => {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('File delete error:', error);
    return { success: false, error };
  }
};
