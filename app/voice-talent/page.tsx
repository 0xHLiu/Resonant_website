"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, UserPlus, DollarSign, Star, TrendingUp, Shield, Upload, Play } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"

export default function VoiceTalentPage() {
  const steps = [
    {
      icon: Mic,
      title: "Record Your Voice",
      description: "Upload a 60-second sample of your natural speaking voice",
      details: "Clear audio, no background noise, showcase your personality",
    },
    {
      icon: UserPlus,
      title: "Create Your Profile",
      description: "Sign up and tell us about your voice style and experience",
      details: "Add bio, voice characteristics, and sample use cases",
    },
    {
      icon: DollarSign,
      title: "Start Earning",
      description: "Promote your voice and collect 90% of all revenue",
      details: "We handle payments, licensing, and customer support",
    },
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: "90% Revenue Share",
      description: "Keep 90% of all earnings from your voice usage",
    },
    {
      icon: TrendingUp,
      title: "Passive Income",
      description: "Earn money while you sleep as people use your voice",
    },
    {
      icon: Shield,
      title: "Full Protection",
      description: "Your voice is protected with advanced licensing terms",
    },
    {
      icon: Star,
      title: "Global Reach",
      description: "Your voice can be used by creators worldwide",
    },
  ]

  const stats = [
    { value: "$2,500", label: "Average monthly earnings" },
    { value: "50K+", label: "Active voice users" },
    { value: "90%", label: "Revenue share for talent" },
    { value: "24/7", label: "Automated payments" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-sm text-green-700 font-medium">
              <DollarSign className="w-4 h-4" />
              <span>Earn 90% Revenue Share</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
              Turn your voice into
              <br />
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                passive income
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of voice talents earning money by licensing their voice for AI generation. Simple setup,
              global reach, 90% revenue share.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full"
                asChild
              >
                <Link href="/signup">Start earning today</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
              >
                <Play className="w-5 h-5 mr-2" />
                See how it works
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Start earning in 3 simple steps</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started is incredibly easy. Most voice talents are earning within 24 hours.
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
                <Card className="p-8 bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 text-center h-full">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center mx-auto">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-green-600">{index + 1}</div>
                    <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    <p className="text-sm text-gray-500">{step.details}</p>
                  </div>
                </Card>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-green-500 to-blue-600 transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Why voice talents choose Resonant</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The best platform for monetizing your voice with industry-leading revenue share
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 bg-white border-gray-200 shadow-sm h-full">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to start earning?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Create your account to access the voice talent application and start monetizing your voice
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50 border-gray-200 shadow-lg">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center mx-auto">
                  <UserPlus className="w-10 h-10 text-white" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Voice Talent Community</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                    Create your Resonant account to access the voice talent application portal. Once registered, you'll
                    be able to upload your voice sample, complete your profile, and start earning within 24-48 hours.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg font-bold text-green-600">1</span>
                    </div>
                    <p className="text-sm text-gray-700">Create account</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg font-bold text-green-600">2</span>
                    </div>
                    <p className="text-sm text-gray-700">Complete application</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg font-bold text-green-600">3</span>
                    </div>
                    <p className="text-sm text-gray-700">Start earning 90%</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full"
                    asChild
                  >
                    <Link href="/signup">Create Voice Talent Account</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:bg-white/50 px-8 py-4 text-lg font-semibold rounded-full bg-white/30"
                  >
                    Learn More
                  </Button>
                </div>

                <div className="bg-white/60 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm text-gray-700">
                    <strong>Already have an account?</strong>{" "}
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                      Sign in to apply
                    </a>
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* What You'll Get */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">What you'll get with your account</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Voice Upload Portal</h4>
                <p className="text-sm text-gray-600">Easy-to-use interface for uploading your voice samples</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Earnings Dashboard</h4>
                <p className="text-sm text-gray-600">Track your voice usage and revenue in real-time</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Voice Protection</h4>
                <p className="text-sm text-gray-600">Advanced licensing and usage controls for your voice</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Instant Payouts</h4>
                <p className="text-sm text-gray-600">Automated payments directly to your bank account</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
