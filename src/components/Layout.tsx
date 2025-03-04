
import React, { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/providers/KeycloakProvider';
import UserProfile from '@/components/UserProfile';
import OneMilkLogo from '@/components/OneMilkLogo';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { isLoading, username, walletBalance } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [firstName, setFirstName] = useState<string>("");
  
  // Load user profile data
  useEffect(() => {
    const userProfileData = localStorage.getItem('user_profile');
    if (userProfileData) {
      try {
        const profileData = JSON.parse(userProfileData);
        if (profileData.firstName) {
          setFirstName(profileData.firstName);
        }
      } catch (e) {
        console.error('Error parsing profile data:', e);
      }
    }
  }, []);
  
  // Load cart items on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart_items');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (e) {
        console.error('Error parsing saved cart:', e);
      }
    }
    
    // Check for cart changes
    const handleStorageChange = () => {
      const updatedCart = localStorage.getItem('cart_items');
      if (updatedCart) {
        try {
          setCartItems(JSON.parse(updatedCart));
        } catch (e) {
          console.error('Error parsing updated cart:', e);
        }
      } else {
        setCartItems([]);
      }
      
      // Also check for profile data changes
      const userProfileData = localStorage.getItem('user_profile');
      if (userProfileData) {
        try {
          const profileData = JSON.parse(userProfileData);
          if (profileData.firstName) {
            setFirstName(profileData.firstName);
          }
        } catch (e) {
          console.error('Error parsing profile data:', e);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('click', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('click', handleStorageChange);
    };
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-8">
            <OneMilkLogo />
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-1 items-center">
            <div className="flex items-center gap-6 text-sm">
              <Link
                to="/"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/" ? "text-foreground font-medium" : "text-foreground/60"
                )}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/products" ? "text-foreground font-medium" : "text-foreground/60"
                )}
              >
                Products
              </Link>
              <Link
                to="/subscription"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/subscription" ? "text-foreground font-medium" : "text-foreground/60"
                )}
              >
                Subscription
              </Link>
            </div>
          </nav>
          
          {/* Cart button */}
          <div className="hidden md:flex mr-4">
            <Link to="/products" className="relative inline-flex items-center">
              <ShoppingCart className="h-5 w-5 text-foreground/60" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-startwell-purple text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
          
          <div className="ml-auto hidden md:block">
            <UserProfile firstName={firstName} />
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container py-3">
              <div className="flex flex-col space-y-3">
                <Link
                  to="/"
                  className={cn(
                    "transition-colors hover:text-foreground/80 py-2",
                    pathname === "/" ? "text-foreground font-medium" : "text-foreground/60"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className={cn(
                    "transition-colors hover:text-foreground/80 py-2",
                    pathname === "/products" ? "text-foreground font-medium" : "text-foreground/60"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  to="/subscription"
                  className={cn(
                    "transition-colors hover:text-foreground/80 py-2",
                    pathname === "/subscription" ? "text-foreground font-medium" : "text-foreground/60"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Subscription
                </Link>
                <div className="pt-2 border-t">
                  <UserProfile firstName={firstName} />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      <Separator />
      <div className="container flex-1 py-4 md:py-6 px-4 md:px-6">
        {children}
      </div>
      <footer className="border-t py-4">
        <div className="container flex items-center justify-between px-4 md:px-6">
          <p className="text-xs md:text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} StartWell Dairy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
