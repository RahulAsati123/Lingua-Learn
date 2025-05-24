"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Trophy, Star, ShoppingCart, Activity, Flag } from "lucide-react";

type Props = {
  label: string;
  iconSrc: string;
  href: string;
};

const getIconComponent = (label: string) => {
  switch (label.toLowerCase()) {
    case 'learn':
      return BookOpen;
    case 'progress':
      return Activity;
    case 'goals':
      return Flag;
    case 'leaderboard':
      return Trophy;
    case 'quests':
      return Star;
    case 'shop':
      return ShoppingCart;
    default:
      return BookOpen;
  }
};

export const SidebarItem = ({
  label,
  iconSrc,
  href,
}: Props) => {
  const pathname = usePathname();
  const active = pathname === href;
  const IconComponent = getIconComponent(label);

  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px]"
      asChild
    >
      <Link href={href}>
        <IconComponent className="w-8 h-8 mr-5" />
        {label}
      </Link>
    </Button>
  );
};
