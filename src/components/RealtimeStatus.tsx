
import React, { useEffect, useState } from 'react';
import { supabase } from '@/services/supabase';
import { useAuth } from '@/providers/KeycloakProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface UserPresence {
  id: string;
  username: string;
  avatar_url?: string;
  last_seen: string;
}

const RealtimeStatus = () => {
  const { username } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState<UserPresence[]>([]);
  
  useEffect(() => {
    // Get current user from supabase
    const setupPresence = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      // Setup presence channel
      const channel = supabase.channel('online-users');
      
      channel
        .on('presence', { event: 'sync' }, () => {
          const presenceState = channel.presenceState();
          
          // Convert presence state to array of users
          const users = Object.values(presenceState).flatMap(presence => {
            return presence.map((p: any) => ({
              id: p.user_id,
              username: p.username,
              avatar_url: p.avatar_url,
              last_seen: new Date().toISOString()
            }));
          });
          
          setOnlineUsers(users);
        })
        .on('presence', { event: 'join' }, ({ key, newPresences }) => {
          // Show toast when a new user joins
          const newUser = newPresences[0];
          if (newUser.username !== username) {
            toast.info(`${newUser.username} is now online`, {
              className: "bg-blue-50 text-blue-800 border-blue-200"
            });
          }
        })
        .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
          // Update state when a user leaves
          const leftUser = leftPresences[0];
          setOnlineUsers(prev => prev.filter(user => user.id !== leftUser.user_id));
        })
        .subscribe(async (status) => {
          if (status !== 'SUBSCRIBED') return;
          
          // Track user presence
          await channel.track({
            user_id: user.id,
            username: profile?.display_name || username || user.email,
            avatar_url: profile?.avatar_url,
            online_at: new Date().toISOString()
          });
        });
      
      return () => {
        supabase.removeChannel(channel);
      };
    };
    
    setupPresence();
  }, [username]);
  
  if (onlineUsers.length === 0) return null;
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-sm font-medium mb-2">Online Users</h3>
      <div className="flex flex-wrap gap-2">
        {onlineUsers.map(user => (
          <div key={user.id} className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              {user.avatar_url ? (
                <AvatarImage src={user.avatar_url} alt={user.username} />
              ) : (
                <AvatarFallback className="bg-green-500 text-white text-xs">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
              {user.username}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealtimeStatus;
