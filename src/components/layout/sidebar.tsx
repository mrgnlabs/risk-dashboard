"use client";
import React, { useState } from "react";
import { SideNav } from "~/components/layout/side-nav";
import { NavItems } from "~/constants/side-nav";

import { cn } from "~/utils/theme-utils";
import { useSidebar } from "~/hooks/use-sidebar";
import { IconArrowLeft } from "~/components/ui/icons";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const { isOpen, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r pt-20 md:block bg-primary dark:bg-background`,
        status && "duration-500",
        isOpen ? "w-72" : "w-[78px]",
        className
      )}
    >
      <IconArrowLeft
        className={cn(
          "absolute -right-3 top-20 cursor-pointer rounded-full border bg-primary dark:bg-background text-3xl text-background dark:text-foreground",
          !isOpen && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <SideNav
              className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:dark:bg-background group-hover:dark:text-white group-hover:text-black  group-hover:p-2 group-hover:opacity-100"
              items={NavItems}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
