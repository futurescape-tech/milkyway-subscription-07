
import React from "react";
import { Milk } from "lucide-react";

interface LogoProps {
  className?: string;
  withText?: boolean;
}

const OneMilkLogo: React.FC<LogoProps> = ({ className = "", withText = true }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative flex items-center justify-center">
        <Milk className="h-6 w-6 text-blue-500" />
      </div>
      {withText && (
        <div className="ml-2 font-medium text-xl flex items-center tracking-tight">
          <span className="text-blue-500">one</span>
          <span className="text-green-600">milk</span>
        </div>
      )}
    </div>
  );
};

export default OneMilkLogo;
