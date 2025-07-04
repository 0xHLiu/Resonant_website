"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Play, Pause, Download, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function VoiceDemo() {
  const [text, setText] = useState(
    "Welcome to Resonant. Experience the future of AI-powered voice generation with natural, human-like speech that brings your words to life.",
  )
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const [duration, setDuration] = useState("0:00")
  const [currentTime, setCurrentTime] = useState("0:00")

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      const mins = Math.floor(audio.duration / 60)
      const secs = Math.floor(audio.duration % 60)
      setDuration(`${mins}:${secs.toString().padStart(2, "0")}`)
    }

    const handleTimeUpdate = () => {
      const mins = Math.floor(audio.currentTime / 60)
      const secs = Math.floor(audio.currentTime % 60)
      setCurrentTime(`${mins}:${secs.toString().padStart(2, "0")}`)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [hasGenerated])

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(false)
    setHasGenerated(true)
  }

  const handlePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sarah-VuCdmOVYNsefRiTHe44bdXsdom46xs.mp3"
    link.download = "sarah-voice-sample.mp3"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 bg-white border-gray-200 shadow-lg">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left side - Text input and controls */}
          <div className="space-y-6">
            <div>
              <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-3">
                Enter your text
              </label>
              <Textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="min-h-[120px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                maxLength={500}
              />
              <div className="text-right text-xs text-gray-500 mt-1">{text.length}/500 characters</div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !text.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Converting to speech...
                </>
              ) : (
                "Convert to speech"
              )}
            </Button>

            {/* Audio Player */}
            {hasGenerated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="bg-gray-50 rounded-xl p-4">
                  <audio
                    ref={audioRef}
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sarah-VuCdmOVYNsefRiTHe44bdXsdom46xs.mp3"
                    preload="metadata"
                    className="hidden"
                  />

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">Generated Audio</span>
                    <span className="text-xs text-gray-500">{duration}</span>
                  </div>

                  {/* Waveform visualization */}
                  <div className="flex items-center gap-1 h-8 mb-4">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-blue-500 rounded-full flex-1"
                        style={{ height: `${Math.random() * 100}%` }}
                        animate={
                          isPlaying
                            ? {
                                height: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                              }
                            : {}
                        }
                        transition={{
                          duration: 0.5,
                          repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                          delay: i * 0.05,
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={handlePlayPause}
                        variant="outline"
                        size="sm"
                        className="rounded-full bg-transparent"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <span className="text-xs text-gray-500">{currentTime}</span>
                    </div>

                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      size="sm"
                      className="rounded-full bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download MP3
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right side - Voice model */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sarah-Ny612XHVaQsLHh959bRzk5E1TmndPU.jpeg"
                  alt="Sarah - Voice Model"
                  className="w-full h-full object-cover"
                />
              </div>
              {isGenerating && (
                <div className="absolute inset-0 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
              )}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-1">Sarah</h3>
            <p className="text-sm text-gray-600 mb-2">Professional & Clear</p>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
              American English
            </div>

            <div className="mt-4 text-xs text-gray-500 max-w-xs">
              Natural, professional voice perfect for business presentations and educational content
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
