
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import OneMilkLogo from "@/components/OneMilkLogo";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ShoppingCart, IndianRupee, Heart, Filter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useAuth } from "@/providers/KeycloakProvider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define product types
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity?: number;
  isPopular?: boolean;
};

const Products = () => {
  const { walletBalance } = useAuth();
  // Sample product data
  const allProducts: Product[] = [
    {
      id: 1,
      name: "Whole Milk",
      description: "Creamy and rich whole milk from grass-fed cows.",
      price: 299,
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      category: "regular",
      isPopular: true
    },
    {
      id: 2,
      name: "Low-Fat Milk",
      description: "Low-fat milk with all the nutrition and less fat.",
      price: 259,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      category: "regular"
    },
    {
      id: 3,
      name: "Organic Milk",
      description: "Certified organic milk from free-range, grass-fed cows.",
      price: 450,
      image: "https://images.unsplash.com/photo-1572443490709-e57452e86fe8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      category: "organic",
      isPopular: true
    },
    {
      id: 4,
      name: "Almond Milk",
      description: "Plant-based milk alternative made from almonds.",
      price: 375,
      image: "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      category: "plant-based"
    },
    {
      id: 5,
      name: "Oat Milk",
      description: "Creamy plant-based milk alternative made from oats.",
      price: 340,
      image: "https://images.unsplash.com/photo-1590502593747-42a996133562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      category: "plant-based"
    },
    {
      id: 6,
      name: "Chocolate Milk",
      description: "Delicious chocolate-flavored milk, perfect for a treat.",
      price: 320,
      image: "https://images.unsplash.com/photo-1607446045710-d5a8fd0895f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      category: "flavored"
    },
    {
      id: 7,
      name: "A2 Milk",
      description: "Premium A2 protein milk for better digestion.",
      price: 599,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      category: "regular",
      isPopular: true
    },
    {
      id: 8,
      name: "Fresh Paneer",
      description: "Homemade soft and tender paneer made from whole milk.",
      price: 399,
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      category: "dairy-products"
    },
    {
      id: 9,
      name: "Natural Yogurt",
      description: "Probiotic-rich yogurt made with fresh milk.",
      price: 220,
      image: "https://images.unsplash.com/photo-1570696516188-ade861b84a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      category: "dairy-products"
    },
  ];

  const [products, setProducts] = useState<Product[]>(allProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState("morning");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  // Filter products by category
  const filterProducts = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      setProducts(allProducts);
    } else {
      setProducts(allProducts.filter(product => product.category === category));
    }
  };

  // Filter popular products
  const filterPopular = () => {
    setSelectedCategory("popular");
    setProducts(allProducts.filter(product => product.isPopular));
  };

  const addToCart = (product: Product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: (updatedCart[existingItemIndex].quantity || 1) + 1
      };
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    toast("Added to cart", {
      description: `${product.name} has been added to your cart.`
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    toast("Removed from cart", {
      description: "Item has been removed from your cart."
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const updatedCart = cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
  };

  const toggleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
      toast("Removed from favorites", {
        description: "Item has been removed from your favorites."
      });
    } else {
      setFavorites([...favorites, productId]);
      toast("Added to favorites", {
        description: "Item has been added to your favorites."
      });
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const placeOrder = () => {
    if (!deliveryAddress) {
      toast("Error", {
        description: "Please enter your delivery address."
      });
      return;
    }
    
    toast("Order Placed", {
      description: "Your order has been placed successfully."
    });
    
    setCartItems([]);
    setShowCheckout(false);
    setShowCart(false);
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
          <nav className="flex space-x-4 items-center">
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
            <Button 
              variant="outline" 
              className="relative"
              onClick={() => setShowCart(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Milk Products</h1>
        
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Button 
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => filterProducts("all")}
          >
            All
          </Button>
          <Button 
            variant={selectedCategory === "popular" ? "default" : "outline"}
            onClick={filterPopular}
          >
            Popular
          </Button>
          <Button 
            variant={selectedCategory === "regular" ? "default" : "outline"}
            onClick={() => filterProducts("regular")}
          >
            Regular
          </Button>
          <Button 
            variant={selectedCategory === "organic" ? "default" : "outline"}
            onClick={() => filterProducts("organic")}
          >
            Organic
          </Button>
          <Button 
            variant={selectedCategory === "plant-based" ? "default" : "outline"}
            onClick={() => filterProducts("plant-based")}
          >
            Plant-Based
          </Button>
          <Button 
            variant={selectedCategory === "flavored" ? "default" : "outline"}
            onClick={() => filterProducts("flavored")}
          >
            Flavored
          </Button>
          <Button 
            variant={selectedCategory === "dairy-products" ? "default" : "outline"}
            onClick={() => filterProducts("dairy-products")}
          >
            Dairy Products
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart 
                    className={`h-5 w-5 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} 
                  />
                </Button>
                {product.isPopular && (
                  <Badge className="absolute top-2 left-2" variant="secondary">
                    Popular
                  </Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{formatPrice(product.price)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{product.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => addToCart(product)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button asChild>
                  <Link to={`/products/${product.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Shopping Cart Dialog */}
        <Dialog open={showCart} onOpenChange={setShowCart}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Your Cart</DialogTitle>
            </DialogHeader>
            {cartItems.length === 0 ? (
              <div className="py-6 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                <p className="mt-1 text-sm text-gray-500">Add items to get started.</p>
              </div>
            ) : (
              <div className="space-y-4 mt-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <div>
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                      >
                        -
                      </Button>
                      <span>{item.quantity || 1}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
                <DialogFooter className="sm:justify-between">
                  <Button variant="outline" className="mt-2 sm:mt-0" onClick={() => setCartItems([])}>
                    Clear Cart
                  </Button>
                  <Button onClick={() => {
                    setShowCart(false);
                    setShowCheckout(true);
                  }}>
                    Checkout
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Checkout Dialog */}
        <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Checkout</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Order Summary</h3>
                  <ul className="mt-2 divide-y">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex justify-between py-2">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="ml-2 text-sm text-gray-500">x{item.quantity || 1}</span>
                        </div>
                        <span>{formatPrice(item.price * (item.quantity || 1))}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress">Delivery Address</Label>
                  <Input
                    id="deliveryAddress"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter your full address"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Delivery Time</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant={deliveryTime === "morning" ? "default" : "outline"}
                      onClick={() => setDeliveryTime("morning")}
                    >
                      Morning (7-10 AM)
                    </Button>
                    <Button
                      type="button"
                      variant={deliveryTime === "afternoon" ? "default" : "outline"}
                      onClick={() => setDeliveryTime("afternoon")}
                    >
                      Afternoon (12-3 PM)
                    </Button>
                    <Button
                      type="button"
                      variant={deliveryTime === "evening" ? "default" : "outline"}
                      onClick={() => setDeliveryTime("evening")}
                    >
                      Evening (5-8 PM)
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="justify-start"
                    >
                      Pay on Delivery
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="justify-start"
                    >
                      Wallet (₹{walletBalance.toFixed(2)})
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCheckout(false)}>Cancel</Button>
              <Button onClick={placeOrder}>Place Order</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>

      <footer className="bg-gray-900 text-white py-12">
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

export default Products;
