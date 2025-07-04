"use client"

import { useEffect, useRef, useState } from "react"

interface VideoSplashProps {
  onVideoEnd: () => void
}

export default function VideoSplash({ onVideoEnd }: VideoSplashProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsLoading(false)
      video.play().catch(console.error)
    }

    const handleEnded = () => {
      onVideoEnd()
    }

    const handleLoadedData = () => {
      setIsLoading(false)
    }

    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("ended", handleEnded)
    video.addEventListener("loadeddata", handleLoadedData)

    // Fallback in case video doesn't load
    const fallbackTimer = setTimeout(() => {
      if (isLoading) {
        onVideoEnd()
      }
    }, 10000) // 10 second fallback

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("loadeddata", handleLoadedData)
      clearTimeout(fallbackTimer)
    }
  }, [onVideoEnd, isLoading])

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
      >
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/C995150D-B61D-4C94-972C-24CDAA5601F2-XbAuPPkmmJF9YGhoGcUjJmC5tajHMV.mov" type="video/quicktime" />
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/C995150D-B61D-4C94-972C-24CDAA5601F2-XbAuPPkmmJF9YGhoGcUjJmC5tajHMV.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Skip button */}
      <button
        onClick={onVideoEnd}
        className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded-lg hover:bg-black/70 transition-colors text-sm"
      >
        Skip
      </button>
    </div>
  )
}
