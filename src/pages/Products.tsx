
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

// Define product types
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

const Products = () => {
  // Sample product data
  const allProducts: Product[] = [
    {
      id: 1,
      name: "Whole Milk",
      description: "Creamy and rich whole milk from grass-fed cows.",
      price: 3.99,
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      category: "regular"
    },
    {
      id: 2,
      name: "Low-Fat Milk",
      description: "Low-fat milk with all the nutrition and less fat.",
      price: 3.49,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      category: "regular"
    },
    {
      id: 3,
      name: "Organic Milk",
      description: "Certified organic milk from free-range, grass-fed cows.",
      price: 5.99,
      image: "https://images.unsplash.com/photo-1572443490709-e57452e86fe8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      category: "organic"
    },
    {
      id: 4,
      name: "Almond Milk",
      description: "Plant-based milk alternative made from almonds.",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      category: "plant-based"
    },
    {
      id: 5,
      name: "Oat Milk",
      description: "Creamy plant-based milk alternative made from oats.",
      price: 4.49,
      image: "https://images.unsplash.com/photo-1590502593747-42a996133562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      category: "plant-based"
    },
    {
      id: 6,
      name: "Chocolate Milk",
      description: "Delicious chocolate-flavored milk, perfect for a treat.",
      price: 4.29,
      image: "https://images.unsplash.com/photo-1607446045710-d5a8fd0895f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      category: "flavored"
    },
  ];

  const [products, setProducts] = useState<Product[]>(allProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter products by category
  const filterProducts = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      setProducts(allProducts);
    } else {
      setProducts(allProducts.filter(product => product.category === category));
    }
  };

  const addToCart = (product: Product) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
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
        <h1 className="text-4xl font-bold mb-8 text-center">Our Milk Products</h1>
        
        <div className="mb-8 flex justify-center space-x-4">
          <Button 
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => filterProducts("all")}
          >
            All
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>${product.price.toFixed(2)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{product.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => addToCart(product)}>Add to Cart</Button>
                <Button asChild>
                  <Link to={`/products/${product.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12">
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

export default Products;
