"use client";
import { cn } from "~/utils/themeUtils";
import { MobileSidebar } from "~/components/layout/mobile-sidebar";
import Link from "next/link";
import { IconMrgn } from "~/components/ui/icons";

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link
          href={"/"}
          className="hidden items-center justify-between gap-3 md:flex"
        >
          <IconMrgn size={25} />
          <h1 className="text-xl font-semibold">Marginfi Risk Dashboard</h1>
        </Link>
        <div className={cn("block md:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2"></div>
      </nav>
    </div>
  );
}
