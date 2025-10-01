"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Link2, DollarSign } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 pt-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Web3 Link-in-Bio Platform</span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Your{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Web3 Identity
              </span>
              <motion.span
                className="absolute bottom-2 left-0 right-0 h-3 bg-primary/20 -z-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
            <br />
            Monetized & Simplified
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
        >
          Create your link-in-bio, accept crypto payments, and build your Web3
          presence. All in one place, powered by Aptos.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="group">
            <Link href="/dashboard">
              Get Started Free
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#features">Learn More</Link>
          </Button>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 pt-8"
        >
          {[
            { icon: Link2, text: "Custom Links" },
            { icon: DollarSign, text: "Crypto Payments" },
            { icon: Sparkles, text: "Web3 Native" },
          ].map((item) => (
            <motion.div
              key={item.text}
              className="flex items-center gap-2 text-sm text-muted-foreground"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2 rounded-full bg-primary/5">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <span>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated mockup preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pt-12"
        >
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              className="rounded-2xl border bg-card shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-muted/50 px-4 py-3 flex items-center gap-2 border-b">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-block px-4 py-1 rounded-md bg-background text-xs text-muted-foreground">
                    rely.ink/yourname
                  </div>
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/5 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-primary/20 rounded mx-auto" />
                    <div className="h-3 w-48 bg-primary/10 rounded mx-auto" />
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-12 w-full max-w-md mx-auto bg-primary/10 rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
