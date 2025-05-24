"use client";

import { Button } from "@/components/ui/button";

type Props = {
  disabled?: boolean;
  status: "correct" | "wrong" | "none";
  onCheck: () => void;
};

export const Footer = ({ disabled, status, onCheck }: Props) => {
  return (
    <footer className="p-4 border-t">
      <Button
        disabled={disabled}
        onClick={onCheck}
        size="lg"
        variant={status === "wrong" ? "destructive" : "default"}
        className="w-full"
      >
        {status === "none" && "Check"}
        {status === "correct" && "Continue"}
        {status === "wrong" && "Try Again"}
      </Button>
    </footer>
  );
};
