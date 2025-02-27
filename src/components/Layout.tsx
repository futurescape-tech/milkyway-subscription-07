
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-purple-800">MilkSub</Link>
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

      <main className="flex-grow">
        {children}
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

export default Layout;
