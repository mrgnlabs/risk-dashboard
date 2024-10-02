"use client";
import Link from "next/link";
import { type NavItem } from "~/types";
import { usePathname } from "next/navigation";
import { cn } from "~/utils/theme-utils";
import { useSidebar } from "~/hooks/use-sidebar";
import { buttonVariants } from "~/components/ui/button";
import { useEffect, useState } from "react";

interface SideNavProps {
  items: NavItem[];
  setOpen?: (open: boolean) => void;
  className?: string;
}

export function SideNav({ items, setOpen, className }: SideNavProps) {
  const path = usePathname();
  const { isOpen } = useSidebar();
  const [openItem, setOpenItem] = useState("");
  const [lastOpenItem, setLastOpenItem] = useState("");

  useEffect(() => {
    if (isOpen) {
      setOpenItem(lastOpenItem);
    } else {
      setLastOpenItem(openItem);
      setOpenItem("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <nav className="space-y-2">
      {items.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          onClick={() => {
            if (setOpen) setOpen(false);
          }}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "group relative flex h-12 font-normal justify-start items-center transition-colors",
            // Adjust for light/dark mode
            "bg-foreground text-background hover:bg-gray-200 dark:bg-background dark:text-foreground dark:hover:bg-muted",
            isOpen &&
              path === item.href &&
              "font-bold bg-gray-300 dark:bg-muted"
          )}
        >
          <item.icon
            className={cn(
              "h-5 w-5 transition-colors",
              "text-background dark:text-foreground"
            )}
            onMouseOver={(e) => {
              e.preventDefault();
            }}
          />
          <span
            className={cn(
              "absolute left-12 text-base transition-colors",
              "text-background dark:text-foreground",
              !isOpen && className,
              " dark:bg-muted bg-gray-200 text-background dark:text-foreground"
            )}
          >
            {item.title}
          </span>
        </Link>
      ))}
    </nav>
  );
}
