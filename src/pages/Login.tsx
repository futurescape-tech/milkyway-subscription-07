
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/KeycloakProvider";
import { login } from "@/services/supabase";
import OneMilkLogo from "@/components/OneMilkLogo";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { refresh } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use the credentials from the form
      const result = await login(username, password);
      
      if (result.success) {
        // If login was successful, refresh auth context and navigate
        await refresh();
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#E1D4F3]/40 p-4">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-xl bg-white/90 p-8 shadow-lg backdrop-blur">
        <div className="flex flex-col items-center justify-center space-y-4">
          <OneMilkLogo className="h-12 w-auto" />
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-[#673AB7]">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-[#673AB7]">Username</Label>
            <Input
              id="username"
              placeholder="917447744458"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="startwell-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#673AB7]">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="startwell-input"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
