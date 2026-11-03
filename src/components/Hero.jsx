import { CheckCircle2, Shield, Star, ArrowRight, Phone } from 'lucide-react'
import heroBgImg from '../assets/hero_bg.jpg'

export default function Hero({ onBookNow }) {
  return (
    <section
      id="home"
      className="relative min-h-[600px] lg:min-h-[680px] flex items-center overflow-hidden py-16 sm:py-20 lg:py-28"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(8, 31, 39, 0.93) 0%, rgba(8, 31, 39, 0.82) 42%, rgba(8, 31, 39, 0.35) 75%, rgba(8, 31, 39, 0.12) 100%), url(${heroBgImg})`,
        backgroundPosition: 'center right',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full">
        <div className="max-w-2xl text-white">
          {/* Eyebrow Green Pill (Exact match to user reference screenshot) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-400/50 text-emerald-300 text-xs font-extrabold uppercase tracking-wider mb-5 shadow-sm backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>CLEAN SPACES. PROFESSIONAL CARE.</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight mb-5">
            Professional Cleaning Services for{' '}
            <span className="text-emerald-400">
              Homes &amp; Businesses
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
            Reliable, standardized and professional cleaning services in Sri Lanka for residential, commercial, hospital, hotel, restaurant and more.
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => onBookNow()}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-sm sm:text-base shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="tel:+94704906565"
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/40 font-bold rounded-xl text-sm sm:text-base backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>Call 070 490 5655</span>
            </a>
          </div>

          {/* Trust Checkmarks (Exact match from reference screenshot) */}
          <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-xs sm:text-sm font-bold text-slate-200 pt-6 border-t border-white/15">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-extrabold text-base">✓</span>
              <span>Residential</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-extrabold text-base">✓</span>
              <span>Commercial</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-extrabold text-base">✓</span>
              <span>Hospital, Hotel &amp; Restaurant</span>
            </div>
          </div>

          {/* Happiness Guaranteed & Rating Badges */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900/70 border border-slate-700/60 backdrop-blur-md text-xs">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-slate-200">Happiness Guaranteed</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/70 border border-slate-700/60 backdrop-blur-md text-xs">
              <div className="flex text-amber-400">{'★'.repeat(5)}</div>
              <span className="font-bold text-slate-200">5.0 Star Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
