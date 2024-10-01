"use client";
import { useState, useEffect } from "react";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { SideNav } from "~/components/layout/side-nav";
import { NavItems } from "~/constants/side-nav";

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div className="flex items-center justify-center gap-2 cursor-pointer text-black bg-white hover:bg-gray-200 dark:text-white dark:bg-gray-900 dark:hover:bg-gray-700 transition-colors py-2 rounded-md">
            <MenuIcon className="w-6 h-6" /> {/* Consistent icon sizing */}
            <h1 className="text-lg font-semibold">Marginfi risk dashboard</h1>
          </div>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-72 outline-none bg-white text-black dark:bg-gray-900 dark:text-white transition-colors"
        >
          <div className="px-1 py-6 pt-16">
            <SideNav items={NavItems} setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
