
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
        <Milk className="h-6 w-6 text-[#673AB7]" />
      </div>
      {withText && (
        <div className="ml-2 font-medium text-xl flex items-center tracking-tight">
          <span className="text-[#673AB7]">one</span>
          <span className="text-[#FF9800]">milk</span>
          <span className="text-[#FFCA28] hidden">✓</span>
        </div>
      )}
    </div>
  );
};

export default OneMilkLogo;
