import { HomepageNavbar } from "@/components/features/homepage/homepage-navbar";
import { HeroSection } from "@/components/features/homepage/hero-section";
import { FeaturesSection } from "@/components/features/homepage/features-section";
import { HowItWorksSection } from "@/components/features/homepage/how-it-works-section";
import { StatsSection } from "@/components/features/homepage/stats-section";
import { CTASection } from "@/components/features/homepage/cta-section";
import { Footer } from "@/components/features/homepage/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HomepageNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
