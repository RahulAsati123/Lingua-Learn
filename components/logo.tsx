"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  width: number;
  height: number;
  className?: string;
};

export const Logo = ({ width, height, className }: Props) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    // Fallback to emoji or text if image fails to load
    return (
      <div 
        className={`flex items-center justify-center bg-green-600 rounded-lg text-white font-bold ${className}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        🦉
      </div>
    );
  }

  return (
    <Image 
      src="/images/icon.png" 
      alt="LinguaLearn Logo" 
      width={width} 
      height={height}
      className={`rounded-lg ${className}`}
      priority
      onError={() => setImageError(true)}
    />
  );
};
