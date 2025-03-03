
import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/providers/KeycloakProvider';
import UserProfile from '@/components/UserProfile';
import OneMilkLogo from '@/components/OneMilkLogo';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { isLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          
          <div className="ml-auto hidden md:block">
            <UserProfile />
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
                  <UserProfile />
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
            &copy; {new Date().getFullYear()} Start Well Milk. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
