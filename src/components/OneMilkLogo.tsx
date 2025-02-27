
import React from "react";

interface LogoProps {
  className?: string;
  withText?: boolean;
}

const OneMilkLogo: React.FC<LogoProps> = ({ className = "", withText = true }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 4.5C18 4.5 16 7.5 9 7.5C6.5 7.5 4.5 6.5 4.5 6.5V24C4.5 24 6.5 31.5 18 31.5C29.5 31.5 31.5 24 31.5 24V6.5C31.5 6.5 29.5 7.5 27 7.5C20 7.5 18 4.5 18 4.5Z" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.5 16.5V24" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22.5 16.5V24" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12L9 24" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M27 12L27 24" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {withText && (
        <div className="ml-2 font-bold text-xl">
          <span className="text-red-600">one</span>
          <span className="text-gray-700">milk</span>
        </div>
      )}
    </div>
  );
};

export default OneMilkLogo;
