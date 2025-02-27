
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import OneMilkLogo from "@/components/OneMilkLogo";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="mb-8">
        <OneMilkLogo className="mx-auto" />
      </div>
      <h1 className="text-5xl font-bold mb-4 text-center">404</h1>
      <h2 className="text-2xl font-semibold mb-6 text-center">Page Not Found</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link to="/">Go Back Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
