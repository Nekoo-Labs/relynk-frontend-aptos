"use client";

import { motion } from "motion/react";
import {
  Link2,
  DollarSign,
  BarChart3,
  Palette,
  Code,
  Shield,
  Zap,
  Globe,
  Repeat,
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: Link2,
    title: "Link-in-Bio",
    description:
      "Create a beautiful, customizable landing page with all your important links in one place.",
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-600",
  },
  {
    icon: DollarSign,
    title: "Payment Links",
    description:
      "Accept USDC payments with custom payment links. Perfect for selling digital products or services.",
    color: "from-green-500/20 to-green-600/20",
    iconColor: "text-green-600",
  },
  {
    icon: Repeat,
    title: "Subscriptions",
    description:
      "Set up recurring payments with monthly or yearly billing. Build sustainable income streams.",
    color: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-600",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Track profile views, link clicks, and payment performance with detailed analytics.",
    color: "from-orange-500/20 to-orange-600/20",
    iconColor: "text-orange-600",
  },
  {
    icon: Palette,
    title: "Customization",
    description:
      "Choose from beautiful themes or create your own with custom colors and gradients.",
    color: "from-pink-500/20 to-pink-600/20",
    iconColor: "text-pink-600",
  },
  {
    icon: Code,
    title: "Embeddable Widgets",
    description:
      "Embed payment widgets on your website with customizable iframe or JavaScript code.",
    color: "from-cyan-500/20 to-cyan-600/20",
    iconColor: "text-cyan-600",
  },
  {
    icon: Shield,
    title: "Secure & Trustless",
    description:
      "Built on Aptos blockchain. Your funds are secure with non-custodial wallet integration.",
    color: "from-red-500/20 to-red-600/20",
    iconColor: "text-red-600",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Instant transactions with low fees. Powered by Aptos for the best Web3 experience.",
    color: "from-yellow-500/20 to-yellow-600/20",
    iconColor: "text-yellow-600",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Accept payments from anywhere in the world. No borders, no restrictions.",
    color: "from-indigo-500/20 to-indigo-600/20",
    iconColor: "text-indigo-600",
  },
];

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="features" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Everything you need to
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              monetize your presence
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed for creators, freelancers, and businesses
            in the Web3 era.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group"
            >
              <div className="h-full p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300">
                {/* Animated background on hover */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
                  initial={false}
                  animate={{
                    scale: hoveredIndex === index ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon */}
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                  animate={{
                    rotate: hoveredIndex === index ? 5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>

                {/* Hover indicator */}
                <motion.div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                  animate={{
                    x: hoveredIndex === index ? 4 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
