"use client";
import { cn } from "~/utils/theme-utils";
import { MobileSidebar } from "~/components/layout/mobile-sidebar";
import Link from "next/link";
import { IconMrgn } from "~/components/ui/icons";
import * as globalComponents from "~/components/common/global-components";

export default function Header() {
  return (
    <div className=" fixed left-0 right-0 top-0 z-20 border-b bg-primary dark:bg-background">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link
          href={"/"}
          className="hidden items-center justify-between gap-3 md:flex"
        >
          <IconMrgn size={35} className="dark:fill-white fill-black" />
          <h1 className="text-xl font-semibold dark:text-white text-black ">
            marginfi risk dashboard
          </h1>
        </Link>
        <div className={cn("block md:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <globalComponents.ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
