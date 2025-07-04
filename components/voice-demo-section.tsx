"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, Volume2 } from "lucide-react"
import { useState } from "react"

export default function VoiceDemoSection() {
  const [playingId, setPlayingId] = useState<string | null>(null)

  const voiceOptions = [
    {
      id: "sarah",
      name: "Sarah",
      description: "Professional & Clear",
      accent: "American English",
      waveform: [0.2, 0.8, 0.4, 0.9, 0.3, 0.7, 0.5, 0.6, 0.8, 0.2, 0.9, 0.4, 0.7, 0.3, 0.8, 0.5],
    },
    {
      id: "james",
      name: "James",
      description: "Warm & Conversational",
      accent: "British English",
      waveform: [0.3, 0.6, 0.8, 0.4, 0.7, 0.5, 0.9, 0.2, 0.6, 0.8, 0.3, 0.7, 0.4, 0.9, 0.5, 0.6],
    },
    {
      id: "maria",
      name: "Maria",
      description: "Energetic & Friendly",
      accent: "Spanish English",
      waveform: [0.5, 0.9, 0.3, 0.7, 0.6, 0.4, 0.8, 0.2, 0.9, 0.5, 0.7, 0.3, 0.6, 0.8, 0.4, 0.7],
    },
  ]

  const handlePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id)
  }

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
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Experience Our Voices</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Listen to our AI-generated voices and discover the perfect tone for your project
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {voiceOptions.map((voice, index) => (
            <motion.div
              key={voice.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{voice.name}</h3>
                      <p className="text-white/60 text-sm">{voice.accent}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handlePlay(voice.id)}
                      className="rounded-full w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      {playingId === voice.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                  </div>

                  <p className="text-white/80 text-sm">{voice.description}</p>

                  {/* Waveform visualization */}
                  <div className="flex items-center gap-1 h-12">
                    {voice.waveform.map((height, i) => (
                      <motion.div
                        key={i}
                        className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-full flex-1"
                        style={{ height: `${height * 100}%` }}
                        animate={
                          playingId === voice.id
                            ? {
                                height: [`${height * 100}%`, `${Math.random() * 100}%`, `${height * 100}%`],
                              }
                            : {}
                        }
                        transition={{
                          duration: 0.5,
                          repeat: playingId === voice.id ? Number.POSITIVE_INFINITY : 0,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Volume2 className="w-4 h-4" />
                    <span>Sample: "Welcome to the future of voice technology"</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
