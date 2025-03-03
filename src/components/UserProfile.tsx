
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/KeycloakProvider';
import { LogOut } from 'lucide-react';

const UserProfile = () => {
  const { username, logout, walletBalance } = useAuth();

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-end">
        <div className="text-sm font-medium">{username}</div>
        <div className="text-xs text-muted-foreground">Wallet: ₹{walletBalance.toFixed(2)}</div>
      </div>
      <Button variant="ghost" size="sm" onClick={logout} className="text-red-500 hover:text-red-700 hover:bg-red-100">
        <LogOut className="w-4 h-4 mr-1" />
        Logout
      </Button>
    </div>
  );
};

export default UserProfile;
