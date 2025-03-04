import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/KeycloakProvider';
import { supabase } from '@/services/supabase';
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
  Image as ImageIcon,
  Camera,
  Upload,
  X,
  Check,
  Milk
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import OneMilkLogo from './OneMilkLogo';

interface UserProfileProps {
  firstName?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ firstName: initialFirstName }) => {
  const { username, logout, walletBalance, addToWallet } = useAuth();
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  // Personal Information states
  const [personalInfo, setPersonalInfo] = useState({
    firstName: initialFirstName || username?.split(' ')[0] || '',
    lastName: username?.split(' ')[1] || '',
    email: 'user@example.com',
    phone: '+91 9876543210'
  });

  // Address states
  const [address, setAddress] = useState({
    address1: '123 Milk Street',
    address2: 'Apartment 4B',
    city: 'Mumbai',
    state: 'Maharashtra',
    pin: '400001'
  });
  
  // Order related states
  const [orders, setOrders] = useState<any[]>([
    {
      id: "ORD-1001",
      date: new Date().toLocaleDateString(),
      items: [
        { name: "Whole Milk", quantity: 2, price: 299 },
        { name: "Low-Fat Milk", quantity: 1, price: 259 }
      ],
      total: 857,
      status: "Delivered"
    },
    {
      id: "ORD-1002",
      date: new Date(Date.now() - 86400000 * 3).toLocaleDateString(),
      items: [
        { name: "Organic Milk", quantity: 1, price: 450 }
      ],
      total: 450,
      status: "Delivered"
    }
  ]);
  
  // Subscription related states
  const [subscriptions, setSubscriptions] = useState<any[]>([
    {
      id: "SUB-1001",
      plan: "Family",
      price: 1499,
      startDate: new Date(Date.now() - 86400000 * 30).toLocaleDateString(),
      nextBilling: new Date(Date.now() + 86400000 * 30).toLocaleDateString(),
      status: "Active"
    }
  ]);
  
  // Vacation related states
  const [vacationDates, setVacationDates] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [activeVacations, setActiveVacations] = useState<any[]>([]);
  
  // Delivery preferences
  const [deliveryPreferences, setDeliveryPreferences] = useState({
    callBeforeDelivery: false,
    ringBell: true,
    voiceInstructions: "",
    doorImage: null as string | null,
  });

  // Attempt to load data from localStorage on component mount
  useEffect(() => {
    const savedPhoto = localStorage.getItem('profile_photo');
    if (savedPhoto) setProfilePhoto(savedPhoto);
    
    const savedPersonalInfo = localStorage.getItem('personal_info');
    if (savedPersonalInfo) setPersonalInfo(JSON.parse(savedPersonalInfo));
    
    const savedAddress = localStorage.getItem('address_info');
    if (savedAddress) setAddress(JSON.parse(savedAddress));
    
    const savedVacations = localStorage.getItem('vacations');
    if (savedVacations) setActiveVacations(JSON.parse(savedVacations));
    
    const savedPreferences = localStorage.getItem('delivery_preferences');
    if (savedPreferences) setDeliveryPreferences(JSON.parse(savedPreferences));
  }, []);

  // Save profile photo to localStorage whenever it changes
  useEffect(() => {
    if (profilePhoto) {
      localStorage.setItem('profile_photo', profilePhoto);
    } else {
      localStorage.removeItem('profile_photo');
    }
  }, [profilePhoto]);

  // Save active vacations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('vacations', JSON.stringify(activeVacations));
  }, [activeVacations]);

  // Save delivery preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('delivery_preferences', JSON.stringify(deliveryPreferences));
  }, [deliveryPreferences]);

  const handleItemClick = (dialogId: string) => {
    setActiveDialog(dialogId);
  };

  const closeDialog = () => {
    setActiveDialog(null);
  };

  const handleDeliveryPreference = (type: string, value: any) => {
    setDeliveryPreferences(prev => ({
      ...prev,
      [type]: value
    }));
    toast.success(`${type} preference saved`);
  };

  const handleProfilePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
        toast.success("Profile photo updated successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
        toast.success("Profile photo captured successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraInput = () => {
    cameraInputRef.current?.click();
  };

  const removeProfilePhoto = () => {
    setProfilePhoto(null);
    toast.success("Profile photo removed");
  };

  const handleSetVacation = () => {
    if (vacationDates.from && vacationDates.to) {
      const newVacation = {
        id: `VAC-${Date.now()}`,
        from: vacationDates.from.toLocaleDateString(),
        to: vacationDates.to.toLocaleDateString(),
        status: "Scheduled"
      };
      
      setActiveVacations([...activeVacations, newVacation]);
      setVacationDates({ from: undefined, to: undefined });
      
      toast.success("Vacation set successfully", {
        description: `Your deliveries will be paused from ${newVacation.from} to ${newVacation.to}.`
      });
      
      closeDialog();
    } else {
      toast.error("Please select both start and end dates");
    }
  };

  const cancelVacation = (id: string) => {
    setActiveVacations(activeVacations.filter(vacation => vacation.id !== id));
    toast.success("Vacation cancelled successfully");
  };

  const saveDoorImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleDeliveryPreference('doorImage', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const savePersonalInfo = () => {
    // Validate inputs
    if (!personalInfo.firstName.trim() || !personalInfo.lastName.trim()) {
      toast.error("First name and last name are required");
      return;
    }
    
    if (!personalInfo.email.includes('@') || !personalInfo.email.includes('.')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (!personalInfo.phone.trim() || personalInfo.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    // In a real app, you would send this to an API
    // For now, we'll just save to localStorage
    localStorage.setItem('personal_info', JSON.stringify(personalInfo));
    
    // Add a small delay to simulate an API call
    setTimeout(() => {
      toast.success("Personal information saved successfully");
    }, 500);
  };

  const saveAddress = () => {
    // Validate inputs
    if (!address.address1.trim()) {
      toast.error("Address line 1 is required");
      return;
    }
    
    if (!address.city.trim() || !address.state.trim()) {
      toast.error("City and state are required");
      return;
    }
    
    if (!address.pin.trim() || address.pin.length !== 6) {
      toast.error("Please enter a valid 6-digit PIN code");
      return;
    }
    
    // In a real app, you would send this to an API
    // For now, we'll just save to localStorage
    localStorage.setItem('address_info', JSON.stringify(address));
    
    // Add a small delay to simulate an API call
    setTimeout(() => {
      toast.success("Address saved successfully");
    }, 500);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer rounded-md px-2 py-1 hover:bg-accent">
            <div className="relative">
              <Avatar className="h-8 w-8 border border-startwell-purple/30">
                {profilePhoto ? (
                  <AvatarImage src={profilePhoto} alt={username || "User"} />
                ) : (
                  <AvatarFallback className="bg-startwell-purple text-white">
                    {username?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
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
                  <ImageIcon className="mr-2 h-4 w-4" />
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

      {/* Orders Dialog */}
      <Dialog open={activeDialog === 'orders'} onOpenChange={() => activeDialog === 'orders' && closeDialog()}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-startwell-purple" />
              My Orders
            </DialogTitle>
            <DialogDescription>
              View and manage your order history.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-md p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-startwell-purple">{order.id}</span>
                        <span className="text-sm text-gray-500">{order.date}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {order.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <span>{item.name}</span>
                            <span className="text-sm text-gray-500 ml-2">x{item.quantity}</span>
                          </div>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>₹{order.total}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">You have no recent orders.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Subscription Dialog */}
      <Dialog open={activeDialog === 'subscription'} onOpenChange={() => activeDialog === 'subscription' && closeDialog()}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 text-startwell-purple" />
              My Subscription
            </DialogTitle>
            <DialogDescription>
              Manage your milk delivery subscription.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {subscriptions.length > 0 ? (
              <div className="space-y-4">
                {subscriptions.map((subscription) => (
                  <div key={subscription.id} className="border rounded-md p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-semibold text-startwell-purple">{subscription.plan} Plan</h3>
                        <p className="text-sm text-gray-500">
                          Started on: {subscription.startDate} • Next billing: {subscription.nextBilling}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        subscription.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {subscription.status}
                      </span>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="font-semibold">Monthly Price: ₹{subscription.price}</span>
                      <div className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            const updatedSubscriptions = subscriptions.map(sub => 
                              sub.id === subscription.id 
                                ? {...sub, status: sub.status === 'Active' ? 'Paused' : 'Active'} 
                                : sub
                            );
                            setSubscriptions(updatedSubscriptions);
                            toast.success(
                              subscription.status === 'Active' 
                                ? 'Subscription paused successfully' 
                                : 'Subscription resumed successfully'
                            );
                          }}
                        >
                          {subscription.status === 'Active' ? 'Pause' : 'Resume'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">You have no active subscriptions.</p>
                <Button asChild>
                  <Link to="/subscription">Start a Subscription</Link>
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Vacation Dialog */}
      <Dialog open={activeDialog === 'vacation'} onOpenChange={() => activeDialog === 'vacation' && closeDialog()}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarOff className="h-5 w-5 text-startwell-purple" />
              Set Vacation
            </DialogTitle>
            <DialogDescription>
              Pause your delivery while you're away.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Select Dates</h3>
                <div className="border rounded-md p-4">
                  <Calendar
                    mode="range"
                    selected={{
                      from: vacationDates.from,
                      to: vacationDates.to,
                    }}
                    onSelect={(range) => {
                      setVacationDates({
                        from: range?.from,
                        to: range?.to,
                      });
                    }}
                    className="rounded-md border"
                    disabled={{ before: new Date() }}
                  />
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" onClick={closeDialog}>Cancel</Button>
                  <Button onClick={handleSetVacation}>Set Vacation</Button>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Active Vacations</h3>
                {activeVacations.length > 0 ? (
                  <div className="space-y-3">
                    {activeVacations.map((vacation) => (
                      <div key={vacation.id} className="border rounded-md p-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{vacation.from} - {vacation.to}</p>
                          <p className="text-xs text-gray-500">{vacation.status}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => cancelVacation(vacation.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border rounded-md p-4 text-center text-muted-foreground">
                    No active vacations.
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog open={activeDialog === 'profile'} onOpenChange={() => activeDialog === 'profile' && closeDialog()}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-startwell-purple" />
              My Profile
            </DialogTitle>
            <DialogDescription>
              View and edit your personal information.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-2 border-startwell-purple/30">
                    {profilePhoto ? (
                      <AvatarImage src={profilePhoto} alt={username || "User"} />
                    ) : (
                      <AvatarFallback className="bg-startwell-purple text-white text-4xl">
                        {username?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  {profilePhoto && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0 bg-white shadow-sm hover:bg-red-50"
                      onClick={removeProfilePhoto}
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={triggerFileInput} className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload
                  </Button>
                  <Button variant="outline" size="sm" onClick={triggerCameraInput} className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Capture
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePhotoUpload}
                  />
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="user"
                    className="hidden"
                    onChange={handleCameraCapture}
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{username}</h3>
                  <p className="text-muted-foreground">Wallet Balance: ₹{walletBalance.toFixed(2)}</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <Tabs defaultValue="personal">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="address">Address</TabsTrigger>
                  </TabsList>
                  <TabsContent value="personal" className="p-4 border rounded-md mt-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName" 
                            value={personalInfo.firstName}
                            onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName" 
                            value={personalInfo.lastName}
                            onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={personalInfo.email}
                          onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          value={personalInfo.phone}
                          onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                        />
                      </div>
                      <Button 
                        className="w-full"
                        onClick={savePersonalInfo}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="address" className="p-4 border rounded-md mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address1">Address Line 1</Label>
                        <Input 
                          id="address1" 
                          value={address.address1}
                          onChange={(e) => handleAddressChange('address1', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address2">Address Line 2</Label>
                        <Input 
                          id="address2" 
                          value={address.address2}
                          onChange={(e) => handleAddressChange('address2', e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input 
                            id="city" 
                            value={address.city}
                            onChange={(e) => handleAddressChange('city', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input 
                            id="state" 
                            value={address.state}
                            onChange={(e) => handleAddressChange('state', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pin">PIN Code</Label>
                          <Input 
                            id="pin" 
                            value={address.pin}
                            onChange={(e) => handleAddressChange('pin', e.target.value)}
                          />
                        </div>
                      </div>
                      <Button 
                        className="w-full"
                        onClick={saveAddress}
                      >
                        Save Address
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Call Before Delivery Dialog */}
      <Dialog open={activeDialog === 'call'} onOpenChange={() => activeDialog === 'call' && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5 text-startwell-purple" />
              Call Before Delivery
            </DialogTitle>
            <DialogDescription>
              Request a call before your order is delivered.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="call-preference" 
                checked={deliveryPreferences.callBeforeDelivery}
                onCheckedChange={(checked) => handleDeliveryPreference('callBeforeDelivery', checked)}
              />
              <Label htmlFor="call-preference">Receive a call before delivery</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Our delivery partner will call you approximately 10 minutes before arriving at your location.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={closeDialog}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ring the Bell Dialog */}
      <Dialog open={activeDialog === 'bell'} onOpenChange={() => activeDialog === 'bell' && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-startwell-purple" />
              Ring the Bell
            </DialogTitle>
            <DialogDescription>
              Request the delivery person to ring your doorbell.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="bell-preference" 
                checked={deliveryPreferences.ringBell}
                onCheckedChange={(checked) => handleDeliveryPreference('ringBell', checked)}
              />
              <Label htmlFor="bell-preference">Ring the doorbell on arrival</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Our delivery partner will ring your doorbell upon arrival. Disable this if you have sleeping children or pets.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={closeDialog}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Voice Instructions Dialog */}
      <Dialog open={activeDialog === 'voice'} onOpenChange={() => activeDialog === 'voice' && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-startwell-purple" />
              Voice Instructions
            </DialogTitle>
            <DialogDescription>
              Add special delivery instructions for the delivery person.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="voice-instructions">Special Instructions</Label>
                <Textarea 
                  id="voice-instructions" 
                  placeholder="e.g., Leave at the front door, don't knock, etc." 
                  value={deliveryPreferences.voiceInstructions}
                  onChange={(e) => setDeliveryPreferences(prev => ({
                    ...prev,
                    voiceInstructions: e.target.value
                  }))}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            <Button onClick={() => handleDeliveryPreference('voiceInstructions', deliveryPreferences.voiceInstructions)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Door Image Dialog */}
      <Dialog open={activeDialog === 'doorImage'} onOpenChange={() => activeDialog === 'doorImage' && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-startwell-purple" />
              Door Image
            </DialogTitle>
            <DialogDescription>
              Provide an image of your door to help the delivery person.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              {deliveryPreferences.doorImage ? (
                <div className="relative">
                  <img 
                    src={deliveryPreferences.doorImage} 
                    alt="Door" 
                    className="w-full h-48 object-cover rounded-md" 
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white/80 shadow-sm hover:bg-red-50"
                    onClick={() => handleDeliveryPreference('doorImage', null)}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-4">Upload an image of your door</p>
                    <input
                      id="door-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={saveDoorImage}
                    />
                    <Button onClick={() => document.getElementById('door-image')?.click()}>
                      Upload Image
                    </Button>
                  </div>
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                This helps our delivery partners easily identify your door for accurate deliveries.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={closeDialog}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Needed for TypeScript React Router
interface Link {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const Link: React.FC<Link> = ({ to, children, className }) => {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
};

export default UserProfile;
