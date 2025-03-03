
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/KeycloakProvider';

const UserProfile = () => {
  const { username, logout } = useAuth();

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm font-medium">{username}</div>
      <Button variant="ghost" size="sm" onClick={logout} className="apple-button">
        Sign Out
      </Button>
    </div>
  );
};

export default UserProfile;
