import React, { useState } from "react";
import Image from "next/image";

interface TooltipProps {
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="/images/icons/info.svg"
        alt="info"
        width={20}
        height={20}
        className="cursor-pointer"
      />
      {isHovered && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-start px-2 py-1 gap-4 w-[253px] bg-[#343434] shadow-lg rounded-[4px] text-white font-medium text-xs">
          {children}
        </div>
      )}
    </div>
  );
};
