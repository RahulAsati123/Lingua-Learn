import { cn } from "@/lib/utils";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import Image from "next/image";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div className={cn(
      "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
      className,
    )}>
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image 
            src="/images/icon.png" 
            alt="LinguaLearn Logo" 
            width={40} 
            height={40}
            className="rounded-lg"
          />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            LinguaLearn
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Learn" href="/learn" iconSrc="/learn.svg" />
        <SidebarItem label="Progress" href="/progress" iconSrc="/progress.svg" />
        <SidebarItem label="Goals" href="/goals" iconSrc="/goals.svg" />
        <SidebarItem label="Leaderboard" href="/leaderboard" iconSrc="/leaderboard.svg" />
        <SidebarItem label="Quests" href="/quests" iconSrc="/quests.svg" />
        <SidebarItem label="Shop" href="/shop" iconSrc="/shop.svg" />
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-500">
          User Profile (Coming Soon)
        </div>
      </div>
    </div>
  );
};
