
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/providers/KeycloakProvider';
import UserProfile from '@/components/UserProfile';
import OneMilkLogo from '@/components/OneMilkLogo';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2 mr-4">
            <OneMilkLogo />
            <span className="text-lg font-semibold">OneMilk</span>
          </div>
          
          <nav className="flex-1 flex items-center">
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
          
          <UserProfile />
        </div>
      </header>
      <Separator />
      <div className="container flex-1 py-6">
        {children}
      </div>
      <footer className="border-t py-4">
        <div className="container flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} OneMilk. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
