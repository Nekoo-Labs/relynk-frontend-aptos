"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const stats = [
  { value: 10000, suffix: "+", label: "Active Users", duration: 2 },
  { value: 50000, suffix: "+", label: "Payment Links Created", duration: 2.5 },
  {
    value: 1000000,
    prefix: "$",
    suffix: "+",
    label: "Processed in USDC",
    duration: 3,
  },
  { value: 99.9, suffix: "%", label: "Uptime", duration: 2 },
];

function AnimatedCounter({
  value,
  duration,
  prefix = "",
  suffix = "",
}: {
  value: number;
  duration: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const steps = 60;
    const increment = value / steps;
    const stepDuration = (duration * 1000) / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCount(Math.min(increment * currentStep, value));
      } else {
        setCount(value);
        setHasAnimated(true);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, duration, hasAnimated]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toFixed(suffix === "%" ? 1 : 0);
  };

  return (
    <span>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Trusted by creators worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of creators who are already monetizing their Web3
            presence with Relynk.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <AnimatedCounter
                  value={stat.value}
                  duration={stat.duration}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </motion.div>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">
            Powered by Aptos blockchain
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {["Aptos", "USDC", "Web3", "Decentralized"].map((tech) => (
              <motion.div
                key={tech}
                className="px-6 py-3 rounded-full border bg-card"
                whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
                transition={{ duration: 0.2 }}
              >
                <span className="font-medium">{tech}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
