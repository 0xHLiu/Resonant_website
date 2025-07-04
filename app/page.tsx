"use client"
import HeroSection from "@/components/hero-section"
import VoiceDemoSection from "@/components/voice-demo-section"
import FeaturesSection from "@/components/features-section"
import HowItWorksSection from "@/components/how-it-works-section"
import UseCasesSection from "@/components/use-cases-section"
import PricingSection from "@/components/pricing-section"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <VoiceDemoSection />
      <FeaturesSection />
      <HowItWorksSection />
      <UseCasesSection />
      <PricingSection />
      <Footer />
    </div>
  )
}
