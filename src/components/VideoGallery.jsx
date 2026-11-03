import { useState, useRef } from 'react'
import { Play, ChevronLeft, ChevronRight, Sparkles, X, CheckCircle2 } from 'lucide-react'
import videoWindow from '../assets/video_window.jpg'
import videoFloor from '../assets/video_floor.jpg'
import videoWashroom from '../assets/video_washroom.jpg'

const videos = [
  {
    id: 'glass',
    title: 'Glass & Window Cleaning',
    description: 'Watch our team safely restore spotless shine and streak-free clarity to residential and high-access glass surfaces.',
    thumbnail: videoWindow,
    tag: 'Window Care',
    duration: '0:45',
  },
  {
    id: 'floor',
    title: 'Floor Scrubbing & Polishing',
    description: 'Detailed industrial floor machine scrubbing and high-gloss polishing for commercial and residential floors.',
    thumbnail: videoFloor,
    tag: 'Floor Polish',
    duration: '1:15',
  },
  {
    id: 'washroom',
    title: 'Washroom Deep Cleaning & Disinfection',
    description: 'Comprehensive hospital-grade washroom disinfection targeting tiles, grout, faucets, and sanitization points.',
    thumbnail: videoWashroom,
    tag: 'Disinfection',
    duration: '0:50',
  },
]

export default function VideoGallery({ onBookNow }) {
  const scrollRef = useRef(null)
  const [activeVideo, setActiveVideo] = useState(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <section id="videos" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold uppercase tracking-widest mb-3 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>See Our Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
              Cleaning Videos &amp; Demonstrations
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Video showcase area for Safeguard&apos;s service demonstrations, team equipment standards, and completed project walkthroughs.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-sky-50 hover:border-sky-300 text-slate-700 hover:text-sky-600 flex items-center justify-center shadow-sm transition-all cursor-pointer"
              aria-label="Previous videos"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-sky-50 hover:border-sky-300 text-slate-700 hover:text-sky-600 flex items-center justify-center shadow-sm transition-all cursor-pointer"
              aria-label="Next videos"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Cards Grid / Carousel */}
        <div
          ref={scrollRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
        >
          {videos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="group cursor-pointer relative bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 snap-start flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/40 group-hover:scale-110 group-hover:bg-emerald-400 transition-all duration-300">
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Badge & Duration */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-full">
                    {vid.tag}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-md">
                    {vid.duration}
                  </span>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6 bg-slate-900 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                    {vid.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {vid.description}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>Click to view demonstration</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Preview Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-800 relative">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-800 text-white hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute text-center p-6 text-white">
                <div className="w-16 h-16 rounded-full bg-emerald-500 mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                </div>
                <h4 className="text-xl font-extrabold mb-1">{activeVideo.title}</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Demonstration video for Safeguard Cleaning Services team operations and standardized equipment.
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-white">{activeVideo.title}</div>
                <div className="text-xs text-slate-400">Professional Equipment &amp; Trained Crew</div>
              </div>
              <button
                onClick={() => {
                  setActiveVideo(null)
                  onBookNow(activeVideo.title)
                }}
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-sm font-bold rounded-xl transition-all cursor-pointer"
              >
                Book This Service Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

