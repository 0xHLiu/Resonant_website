"use client"

import { useState, useEffect } from "react"
import HeroSection from "@/components/hero-section"
import VoiceDemoSection from "@/components/voice-demo-section"
import FeaturesSection from "@/components/features-section"
import HowItWorksSection from "@/components/how-it-works-section"
import UseCasesSection from "@/components/use-cases-section"
import PricingSection from "@/components/pricing-section"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"
import VideoSplash from "@/components/video-splash"

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(true)
  const [hasVisited, setHasVisited] = useState(false)

  useEffect(() => {
    // Check if user has already seen the video in this session
    const visited = sessionStorage.getItem("hasSeenIntroVideo")
    if (visited) {
      setShowVideo(false)
      setHasVisited(true)
    }
  }, [])

  const handleVideoEnd = () => {
    setShowVideo(false)
    setHasVisited(true)
    // Mark that user has seen the video in this session
    sessionStorage.setItem("hasSeenIntroVideo", "true")
  }

  if (showVideo && !hasVisited) {
    return <VideoSplash onVideoEnd={handleVideoEnd} />
  }

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
