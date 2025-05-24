"use client";

import { Heart, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  variant: "points" | "hearts";
  value: number;
};

export const ResultCard = ({ variant, value }: Props) => {
  const Icon = variant === "hearts" ? Heart : Trophy;

  return (
    <div className="rounded-2xl border-2 w-full">
      <div className="p-1.5 text-white bg-orange-400 rounded-t-xl font-bold text-center uppercase text-xs">
        {variant === "hearts" ? "Hearts Left" : "Total XP"}
      </div>
      <div className="rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg">
        <Icon
          className={cn(
            "h-8 w-8 mr-1.5",
            variant === "hearts" ? "fill-red-500 text-red-500" : "fill-orange-400 text-orange-400"
          )}
        />
        {value}
      </div>
    </div>
  );
};
