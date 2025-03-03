
import React from "react";
import { Milk } from "lucide-react";
import { getStartwellColor } from "@/lib/utils";

interface LogoProps {
  className?: string;
  withText?: boolean;
}

const OneMilkLogo: React.FC<LogoProps> = ({ className = "", withText = true }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative flex items-center justify-center">
        <Milk className="h-6 w-6 text-startwell-purple" />
      </div>
      {withText && (
        <div className="ml-2 font-medium text-xl flex items-center tracking-tight">
          <span className="text-startwell-purple">start</span>
          <span className="text-startwell-orange">well</span>
          <span className="ml-1 text-startwell-yellow">milk</span>
        </div>
      )}
    </div>
  );
};

export default OneMilkLogo;
