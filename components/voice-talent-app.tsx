"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Upload, Mic, Play, Pause, Check, AlertCircle, FileAudio, Clock, DollarSign } from "lucide-react"
import { motion } from "framer-motion"
import { usePrivy } from '@privy-io/react-auth'
import { supabase } from '@/lib/supabase'

interface VoiceTalentAppProps {
  onBack: () => void
}

export default function VoiceTalentApp({ onBack }: VoiceTalentAppProps) {
  const { user } = usePrivy()
  const [step, setStep] = useState(1)
  const [isRecording, setIsRecording] = useState(false)
  const [hasRecording, setHasRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    experience: "",
    voiceType: "",
    languages: "",
  })
  const [apiResponse, setApiResponse] = useState<any>(null)
  const [apiError, setApiError] = useState<string | null>(null)
  const [dbError, setDbError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("audio/")) {
      setUploadedFile(file)
      simulateUpload()
    }
  }

  const simulateUpload = async () => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setUploadProgress(i)
    }

    setIsUploading(false)
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        const audioFile = new File([audioBlob], "voice-sample.wav", { type: "audio/wav" })
        setUploadedFile(audioFile)
        setHasRecording(true)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleSubmit = async () => {
    setIsUploading(true)
    setApiError(null)
    setDbError(null)
    
    try {
      // Make the HTTP API call to the publisher endpoint
      const response = await fetch("https://publisher.walrus-testnet.walrus.space/v1/blobs", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify("alloy"),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const responseData = await response.json()
      setApiResponse(responseData)
      
      // Extract blob ID from the response
      const blobId = responseData?.newlyCreated?.blobObject?.blobId
      
      if (blobId && user?.id) {
        try {
          // Save blob ID to Supabase database
          const { error: dbError } = await supabase
            .from('users')
            .update({ 
              blob_id: blobId,
              account_type: 'voice_talent',
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id)

          if (dbError) {
            console.error("Database error:", dbError)
            setDbError(dbError.message)
          }
        } catch (dbError) {
          console.error("Database error:", dbError)
          setDbError("Failed to save blob ID to database")
        }
      } else if (!blobId) {
        console.warn("No blob ID found in API response")
      } else if (!user?.id) {
        console.warn("No user ID available")
        setDbError("User not authenticated")
      }
      
      // Continue with the success flow
      setStep(4) // Success step
    } catch (error) {
      console.error("API call failed:", error)
      setApiError(error instanceof Error ? error.message : "An error occurred")
      // You might want to show an error message to the user here
    } finally {
      setIsUploading(false)
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Your Voice Sample</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Upload a clear 60-second audio sample of your natural speaking voice. This will be used to create your
                AI voice model.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Upload Option */}
              <Card className="p-6 border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Audio File</h3>
                    <p className="text-sm text-gray-600 mb-4">Upload an MP3, WAV, or M4A file (max 10MB)</p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={isUploading}
                  >
                    Choose Audio File
                  </Button>
                </div>
              </Card>

              {/* Record Option */}
              <Card className="p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                    <Mic className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Record Now</h3>
                    <p className="text-sm text-gray-600 mb-4">Record directly using your microphone</p>
                  </div>

                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-full ${
                      isRecording ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                  >
                    {isRecording ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 mr-2" />
                        Start Recording
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FileAudio className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Uploading voice sample...</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-sm text-gray-600">{uploadProgress}% complete</p>
                </div>
              </Card>
            )}

            {/* File Preview */}
            {uploadedFile && !isUploading && (
              <Card className="p-6 bg-green-50 border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-600">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button onClick={() => setStep(2)} className="bg-green-600 hover:bg-green-700 text-white">
                    Continue
                  </Button>
                </div>
              </Card>
            )}

            {/* Recording Guidelines */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Recording Guidelines</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Speak naturally in a quiet environment</li>
                    <li>• Record for at least 60 seconds</li>
                    <li>• Use clear pronunciation and consistent pace</li>
                    <li>• Avoid background noise and echo</li>
                    <li>• Include varied sentences and emotions</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Profile</h2>
              <p className="text-gray-600">
                Tell us about yourself and your voice to help users discover your unique style.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="voiceType">Voice Type</Label>
                  <Input
                    id="voiceType"
                    value={formData.voiceType}
                    onChange={(e) => setFormData((prev) => ({ ...prev, voiceType: e.target.value }))}
                    placeholder="e.g., Warm, Professional, Energetic"
                  />
                </div>

                <div>
                  <Label htmlFor="languages">Languages</Label>
                  <Input
                    id="languages"
                    value={formData.languages}
                    onChange={(e) => setFormData((prev) => ({ ...prev, languages: e.target.value }))}
                    placeholder="e.g., English (Native), Spanish (Fluent)"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself and your voice..."
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Voice Experience</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                    placeholder="Describe your voice acting, broadcasting, or speaking experience..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!formData.name || !formData.email}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Review & Submit</h2>
              <p className="text-gray-600">Review your information before submitting your voice talent application.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Voice Sample */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice Sample</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FileAudio className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">{uploadedFile?.name}</p>
                      <p className="text-sm text-gray-600">
                        {uploadedFile && (uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Play className="w-4 h-4 mr-2" />
                    Preview Audio
                  </Button>
                </div>
              </Card>

              {/* Profile Information */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Name:</span>
                    <span className="ml-2 text-gray-600">{formData.name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>
                    <span className="ml-2 text-gray-600">{formData.email}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Voice Type:</span>
                    <span className="ml-2 text-gray-600">{formData.voiceType || "Not specified"}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Languages:</span>
                    <span className="ml-2 text-gray-600">{formData.languages || "Not specified"}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Revenue Information */}
            <Card className="p-6 bg-green-50 border-green-200">
              <div className="flex items-start gap-3">
                <DollarSign className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Revenue Share</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    You'll earn 90% of all revenue generated from your voice usage. Payments are processed automatically
                    and sent to your account monthly.
                  </p>
                  <div className="text-sm text-gray-600">
                    <p>• Average monthly earnings: $500 - $2,500</p>
                    <p>• Payments via bank transfer or PayPal</p>
                    <p>• Real-time usage tracking and analytics</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isUploading}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isUploading ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-green-600" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
              <p className="text-xl text-gray-600 mb-6">Thank you for applying to become a Resonant voice talent.</p>
            </div>

            <Card className="p-6 bg-blue-50 border-blue-200 text-left max-w-2xl mx-auto">
              <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>1. Our team will review your voice sample and profile (24-48 hours)</p>
                <p>2. If approved, we'll create your AI voice model (3-5 business days)</p>
                <p>3. You'll receive an email with your voice talent dashboard access</p>
                <p>4. Start earning from your voice immediately after approval</p>
              </div>
            </Card>

            {/* API Response Display */}
            {apiResponse && (
              <Card className="p-6 bg-green-50 border-green-200 text-left max-w-2xl mx-auto">
                <h3 className="font-semibold text-gray-900 mb-3">API Response</h3>
                <div className="bg-white p-4 rounded border">
                  <pre className="text-sm text-gray-700 overflow-x-auto">
                    {JSON.stringify(apiResponse, null, 2)}
                  </pre>
                </div>
              </Card>
            )}

            {/* Error Display */}
            {apiError && (
              <Card className="p-6 bg-red-50 border-red-200 text-left max-w-2xl mx-auto">
                <h3 className="font-semibold text-red-900 mb-3">API Error</h3>
                <p className="text-sm text-red-700">{apiError}</p>
              </Card>
            )}

            {/* Database Error Display */}
            {dbError && (
              <Card className="p-6 bg-orange-50 border-orange-200 text-left max-w-2xl mx-auto">
                <h3 className="font-semibold text-orange-900 mb-3">Database Warning</h3>
                <p className="text-sm text-orange-700">{dbError}</p>
                <p className="text-xs text-orange-600 mt-2">
                  Your application was submitted successfully, but there was an issue saving to our database. 
                  Please contact support if this persists.
                </p>
              </Card>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={onBack} variant="outline">
                Return to Home
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white">Check Application Status</Button>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
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
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="text-gray-900 font-semibold text-xl">Voice Talent Application</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      {step < 4 && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Step {step} of 3</span>
              <span className="text-sm text-gray-500">{Math.round((step / 3) * 100)}% complete</span>
            </div>
            <Progress value={(step / 3) * 100} className="w-full" />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderStepContent()}</div>
    </div>
  )
}
