
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import OneMilkLogo from "@/components/OneMilkLogo";
import { Calendar, IndianRupee, PauseCircle, PlayCircle, Truck } from "lucide-react";
import { useAuth } from "@/providers/KeycloakProvider";

const Subscription = () => {
  const { walletBalance, addToWallet } = useAuth();
  const [plan, setPlan] = useState("basic");
  const [frequency, setFrequency] = useState("weekly");
  const [couponCode, setCouponCode] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeSubscriptions, setActiveSubscriptions] = useState<any[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedDeliveryDays, setSelectedDeliveryDays] = useState({
    monday: true,
    tuesday: false,
    wednesday: true,
    thursday: false,
    friday: true,
    saturday: false,
    sunday: false,
  });
  const [rechargeAmount, setRechargeAmount] = useState(500);
  const [trackingInfo, setTrackingInfo] = useState({
    status: "scheduled",
    estimatedDelivery: "Tomorrow, 7:00 AM - 8:00 AM",
    deliveryPersonName: "Raj Kumar",
    deliveryPersonPhone: "+91 98765 43210",
  });

  const plans = {
    basic: {
      name: "Basic",
      price: frequency === "weekly" ? 2199 : frequency === "biweekly" ? 4099 : 7899,
      description: "1 liter of milk every 2 days"
    },
    family: {
      name: "Family",
      price: frequency === "weekly" ? 3699 : frequency === "biweekly" ? 6799 : 13199,
      description: "2 liters of milk daily"
    },
    premium: {
      name: "Premium",
      price: frequency === "weekly" ? 5999 : frequency === "biweekly" ? 11299 : 21499,
      description: "3 liters of milk daily with premium varieties"
    }
  };

  const handleSubscribe = () => {
    const newSubscription = {
      id: Date.now(),
      plan: plans[plan as keyof typeof plans].name,
      description: plans[plan as keyof typeof plans].description,
      price: plans[plan as keyof typeof plans].price,
      frequency,
      status: "active",
      startDate: new Date().toLocaleDateString(),
      nextDelivery: "Tomorrow",
    };
    
    setActiveSubscriptions([...activeSubscriptions, newSubscription]);
    
    toast("Subscription Started!", {
      description: `You've successfully subscribed to the ${plans[plan as keyof typeof plans].name} plan.`,
    });
    
    setIsDialogOpen(false);
  };

  const handleCouponApply = () => {
    if (couponCode.toLowerCase() === "newcustomer") {
      toast("Coupon Applied!", {
        description: "You've received a 10% discount on your subscription.",
      });
    } else {
      toast("Invalid Coupon", {
        description: "The coupon code you entered is invalid or expired.",
      });
    }
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    toast(isPaused ? "Subscription Resumed" : "Subscription Paused", {
      description: isPaused 
        ? "Your subscription has been resumed. Deliveries will continue as scheduled." 
        : "Your subscription has been paused. You can resume it anytime.",
    });
  };

  const handleDeliveryDayToggle = (day: string) => {
    setSelectedDeliveryDays(prev => ({
      ...prev,
      [day]: !prev[day as keyof typeof prev]
    }));
  };

  const handleWalletRecharge = () => {
    addToWallet(rechargeAmount);
    toast("Wallet Recharged", {
      description: `₹${rechargeAmount} has been added to your wallet.`,
    });
  };

  // Format price in INR
  const formatPrice = (price: number) => {
    return (
      <div className="flex items-center">
        <IndianRupee className="h-3.5 w-3.5 mr-1" />
        <span>{price.toFixed(2)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <OneMilkLogo />
          <nav className="flex space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/products">Products</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/subscription">Subscribe</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Create Your Milk Subscription</h1>

          {activeSubscriptions.length > 0 && (
            <Card className="mb-8 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Active Subscriptions</span>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={handlePauseResume}
                  >
                    {isPaused ? (
                      <>
                        <PlayCircle className="h-4 w-4" />
                        Resume
                      </>
                    ) : (
                      <>
                        <PauseCircle className="h-4 w-4" />
                        Pause
                      </>
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeSubscriptions.map((subscription) => (
                    <div key={subscription.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{subscription.plan} Plan</h3>
                          <p className="text-sm text-gray-500">{subscription.description}</p>
                          <p className="text-sm">Started on: {subscription.startDate}</p>
                          <p className="text-sm">Next delivery: {subscription.nextDelivery}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold flex items-center justify-end">
                            {formatPrice(subscription.price)}
                          </div>
                          <p className="text-sm text-gray-500">
                            {subscription.frequency} billing
                          </p>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                            isPaused ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                          }`}>
                            {isPaused ? "Paused" : "Active"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Truck className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium">Next Delivery</h3>
                      <p className="text-sm text-gray-500">{trackingInfo.estimatedDelivery}</p>
                    </div>
                  </div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {trackingInfo.status === "scheduled" ? "Scheduled" : "Out for Delivery"}
                  </span>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium mb-2">Delivery Partner</h4>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      {trackingInfo.deliveryPersonName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium">{trackingInfo.deliveryPersonName}</p>
                      <p className="text-sm text-gray-500">{trackingInfo.deliveryPersonPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Choose Your Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={plan} onValueChange={setPlan} className="space-y-4">
                <div className="flex items-center space-x-4 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="basic" id="basic" />
                  <Label htmlFor="basic" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Basic Plan</div>
                    <div className="text-sm text-gray-500">1 liter of milk every 2 days</div>
                  </Label>
                  <div className="font-semibold flex items-center">
                    {formatPrice(frequency === "weekly" ? 2199 : frequency === "biweekly" ? 4099 : 7899)}
                  </div>
                </div>

                <div className="flex items-center space-x-4 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="family" id="family" />
                  <Label htmlFor="family" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Family Plan</div>
                    <div className="text-sm text-gray-500">2 liters of milk daily</div>
                  </Label>
                  <div className="font-semibold flex items-center">
                    {formatPrice(frequency === "weekly" ? 3699 : frequency === "biweekly" ? 6799 : 13199)}
                  </div>
                </div>

                <div className="flex items-center space-x-4 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="premium" id="premium" />
                  <Label htmlFor="premium" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Premium Plan</div>
                    <div className="text-sm text-gray-500">3 liters of milk daily with premium varieties</div>
                  </Label>
                  <div className="font-semibold flex items-center">
                    {formatPrice(frequency === "weekly" ? 5999 : frequency === "biweekly" ? 11299 : 21499)}
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Billing Frequency</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={frequency} onValueChange={setFrequency} className="space-y-4">
                <div className="flex items-center space-x-4 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Weekly</div>
                    <div className="text-sm text-gray-500">Get billed every week</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-4 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="biweekly" id="biweekly" />
                  <Label htmlFor="biweekly" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Bi-Weekly</div>
                    <div className="text-sm text-gray-500">Get billed every two weeks (5% discount)</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-4 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Monthly</div>
                    <div className="text-sm text-gray-500">Get billed every month (10% discount)</div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Delivery Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedDeliveryDays).map(([day, isSelected]) => (
                  <Button
                    key={day}
                    variant={isSelected ? "default" : "outline"}
                    className="flex items-center gap-2"
                    onClick={() => handleDeliveryDayToggle(day)}
                  >
                    <Calendar className="h-4 w-4" />
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Milk Street" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 col-span-1">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Milkville" />
                </div>
                <div className="space-y-2 col-span-1">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="Maharashtra" />
                </div>
                <div className="space-y-2 col-span-1">
                  <Label htmlFor="zip">PIN Code</Label>
                  <Input id="zip" placeholder="400001" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+91 98765 43210" />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Wallet & Payments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Wallet Balance</h3>
                  <span className="font-bold text-xl flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {walletBalance.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(Number(e.target.value))}
                  placeholder="Amount to add"
                />
                <Button onClick={handleWalletRecharge}>Recharge</Button>
              </div>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Payment Methods</h4>
                <RadioGroup defaultValue="wallet" className="space-y-2">
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label htmlFor="wallet">Pay from Wallet</Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi">UPI</Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">Cash on Delivery</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Have a Coupon?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                />
                <Button onClick={handleCouponApply}>Apply</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>{plans[plan as keyof typeof plans].name} Plan ({frequency})</span>
                <div className="flex items-center">
                  {formatPrice(plans[plan as keyof typeof plans].price)}
                </div>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>Free</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <div className="flex items-center">
                  {formatPrice(plans[plan as keyof typeof plans].price)}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">Subscribe Now</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Your Subscription</DialogTitle>
                    <DialogDescription>
                      You are about to subscribe to the {plans[plan as keyof typeof plans].name} Plan with {frequency} billing.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Subscription Details:</h4>
                      <p>{plans[plan as keyof typeof plans].description}</p>
                      <p className="flex items-center">Price: {formatPrice(plans[plan as keyof typeof plans].price)} ({frequency})</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">By subscribing, you agree to:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Automatic recurring billing based on your selected frequency</li>
                        <li>Our Terms of Service and Privacy Policy</li>
                        <li>Email notifications about your subscription and delivery</li>
                      </ul>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubscribe}>Confirm Subscription</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                <OneMilkLogo className="text-white" />
              </h3>
              <p className="text-gray-400">Fresh milk delivered to your doorstep.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/products" className="text-gray-400 hover:text-white">Products</Link></li>
                <li><Link to="/subscription" className="text-gray-400 hover:text-white">Subscription</Link></li>
                <li><Link to="/faqs" className="text-gray-400 hover:text-white">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@onemilk.com</li>
                <li>Phone: +91 9876543210</li>
                <li>Address: 123 Dairy Lane, Milk City</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Subscribe to Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md text-black w-full"
                />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} OneMilk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Subscription;
