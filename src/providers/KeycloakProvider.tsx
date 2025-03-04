
import React, { useState, useEffect, ReactNode, useCallback } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase, getUserProfile } from '../services/supabase';
import { toast } from 'sonner';

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
  walletBalance: number;
  addToWallet: (amount: number) => void;
  firstName: string | undefined;
}

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  username: undefined,
  firstName: undefined,
  login: () => {},
  logout: () => {},
  token: undefined,
  hasRole: () => false,
  refresh: async () => false,
  walletBalance: 0,
  addToWallet: () => {},
});

export const KeycloakProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [walletBalance, setWalletBalance] = useState(() => {
    const savedBalance = localStorage.getItem('wallet_balance');
    return savedBalance ? parseFloat(savedBalance) : 0;
  });

  const fetchUserProfile = useCallback(async () => {
    const userProfile = await getUserProfile();
    if (userProfile) {
      setProfile(userProfile);
    }
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setAuthenticated(!!newSession);
        
        if (newSession) {
          await fetchUserProfile();
        } else {
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Initial session check
    const checkSession = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      setSession(initialSession);
      setAuthenticated(!!initialSession);
      
      if (initialSession) {
        await fetchUserProfile();
      }
      
      setIsLoading(false);
    };
    
    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchUserProfile]);

  // Save wallet balance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wallet_balance', walletBalance.toString());
  }, [walletBalance]);

  const addToWallet = (amount: number) => {
    setWalletBalance(prevBalance => {
      const newBalance = prevBalance + amount;
      return newBalance;
    });
  };

  const refresh = async () => {
    try {
      const { data: { session: refreshedSession } } = await supabase.auth.getSession();
      setSession(refreshedSession);
      setAuthenticated(!!refreshedSession);
      
      if (refreshedSession) {
        await fetchUserProfile();
      }
      
      return !!refreshedSession;
    } catch (error) {
      console.error('Failed to refresh authentication', error);
      return false;
    }
  };

  const contextValue: AuthContextType = {
    isAuthenticated: authenticated,
    isLoading,
    username: profile?.display_name || session?.user?.email,
    firstName: profile?.first_name,
    login: () => {}, // This is handled in the Login component
    logout: async () => {
      await supabase.auth.signOut();
      setAuthenticated(false);
      setSession(null);
      setProfile(null);
      window.location.href = '/login';
    },
    token: session?.access_token,
    hasRole: () => true, // Simplified role check
    refresh,
    walletBalance,
    addToWallet,
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
