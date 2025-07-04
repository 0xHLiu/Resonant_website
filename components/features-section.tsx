"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Zap, Globe, Palette, Shield, Clock, Headphones } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate high-quality speech in seconds with our optimized AI models",
    },
    {
      icon: Globe,
      title: "29 Languages",
      description: "Support for multiple languages and accents to reach global audiences",
    },
    {
      icon: Palette,
      title: "Voice Cloning",
      description: "Create custom voices that match your brand or personal style",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and privacy protection for your content",
    },
    {
      icon: Clock,
      title: "Real-time Processing",
      description: "Stream audio as it's generated for immediate playback",
    },
    {
      icon: Headphones,
      title: "Studio Quality",
      description: "Professional-grade audio output suitable for any application",
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Powerful Features</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Everything you need to create professional voice content at scale
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
