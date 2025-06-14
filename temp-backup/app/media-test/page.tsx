import { OptimizedImage } from "@/components/ui/optimized-image"
import { VideoPlayer } from "@/components/ui/video-player"

export default function MediaTestPage() {
  // Define image sources
  const imageSources = [
    "/images/fresh-vegetables-flat-lay-healthy-lifestyle.jpg",
    "/images/wepik-export-20230426125449.png",
    "/images/zach-inglis-t0A2NCMhXRQ-unsplash.jpg",
    "/images/chairs/designer-series/cover.jpg",
  ]

  // Video source
  const videoSource = "/videos/pexels-roman-odintsov-6666363.mp4"

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Media Optimization Test</h1>
      
      {/* Image Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Optimized Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {imageSources.concat(imageSources).map((src, index) => (
            <div key={index} className="aspect-video relative">
              <OptimizedImage
                src={src}
                alt={`Test image ${index + 1}`}
                className="rounded-lg hover:scale-105 transition-transform duration-300"
                priority={index < 3}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Optimized Video</h2>
        <div className="aspect-video w-full max-w-4xl mx-auto">
          <VideoPlayer
            src={videoSource}
            poster={imageSources[0]}
            className="rounded-lg shadow-xl"
            autoPlay
            muted
            loop
          />
        </div>
      </section>
    </main>
  )
}
