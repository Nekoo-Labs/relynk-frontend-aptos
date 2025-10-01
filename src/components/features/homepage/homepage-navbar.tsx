"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link2, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

export function HomepageNavbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300",
          isScrolled && "backdrop-blur-lg bg-background/80 border-b"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Link2 className="w-6 h-6 text-primary" />
              </motion.div>
              <span className="text-xl font-bold">Relynk</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className={cn(
          "fixed inset-0 z-40 bg-background md:hidden",
          !isMobileMenuOpen && "pointer-events-none"
        )}
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="pt-20 px-4 pb-8 space-y-6">
          {/* Navigation Links */}
          <div className="space-y-4">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={false}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20,
                }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="block text-lg font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="space-y-3 pt-4 border-t"
            initial={false}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 20,
            }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                Sign In
              </Link>
            </Button>
            <Button className="w-full" asChild>
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                Get Started
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
