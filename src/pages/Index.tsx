import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import OneMilkLogo from "@/components/OneMilkLogo";
import { IndianRupee } from "lucide-react";

const Index = () => {
  const handleExploreClick = () => {
    toast({
      title: "Welcome to OneMilk!",
      description: "Explore our subscription options for fresh milk delivery.",
    });
  };

  // Featured product data
  const featuredProducts = [
    {
      id: 1,
      name: "Whole Milk",
      description: "Creamy and rich whole milk from grass-fed cows.",
      price: 299,
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
    },
    {
      id: 2,
      name: "Low-Fat Milk",
      description: "Low-fat milk with all the nutrition and less fat.",
      price: 259,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
    },
    {
      id: 3,
      name: "Organic Milk",
      description: "Certified organic milk from free-range, grass-fed cows.",
      price: 450,
      image: "https://images.unsplash.com/photo-1572443490709-e57452e86fe8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
    },
  ];

  // Format price in INR
  const formatPrice = (price: number) => {
    return (
      <div className="flex items-center">
        <IndianRupee className="h-3.5 w-3.5 mr-1" />
        <span>{price.toFixed(2)}</span>
      </div>
    );
  };

  const addToCart = (productName: string) => {
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart.`
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-12 px-4">
        <section className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">Fresh milk delivered to your doorstep</h1>
            <p className="text-xl text-gray-600">
              Subscribe to our premium milk delivery service and never run out of fresh milk again.
            </p>
            <div className="flex space-x-4">
              <Button size="lg" asChild>
                <Link to="/subscription" onClick={handleExploreClick}>Explore Plans</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Fresh milk bottles" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
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
                  <CardDescription>{formatPrice(product.price)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{product.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => addToCart(product.name)}>Add to Cart</Button>
                  <Button asChild>
                    <Link to={`/products/${product.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button size="lg" asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Subscription Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>Perfect for individuals</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-4 flex items-center">
                  <IndianRupee className="h-5 w-5 mr-1" />
                  <span>999</span>
                  <span className="text-base font-normal text-gray-500">/month</span>
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    1 liter of milk every 2 days
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Free delivery
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Basic milk varieties
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link to="/subscription">Subscribe Now</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="transition-all hover:shadow-lg border-2 border-red-400 shadow-md">
              <CardHeader>
                <CardTitle>Family</CardTitle>
                <CardDescription>Great for families</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-4 flex items-center">
                  <IndianRupee className="h-5 w-5 mr-1" />
                  <span>1,499</span>
                  <span className="text-base font-normal text-gray-500">/month</span>
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    2 liters of milk daily
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Priority delivery
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    All milk varieties
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    10% discount on additional products
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                  <Link to="/subscription">Subscribe Now</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription>For milk enthusiasts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-4 flex items-center">
                  <IndianRupee className="h-5 w-5 mr-1" />
                  <span>2,499</span>
                  <span className="text-base font-normal text-gray-500">/month</span>
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    3 liters of milk daily
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Scheduled delivery times
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Premium milk varieties
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    20% discount on additional products
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Exclusive milk tasting events
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link to="/subscription">Subscribe Now</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose OneMilk?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-white shadow-md">
              <div className="bg-red-100 mx-auto rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Always On Time</h3>
              <p className="text-gray-600">Reliable delivery schedules that fit your lifestyle.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white shadow-md">
              <div className="bg-red-100 mx-auto rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">Farm fresh milk with no preservatives or additives.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white shadow-md">
              <div className="bg-red-100 mx-auto rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Plans</h3>
              <p className="text-gray-600">Choose the plan that suits your needs and budget.</p>
            </div>
          </div>
        </section>
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

export default Index;
