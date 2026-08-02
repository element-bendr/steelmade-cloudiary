"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface VideoPlayerProps {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
}

export function VideoPlayer({
  src,
  poster,
  className,
  autoPlay = false,
  muted = true,
  loop = true,
  controls = true,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setLoading] = useState(true)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <video
        ref={videoRef}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-700",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline
        onLoadedData={() => setLoading(false)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
    </div>
  )
}
