"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, Download, Loader2, ArrowLeft, Settings, Volume2 } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

interface SpeechGenerationAppProps {
  onBack: () => void
}

export default function SpeechGenerationApp({ onBack }: SpeechGenerationAppProps) {
  const [text, setText] = useState("")
  const [selectedVoice, setSelectedVoice] = useState("sarah")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)
  const [generatedAudios, setGeneratedAudios] = useState<
    Array<{
      id: string
      text: string
      voice: string
      timestamp: Date
    }>
  >([])

  const audioRef = useRef<HTMLAudioElement>(null)
  const [duration, setDuration] = useState("0:00")
  const [currentTime, setCurrentTime] = useState("0:00")

  const voices = [
    {
      id: "sarah",
      name: "Sarah",
      description: "Professional & Clear",
      accent: "American English",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sarah-Ny612XHVaQsLHh959bRzk5E1TmndPU.jpeg",
    },
    {
      id: "james",
      name: "James",
      description: "Warm & Conversational",
      accent: "British English",
      avatar: "/placeholder.svg?height=128&width=128",
    },
    {
      id: "maria",
      name: "Maria",
      description: "Energetic & Friendly",
      accent: "Spanish English",
      avatar: "/placeholder.svg?height=128&width=128",
    },
    {
      id: "alex",
      name: "Alex",
      description: "Neutral & Versatile",
      accent: "Canadian English",
      avatar: "/placeholder.svg?height=128&width=128",
    },
  ]

  const selectedVoiceData = voices.find((v) => v.id === selectedVoice) || voices[0]

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
    if (!text.trim()) return

    setIsGenerating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Add to generated audios list
    const newAudio = {
      id: Date.now().toString(),
      text: text.trim(),
      voice: selectedVoice,
      timestamp: new Date(),
    }

    setGeneratedAudios((prev) => [newAudio, ...prev])
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
    link.download = `${selectedVoiceData.name.toLowerCase()}-voice-${Date.now()}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleNewGeneration = () => {
    setText("")
    setHasGenerated(false)
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="text-gray-900 font-semibold text-xl">Speech Generation</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Upgrade</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Text Input Section */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Create Voice</h2>
                  {hasGenerated && (
                    <Button variant="outline" size="sm" onClick={handleNewGeneration}>
                      New Generation
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
                      Enter your text
                    </label>
                    <Textarea
                      id="text-input"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Type or paste your text here..."
                      className="min-h-[120px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      maxLength={1000}
                      disabled={isGenerating}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-gray-500">{text.length}/1000 characters</div>
                      <div className="text-xs text-gray-500">
                        {text.length > 0 && `~${Math.ceil(text.length / 150)} seconds`}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Voice</label>
                    <Select value={selectedVoice} onValueChange={setSelectedVoice} disabled={isGenerating}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {voices.map((voice) => (
                          <SelectItem key={voice.id} value={voice.id}>
                            <div className="flex items-center gap-3">
                              <img
                                src={voice.avatar || "/placeholder.svg"}
                                alt={voice.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div>
                                <div className="font-medium">{voice.name}</div>
                                <div className="text-xs text-gray-500">{voice.accent}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !text.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Converting to speech...
                      </>
                    ) : (
                      "Convert to Speech"
                    )}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Audio Player */}
            {hasGenerated && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Generated Audio</h3>
                      <span className="text-sm text-gray-500">{duration}</span>
                    </div>

                    <audio
                      ref={audioRef}
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sarah-VuCdmOVYNsefRiTHe44bdXsdom46xs.mp3"
                      preload="metadata"
                      className="hidden"
                    />

                    {/* Waveform visualization */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-1 h-12 mb-4">
                        {Array.from({ length: 60 }).map((_, i) => (
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
                              delay: i * 0.02,
                            }}
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            onClick={handlePlayPause}
                            variant="outline"
                            size="sm"
                            className="rounded-full bg-transparent"
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <span className="text-sm text-gray-600">{currentTime}</span>
                          <Volume2 className="w-4 h-4 text-gray-400" />
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

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <img
                          src={selectedVoiceData.avatar || "/placeholder.svg"}
                          alt={selectedVoiceData.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{selectedVoiceData.name}</div>
                          <div className="text-sm text-gray-600">{selectedVoiceData.description}</div>
                          <div className="text-sm text-gray-500 mt-1 line-clamp-2">{text}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Voice Preview */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Voice</h3>
              <div className="text-center space-y-4">
                <div className="relative">
                  <img
                    src={selectedVoiceData.avatar || "/placeholder.svg"}
                    alt={selectedVoiceData.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                  />
                  {isGenerating && (
                    <div className="absolute inset-0 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedVoiceData.name}</h4>
                  <p className="text-sm text-gray-600">{selectedVoiceData.description}</p>
                  <div className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mt-2">
                    {selectedVoiceData.accent}
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Generations */}
            {generatedAudios.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Generations</h3>
                <div className="space-y-3">
                  {generatedAudios.slice(0, 5).map((audio) => (
                    <div key={audio.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <img
                          src={voices.find((v) => v.id === audio.voice)?.avatar || "/placeholder.svg"}
                          alt={voices.find((v) => v.id === audio.voice)?.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900">
                            {voices.find((v) => v.id === audio.voice)?.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate">{audio.text}</div>
                          <div className="text-xs text-gray-400 mt-1">{audio.timestamp.toLocaleTimeString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Usage Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Characters used</span>
                  <span className="text-sm font-medium">2,450 / 10,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "24.5%" }}></div>
                </div>
                <div className="text-xs text-gray-500">Resets in 23 days</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
