"use client"
import HeroSection from "@/components/hero-section"
import VoiceDemoSection from "@/components/voice-demo-section"
import FeaturesSection from "@/components/features-section"
import HowItWorksSection from "@/components/how-it-works-section"
import UseCasesSection from "@/components/use-cases-section"
import PricingSection from "@/components/pricing-section"
import Footer from "@/components/footer"
import LiquidBackground from "@/components/liquid-background"

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <LiquidBackground />

      <div className="relative z-10">
        <HeroSection />
        <VoiceDemoSection />
        <FeaturesSection />
        <HowItWorksSection />
        <UseCasesSection />
        <PricingSection />
        <Footer />
      </div>
    </div>
  )
}
