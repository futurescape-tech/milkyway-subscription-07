
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ShoppingCart, IndianRupee, Heart, Filter, ShieldCheck } from "lucide-react";
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
      image: "/lovable-uploads/dfa6299d-8442-4025-a976-3edab27f24b6.png",
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
      image: "/lovable-uploads/053e3dbc-e1f3-451e-8e6b-cb42d26cb4d2.png",
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
      image: "/lovable-uploads/8a14069f-517c-49ed-ba98-18b0c5030010.png",
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

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart_items');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing saved cart:', e);
      }
    }

    const savedFavorites = localStorage.getItem('favorite_products');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Error parsing saved favorites:', e);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favorite_products', JSON.stringify(favorites));
  }, [favorites]);

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
    
    toast.success("Added to cart", {
      description: `${product.name} has been added to your cart.`
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    toast.success("Removed from cart", {
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
      toast.error("Error", {
        description: "Please enter your delivery address."
      });
      return;
    }
    
    toast.success("Order Placed", {
      description: "Your order has been placed successfully."
    });
    
    setCartItems([]);
    setShowCheckout(false);
    setShowCart(false);
    
    // Clear the cart in localStorage
    localStorage.removeItem('cart_items');
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
      <main className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-startwell-purple">Our Milk Products</h1>
          
          <Button 
            variant="outline"
            className="relative"
            onClick={() => setShowCart(true)}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-startwell-purple text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Button>
        </div>
        
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
                  <div className="absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-blue-700 to-teal-500 animate-pulse">
                    Popular
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{formatPrice(product.price)}</CardDescription>
              </CardHeader>
              <CardContent className="pb-0">
                <p>{product.description}</p>
                <div className="flex items-center mt-3">
                  <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
                  <span className="text-xs font-medium text-green-600">Quality Guaranteed</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between mt-4">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto flex-1 sm:flex-initial"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button 
                  className="w-full sm:w-auto flex-1 sm:flex-initial"
                  asChild
                >
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
    </div>
  );
};

export default Products;
