"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { FileText, Settings, Download } from "lucide-react"

export default function HowItWorksSection() {
  const steps = [
    {
      icon: FileText,
      title: "Input Your Text",
      description: "Simply paste or type the text you want to convert to speech",
    },
    {
      icon: Settings,
      title: "Choose Your Voice",
      description: "Select from our library of voices or create a custom one",
    },
    {
      icon: Download,
      title: "Generate & Download",
      description: "Get your high-quality audio file in seconds",
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your text into natural-sounding speech in just three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="p-8 bg-white border-gray-200 shadow-sm hover:bg-white/15 transition-all duration-300 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-blue-400">{String(index + 1).padStart(2, "0")}</div>
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-y-1/2" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
