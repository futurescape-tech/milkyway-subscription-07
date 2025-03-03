
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/KeycloakProvider';
import {
  LogOut,
  ShoppingCart,
  CalendarCheck,
  CalendarOff,
  User,
  Settings,
  PhoneCall,
  Bell,
  Mic,
  Image
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from "sonner";

const UserProfile = () => {
  const { username, logout, walletBalance } = useAuth();
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  const handleItemClick = (dialogId: string) => {
    setActiveDialog(dialogId);
  };

  const closeDialog = () => {
    setActiveDialog(null);
  };

  const handleDeliveryPreference = (preference: string) => {
    toast.success(`${preference} preference saved`);
    closeDialog();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer rounded-md px-2 py-1 hover:bg-accent">
            <div className="bg-primary rounded-full h-8 w-8 flex items-center justify-center text-primary-foreground">
              {username?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="hidden md:flex flex-col items-start">
              <div className="text-sm font-medium">{username}</div>
              <div className="text-xs text-muted-foreground">₹{walletBalance.toFixed(2)}</div>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleItemClick('orders')}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>My Orders</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleItemClick('subscription')}>
              <CalendarCheck className="mr-2 h-4 w-4" />
              <span>My Subscription</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleItemClick('vacation')}>
              <CalendarOff className="mr-2 h-4 w-4" />
              <span>Set Vacation</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleItemClick('profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Settings className="mr-2 h-4 w-4" />
              <span>Delivery Preferences</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleItemClick('call')}>
                  <PhoneCall className="mr-2 h-4 w-4" />
                  <span>Call Before Delivery</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('bell')}>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Ring the Bell</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('voice')}>
                  <Mic className="mr-2 h-4 w-4" />
                  <span>Voice Instructions</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('doorImage')}>
                  <Image className="mr-2 h-4 w-4" />
                  <span>Door Image</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="text-red-500 hover:text-red-700">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialogs for each menu item */}
      <Dialog open={activeDialog === 'orders'} onOpenChange={() => activeDialog === 'orders' && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>My Orders</DialogTitle>
            <DialogDescription>
              View and manage your order history.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-muted-foreground">You have no recent orders.</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === 'subscription'} onOpenChange={() => activeDialog === 'subscription' && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>My Subscription</DialogTitle>
            <DialogDescription>
              Manage your milk delivery subscription.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-muted-foreground">You have no active subscriptions.</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === 'vacation'} onOpenChange={() => activeDialog === 'vacation' && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Vacation</DialogTitle>
            <DialogDescription>
              Pause your delivery while you're away.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-muted-foreground">You can set vacation dates here.</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === 'profile'} onOpenChange={() => activeDialog === 'profile' && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>My Profile</DialogTitle>
            <DialogDescription>
              View and edit your personal information.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex flex-col space-y-2">
              <p><strong>Username:</strong> {username}</p>
              <p><strong>Wallet Balance:</strong> ₹{walletBalance.toFixed(2)}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === 'call'} onOpenChange={() => activeDialog === 'call' && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Call Before Delivery</DialogTitle>
            <DialogDescription>
              Request a call before your order is delivered.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 flex justify-end gap-2">
            <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            <Button onClick={() => handleDeliveryPreference('Call before delivery')}>Enable</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === 'bell'} onOpenChange={() => activeDialog === 'bell' && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ring the Bell</DialogTitle>
            <DialogDescription>
              Request the delivery person to ring your doorbell.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 flex justify-end gap-2">
            <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            <Button onClick={() => handleDeliveryPreference('Ring the bell')}>Enable</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === 'voice'} onOpenChange={() => activeDialog === 'voice' && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Voice Instructions</DialogTitle>
            <DialogDescription>
              Add special delivery instructions for the delivery person.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 flex justify-end gap-2">
            <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            <Button onClick={() => handleDeliveryPreference('Voice instructions')}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === 'doorImage'} onOpenChange={() => activeDialog === 'doorImage' && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Door Image</DialogTitle>
            <DialogDescription>
              Provide an image of your door to help the delivery person.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 flex justify-end gap-2">
            <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            <Button onClick={() => handleDeliveryPreference('Door image')}>Upload</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserProfile;
