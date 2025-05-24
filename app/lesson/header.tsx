"use client";

import { Heart, X } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
  courseFlag?: string;
  courseTitle?: string;
};

export const Header = ({ 
  hearts, 
  percentage, 
  hasActiveSubscription, 
  courseFlag = "🌍", 
  courseTitle = "Language" 
}: Props) => {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <button
        onClick={() => router.push("/learn")}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <X className="h-5 w-5 text-gray-600" />
      </button>
      
      <div className="flex items-center gap-2">
        <span className="text-2xl">{courseFlag}</span>
        <span className="text-sm font-medium text-gray-600">{courseTitle}</span>
      </div>
      
      <div className="flex-1 mx-4">
        <div className="h-3 bg-gray-200 rounded-full">
          <div
            className="h-3 bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1 text-center">
          {Math.round(percentage)}% Complete
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Heart className="h-5 w-5 text-red-500 fill-current" />
        <span className="font-bold text-red-500">{hearts}</span>
        {hasActiveSubscription && (
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
            Premium
          </span>
        )}
      </div>
    </header>
  );
};
