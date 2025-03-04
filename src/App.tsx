
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { KeycloakProvider } from "./providers/KeycloakProvider";
import { supabase } from "./services/supabase";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { toast } from "sonner";

const queryClient = new QueryClient();

interface AppProps {
  basePath?: string;
}

const App = ({ basePath = '' }: AppProps) => {
  // Add auto refresh on click functionality
  useEffect(() => {
    const handleClick = () => {
      // For local storage-based state updates, dispatch a custom event to trigger UI refresh
      window.dispatchEvent(new Event('storage'));
    };

    // Add the click listener to the entire document
    document.addEventListener('click', handleClick);

    // Clean up when component unmounts
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Update document title with new brand name
  useEffect(() => {
    document.title = "StartWell Dairy";
  }, []);

  // Set up real-time subscriptions
  useEffect(() => {
    // Subscribe to profile changes
    const profilesChannel = supabase
      .channel('public:profiles')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'profiles' 
      }, (payload) => {
        console.log('Profile updated:', payload);
        
        // Check if this is the current user's profile
        const getCurrentUser = async () => {
          const { data: { user } } = await supabase.auth.getUser();
          if (user && payload.new && user.id === payload.new.id) {
            // Refresh the UI or show a notification
            toast.info("Your profile was updated", {
              className: "bg-blue-50 text-blue-800 border-blue-200"
            });
            
            // Trigger storage event to refresh UI
            window.dispatchEvent(new Event('storage'));
          }
        };
        
        getCurrentUser();
      })
      .subscribe();

    // Clean up subscription on unmount
    return () => {
      supabase.removeChannel(profilesChannel);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <KeycloakProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={basePath}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout>
                    <Index />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/products" element={
                <ProtectedRoute>
                  <Layout>
                    <Products />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/products/:id" element={
                <ProtectedRoute>
                  <Layout>
                    <ProductDetail />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/subscription" element={
                <ProtectedRoute>
                  <Layout>
                    <Subscription />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </KeycloakProvider>
    </QueryClientProvider>
  );
};

export default App;
