import { BookOpenCheck, LayoutDashboard, PrinterCheckIcon } from "lucide-react";
import { type NavItem } from "~/types";

export const NavItems: NavItem[] = [
  {
    title: "Summary",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
  },
  {
    title: "Risk model",
    icon: BookOpenCheck,
    href: "/risk-model",
    color: "text-sky-500",
  },
  {
    title: "Oracles",
    icon: PrinterCheckIcon,
    href: "/oracles",
    color: "text-sky-500",
  },

  // Example with children
  // {
  //   title: "Example",
  //   icon: BookOpenCheck,
  //   href: "/example",
  //   color: "text-orange-500",
  //   isChidren: true,
  //   children: [
  //     {
  //       title: "Example-01",
  //       icon: BookOpenCheck,
  //       color: "text-red-500",
  //       href: "/example/employees",
  //     },
  //     {
  //       title: "Example-02",
  //       icon: BookOpenCheck,
  //       color: "text-red-500",
  //       href: "/example/example-02",
  //     },
  //     {
  //       title: "Example-03",
  //       icon: BookOpenCheck,
  //       color: "text-red-500",
  //       href: "/example/example-03",
  //     },
  //   ],
  // },
];
