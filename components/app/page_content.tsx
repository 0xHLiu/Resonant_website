"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Mic, Volume2, LogOut, User } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import SpeechGenerationApp from "@/components/speech-generation-app"
import VoiceTalentApp from "@/components/voice-talent-app"
import {usePrivy} from '@privy-io/react-auth'

export default function AppPage() {
  const {ready, authenticated, user, login, logout} = usePrivy();
  const [userType, setUserType] = useState<"speech-generation" | "voice-talent" | null>(null)

  if (!ready) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, show login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">R</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Resonant</h1>
              <p className="text-gray-600">Sign in to access your AI voice platform</p>
            </div>

            <Card className="p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Get Started</h2>
                  <p className="text-gray-600 text-sm">
                    Create an account or sign in to access speech generation and voice talent features
                  </p>
                </div>

                <Button
                  onClick={login}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 font-semibold"
                >
                  <User className="w-5 h-5 mr-2" />
                  Sign In / Create Account
                </Button>

                <div className="text-center">
                  <p className="text-gray-500 text-sm">
                    By signing in, you agree to our{" "}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // User is authenticated, show the main app content
  if (userType === "speech-generation") {
    return <SpeechGenerationApp onBack={() => setUserType(null)} />
  }

  if (userType === "voice-talent") {
    return <VoiceTalentApp onBack={() => setUserType(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="text-gray-900 font-semibold text-xl">Resonant</span>
              </div>
            </div>

            {/* User info and logout */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{user?.email?.address || user?.wallet?.address || 'User'}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* User Type Selection */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Welcome to Resonant</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose how you'd like to get started with our AI voice platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Speech Generation Option */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 h-full hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-blue-200">
              <div className="text-center space-y-6" onClick={() => setUserType("speech-generation")}>
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors">
                  <Volume2 className="w-10 h-10 text-blue-600" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Speech Generation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Convert your text into natural-sounding speech using our library of AI voices
                  </p>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600">Access 120+ AI voices</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600">29 languages supported</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600">Professional quality output</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600">Instant generation</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 font-semibold"
                  onClick={() => setUserType("speech-generation")}
                >
                  Start Creating Speech
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Voice Talent Option */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8 h-full hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-green-200">
              <div className="text-center space-y-6" onClick={() => setUserType("voice-talent")}>
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto group-hover:bg-green-200 transition-colors">
                  <Mic className="w-10 h-10 text-green-600" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Voice Talent</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Upload your voice to create an AI model and earn 90% revenue from its usage
                  </p>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">90% revenue share</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Passive income potential</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Global voice marketplace</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Voice protection & licensing</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-3 font-semibold"
                  onClick={() => setUserType("voice-talent")}
                >
                  Upload My Voice
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            Not sure which option is right for you?{" "}
            <Link href="/voice-talent" className="text-blue-600 hover:text-blue-700 font-medium">
              Learn more about voice talent opportunities
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
