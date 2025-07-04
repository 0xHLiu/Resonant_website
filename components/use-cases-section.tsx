"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { BookOpen, Mic, Video, MessageSquare, Radio, GraduationCap } from "lucide-react"

export default function UseCasesSection() {
  const useCases = [
    {
      icon: BookOpen,
      title: "Audiobooks",
      description: "Transform written content into engaging audiobooks with natural narration",
    },
    {
      icon: Video,
      title: "Video Content",
      description: "Add professional voiceovers to your videos and presentations",
    },
    {
      icon: MessageSquare,
      title: "Chatbots & IVR",
      description: "Create conversational AI with lifelike voice responses",
    },
    {
      icon: Radio,
      title: "Podcasts",
      description: "Generate podcast content and advertisements with consistent quality",
    },
    {
      icon: GraduationCap,
      title: "E-Learning",
      description: "Make educational content more accessible with clear narration",
    },
    {
      icon: Mic,
      title: "Voice Assistants",
      description: "Power smart devices with natural, human-like voice interactions",
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
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Use Cases</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover how our text-to-speech technology can transform your projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 h-full group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{useCase.title}</h3>
                  <p className="text-white/70">{useCase.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
