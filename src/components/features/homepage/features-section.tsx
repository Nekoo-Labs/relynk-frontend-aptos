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
  ExternalLink,
  CreditCard,
  Calendar,
} from "lucide-react";
import { useState } from "react";

const coreFeatures = [
  {
    icon: Link2,
    title: "Link-in-Bio",
    description:
      "Create a beautiful, customizable landing page with all your important links in one place. Share one link everywhere.",
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-600",
    preview: "link-in-bio",
  },
  {
    icon: DollarSign,
    title: "Payment Links",
    description:
      "Accept USDC payments with custom payment links. Perfect for selling digital products, services, or accepting donations.",
    color: "from-green-500/20 to-green-600/20",
    iconColor: "text-green-600",
    preview: "payment-links",
  },
  {
    icon: Repeat,
    title: "Subscriptions",
    description:
      "Set up recurring payments with monthly or yearly billing. Build sustainable income streams with automatic renewals.",
    color: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-600",
    preview: "subscriptions",
  },
];

const additionalFeatures = [
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

function LinkInBioPreview() {
  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl border bg-gradient-to-br from-blue-500/5 to-blue-600/10 p-8 flex items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/30 border-4 border-background" />
          <div className="text-center space-y-1">
            <div className="h-5 w-32 bg-blue-500/20 rounded mx-auto" />
            <div className="h-3 w-48 bg-blue-500/10 rounded mx-auto" />
          </div>
        </div>
        <div className="space-y-3 pt-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="h-14 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex items-center justify-between px-4"
              whileHover={{ scale: 1.02, x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/30" />
                <div className="h-3 w-24 bg-blue-500/30 rounded" />
              </div>
              <ExternalLink className="w-4 h-4 text-blue-600" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaymentLinksPreview() {
  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl border bg-gradient-to-br from-green-500/5 to-green-600/10 p-8 flex items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="h-6 w-48 bg-green-500/20 rounded mx-auto" />
          <div className="h-4 w-32 bg-green-500/10 rounded mx-auto" />
        </div>
        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-green-500/30 rounded" />
                <div className="h-6 w-32 bg-green-500/40 rounded" />
              </div>
              <CreditCard className="w-8 h-8 text-green-600" />
            </div>
            <div className="pt-2 border-t border-green-500/20">
              <div className="h-3 w-full bg-green-500/20 rounded mb-2" />
              <div className="h-3 w-3/4 bg-green-500/20 rounded" />
            </div>
          </div>
          <motion.div
            className="h-12 rounded-xl bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="h-4 w-32 bg-white/30 rounded" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SubscriptionsPreview() {
  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl border bg-gradient-to-br from-purple-500/5 to-purple-600/10 p-8 flex items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {["Monthly", "Yearly"].map((plan, i) => (
            <motion.div
              key={plan}
              className={`p-4 rounded-xl border ${
                i === 0
                  ? "bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/40"
                  : "bg-purple-500/5 border-purple-500/20"
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-2">
                <div className="h-3 w-16 bg-purple-500/30 rounded" />
                <div className="h-6 w-20 bg-purple-500/40 rounded" />
                <div className="h-2 w-full bg-purple-500/20 rounded" />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <div className="h-4 w-32 bg-purple-500/30 rounded" />
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-500/30" />
                <div className="h-3 flex-1 bg-purple-500/20 rounded" />
              </div>
            ))}
          </div>
        </div>
        <motion.div
          className="h-12 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="h-4 w-32 bg-white/30 rounded" />
        </motion.div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const renderPreview = (type: string) => {
    switch (type) {
      case "link-in-bio":
        return <LinkInBioPreview />;
      case "payment-links":
        return <PaymentLinksPreview />;
      case "subscriptions":
        return <SubscriptionsPreview />;
      default:
        return null;
    }
  };

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

        {/* Core Features - Left/Right Layout */}
        <div className="space-y-24 mb-24">
          {coreFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Content */}
              <div
                className={`space-y-6 ${
                  index % 2 === 1 ? "lg:col-start-2" : ""
                }`}
              >
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </motion.div>
                <div className="space-y-3">
                  <h3 className="text-3xl md:text-4xl font-bold">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                    <span className="text-sm font-medium">Easy Setup</span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                    <span className="text-sm font-medium">Web3 Native</span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                    <span className="text-sm font-medium">USDC Payments</span>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <motion.div
                className={
                  index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                }
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {renderPreview(feature.preview)}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold">And much more...</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Additional features to help you grow and manage your Web3 presence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => (
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
