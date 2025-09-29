"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "motion/react";
import { containerVariants } from "@/lib/motion";

export default function DashboardLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const currentPath = usePathname();

  const activeMenu = menus.find((menu) => menu.href === currentPath);

  return (
    <section
      className={
        "bg-background flex-1 w-full grid grid-rows-[auto_1fr] sm:grid-rows-none sm:grid-cols-[200px_auto] p-4 rounded-md border divide-x mx-auto container shadow-[0_0_0_8px_rgba(0,0,0,0.05)] outline outline-offset-[10px] outline-muted-foreground/10"
      }
    >
      <aside className="flex sm:flex-col gap-4 py-4 sm:py-0 sm:pr-4 overflow-x-auto">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className={cn(
              "text-primary px-2 py-1 rounded-lg min-w-max",
              activeMenu?.href === menu.href &&
                "font-semibold italic bg-secondary"
            )}
          >
            {menu.label}
          </Link>
        ))}
      </aside>
      <motion.main
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={cn("sm:px-4 space-y-4 @container", className)}
      >
        {children}
      </motion.main>
    </section>
  );
}

const menus = [
  {
    label: "Dashboard",
    href: "/dashboard/analytics",
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
  },
  {
    label: "Payment Links",
    href: "/dashboard/payment-links",
  },
];
