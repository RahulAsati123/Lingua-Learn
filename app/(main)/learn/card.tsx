"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type Props = {
  title: string;
  id: string;
  imageSrc: string;
  flag?: string;
  onClick: (id: string) => void;
  disabled?: boolean;
  active?: boolean;
};

export const Card = ({
  title,
  id,
  imageSrc,
  flag,
  onClick,
  disabled,
  active,
}: Props) => {
  const handleClick = () => {
    if (!disabled) {
      console.log("Card clicked:", title, id);
      onClick(id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <div className="min-[24px] w-full flex items-center justify-end">
        {active && (
          <div className="rounded-md bg-green-600 flex items-center justify-center p-1.5">
            <Check className="text-white stroke-[4] h-4 w-4" />
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center gap-3">
        <div className="text-6xl">
          {flag || "🌍"}
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">Learn {title}</p>
        </div>
      </div>
    </div>
  );
};
