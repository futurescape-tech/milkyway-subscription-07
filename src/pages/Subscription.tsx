
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Subscription = () => {
  const [plan, setPlan] = useState("basic");
  const [frequency, setFrequency] = useState("weekly");
  const [couponCode, setCouponCode] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const plans = {
    basic: {
      name: "Basic",
      price: frequency === "weekly" ? 29 : frequency === "biweekly" ? 55 : 105,
      description: "1 liter of milk every 2 days"
    },
    family: {
      name: "Family",
      price: frequency === "weekly" ? 49 : frequency === "biweekly" ? 90 : 175,
      description: "2 liters of milk daily"
    },
    premium: {
      name: "Premium",
      price: frequency === "weekly" ? 79 : frequency === "biweekly" ? 150 : 285,
      description: "3 liters of milk daily with premium varieties"
    }
  };

  const handleSubscribe = () => {
    toast({
      title: "Subscription Started!",
      description: `You've successfully subscribed to the ${plans[plan as keyof typeof plans].name} plan.`,
    });
    setIsDialogOpen(false);
  };

  const handleCouponApply = () => {
    if (couponCode.toLowerCase() === "newcustomer") {
      toast({
        title: "Coupon Applied!",
        description: "You've received a 10% discount on your subscription.",
      });
    } else {
      toast({
        title: "Invalid Coupon",
        description: "The coupon code you entered is invalid or expired.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-purple-800">MilkSub</div>
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
                  <div className="font-semibold">${frequency === "weekly" ? 29 : frequency === "biweekly" ? 55 : 105}</div>
                </div>

                <div className="flex items-center space-x-4 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="family" id="family" />
                  <Label htmlFor="family" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Family Plan</div>
                    <div className="text-sm text-gray-500">2 liters of milk daily</div>
                  </Label>
                  <div className="font-semibold">${frequency === "weekly" ? 49 : frequency === "biweekly" ? 90 : 175}</div>
                </div>

                <div className="flex items-center space-x-4 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="premium" id="premium" />
                  <Label htmlFor="premium" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Premium Plan</div>
                    <div className="text-sm text-gray-500">3 liters of milk daily with premium varieties</div>
                  </Label>
                  <div className="font-semibold">${frequency === "weekly" ? 79 : frequency === "biweekly" ? 150 : 285}</div>
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
                  <Input id="state" placeholder="CA" />
                </div>
                <div className="space-y-2 col-span-1">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="12345" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="(555) 123-4567" />
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
                <span>${plans[plan as keyof typeof plans].price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>Free</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${plans[plan as keyof typeof plans].price.toFixed(2)}</span>
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
                      <p>Price: ${plans[plan as keyof typeof plans].price.toFixed(2)} ({frequency})</p>
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
              <h3 className="text-xl font-bold mb-4">MilkSub</h3>
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
                <li>Email: info@milksub.com</li>
                <li>Phone: +1 (555) 123-4567</li>
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
            <p>&copy; {new Date().getFullYear()} MilkSub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Subscription;
