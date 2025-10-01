"use client";

import { motion } from "motion/react";
import { UserPlus, Link2, DollarSign, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description:
      "Sign up with your wallet and create your unique Relynk profile in seconds.",
    step: "01",
  },
  {
    icon: Link2,
    title: "Add Your Links",
    description:
      "Customize your link-in-bio page with your social media, websites, and content.",
    step: "02",
  },
  {
    icon: DollarSign,
    title: "Set Up Payments",
    description:
      "Create payment links for your products, services, or accept donations in USDC.",
    step: "03",
  },
  {
    icon: TrendingUp,
    title: "Grow & Earn",
    description:
      "Share your Relynk profile and start earning. Track your growth with analytics.",
    step: "04",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Get started in minutes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Setting up your Web3 presence has never been easier. Follow these
            simple steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Step number */}
              <motion.div
                className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-4 border-background z-10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl font-bold text-primary">
                  {step.step}
                </span>
              </motion.div>

              <div className="h-full p-6 pt-8 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 group">
                {/* Icon */}
                <motion.div
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <step.icon className="w-6 h-6 text-primary" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
