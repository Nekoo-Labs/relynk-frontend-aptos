"use client";

import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { WalletSelector } from "./wallet-selector";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0);
  });

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out",
        {
          "max-w-sm rounded-md left-1/2 translate-x-[-50%]": isScrolled,
        }
      )}
    >
      <div
        className={cn(
          "min-h-20 px-4 flex items-center justify-between w-full border-b transition-all duration-300 ease-in-out",
          {
            "border backdrop-blur-sm rounded-md justify-center rounded-b-full":
              isScrolled,
          }
        )}
      >
        <div className="flex items-center gap-2">
          <Link />
          <p className="text-2xl font-bold text-primary">Relynk</p>
        </div>
        {!isScrolled && <WalletSelector />}
      </div>
    </nav>
  );
}
