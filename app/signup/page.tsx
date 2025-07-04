"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, CheckCircle, Loader2, AlertCircle } from "lucide-react"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [accountType, setAccountType] = useState<"user" | "talent">("user")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToMarketing: false,
  })

  const benefits = {
    user: [
      "Access to 120+ AI voices",
      "Generate up to 10,000 characters/month free",
      "High-quality audio downloads",
      "Commercial usage rights",
      "24/7 customer support",
    ],
    talent: [
      "Earn 90% revenue share",
      "Global voice marketplace",
      "Automated payments",
      "Voice protection & licensing",
      "Real-time earnings dashboard",
    ],
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) return "First name is required"
    if (!formData.lastName.trim()) return "Last name is required"
    if (!formData.email.trim()) return "Email is required"
    if (!formData.password) return "Password is required"
    if (!formData.confirmPassword) return "Please confirm your password"
    if (formData.password !== formData.confirmPassword) return "Passwords do not match"
    if (formData.password.length < 8) return "Password must be at least 8 characters long"
    if (!formData.agreeToTerms) return "You must agree to the terms of service"

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) return "Please enter a valid email address"

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          accountType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account")
      }

      setSuccess(true)

      // Redirect after success
      setTimeout(() => {
        if (accountType === "talent") {
          router.push("/voice-talent/dashboard")
        } else {
          router.push("/dashboard")
        }
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Card className="p-8 bg-white shadow-lg max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h2>
            <p className="text-gray-600 mb-6">
              {accountType === "talent"
                ? "Welcome to the Resonant voice talent community! You'll be redirected to your dashboard shortly."
                : "Welcome to Resonant! You'll be redirected to your dashboard shortly."}
            </p>
            <div className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              <span className="ml-2 text-sm text-gray-600">Redirecting...</span>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to home</span>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Form */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Card className="p-8 bg-white shadow-lg">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
                  <p className="text-gray-600">Join thousands of creators using Resonant for AI voice generation</p>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span className="text-red-700 text-sm">{error}</span>
                  </motion.div>
                )}

                {/* Account Type Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-4">I want to:</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setAccountType("user")}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        accountType === "user" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-semibold text-gray-900">Use AI voices</div>
                      <div className="text-sm text-gray-600">Create content with our voice library</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAccountType("talent")}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        accountType === "talent"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-semibold text-gray-900">License my voice</div>
                      <div className="text-sm text-gray-600">Earn money from voice talent</div>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="John"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Doe"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="john@example.com"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-10 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Create a strong password"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Confirm your password"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                        className="mt-1"
                        disabled={isLoading}
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                        I agree to the{" "}
                        <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="marketing"
                        checked={formData.agreeToMarketing}
                        onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked as boolean)}
                        className="mt-1"
                        disabled={isLoading}
                      />
                      <label htmlFor="marketing" className="text-sm text-gray-600 leading-relaxed">
                        I'd like to receive product updates and marketing communications
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={!formData.agreeToTerms || isLoading}
                    className={`w-full py-3 rounded-full font-semibold text-lg ${
                      accountType === "talent" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                    } text-white disabled:opacity-50`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Creating account...
                      </>
                    ) : accountType === "talent" ? (
                      "Create Voice Talent Account"
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  {/* Sign In Link */}
                  <div className="text-center">
                    <p className="text-gray-600">
                      Already have an account?{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                        Sign in
                      </a>
                    </p>
                  </div>
                </form>
              </Card>
            </motion.div>

            {/* Right Side - Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:sticky lg:top-24"
            >
              <Card className="p-8 bg-white shadow-lg">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {accountType === "talent" ? "Voice Talent Benefits" : "Creator Benefits"}
                  </h2>
                  <p className="text-gray-600">
                    {accountType === "talent"
                      ? "Start earning from your voice today"
                      : "Everything you need to create amazing content"}
                  </p>
                </div>

                <div className="space-y-4">
                  {benefits[accountType].map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle
                        className={`w-5 h-5 ${accountType === "talent" ? "text-green-500" : "text-blue-500"} flex-shrink-0`}
                      />
                      <span className="text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {accountType === "talent" && (
                  <div className="mt-8 p-4 bg-green-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-1">90%</div>
                      <div className="text-sm text-green-700">Revenue share for voice talents</div>
                    </div>
                  </div>
                )}

                {accountType === "user" && (
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">10,000</div>
                      <div className="text-sm text-blue-700">Free characters per month</div>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
