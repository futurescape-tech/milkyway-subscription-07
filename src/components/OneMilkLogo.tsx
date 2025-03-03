
import React from "react";

interface LogoProps {
  className?: string;
  withText?: boolean;
}

const OneMilkLogo: React.FC<LogoProps> = ({ className = "", withText = true }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative flex items-center justify-center">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 8.10551C10.3085 4.58707 2 7.49472 2 13.5981C2 16.3849 4.33579 19 8 19C11.6642 19 14 16.3849 14 13.5981V8.10551L13 8.10551Z" stroke="#0FA0CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 5V3.53932C13 2.86794 12.5224 2.28661 11.8684 2.13429V2.13429C10.9317 1.91482 10 2.61049 10 3.57293V6" stroke="#0FA0CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 6H13" stroke="#0FA0CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {withText && (
        <div className="ml-2 font-medium text-xl flex items-center tracking-tight">
          <span className="text-blue-500">one</span>
          <span className="text-gray-800">milk</span>
        </div>
      )}
    </div>
  );
};

export default OneMilkLogo;
