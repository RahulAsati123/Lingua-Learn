"use client";

import { cn } from "@/lib/utils";

type Props = {
  options: any[];
  onSelect: (id: string) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: string;
  disabled?: boolean;
  type: string;
};

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: Props) => {
  return (
    <div className="grid gap-2">
      {options.map((option) => (
        <div
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={cn(
            "p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-100",
            selectedOption === option.id && "border-blue-500 bg-blue-50",
            disabled && "pointer-events-none opacity-50"
          )}
        >
          {option.text}
        </div>
      ))}
    </div>
  );
};
