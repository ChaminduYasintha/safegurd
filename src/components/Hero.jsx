import { useState } from 'react'
import { CheckCircle2, Shield, Star, Clock, Users, Sparkles, ArrowRight } from 'lucide-react'
import teamImg from '../assets/team_cleaners.jpg'

const serviceOptions = [
  { id: 'residential', name: 'Residential Care', defaultRooms: 3, defaultBaths: 2, duration: '2 - 3 Hours', crew: '2 Cleaners' },
  { id: 'deep', name: 'Facility & Deep Cleaning', defaultRooms: 4, defaultBaths: 3, duration: '4 - 6 Hours', crew: '3 - 4 Cleaners' },
  { id: 'commercial', name: 'Commercial Care', defaultRooms: 5, defaultBaths: 2, duration: '3 - 5 Hours', crew: '3 Cleaners' },
  { id: 'glass', name: 'Glass & Window Cleaning', defaultRooms: 2, defaultBaths: 1, duration: '1 - 2 Hours', crew: '2 Cleaners' },
  { id: 'sofa', name: 'Sofa & Mattress Care', defaultRooms: 2, defaultBaths: 1, duration: '2 Hours', crew: '2 Cleaners' },
  { id: 'floor', name: 'Floor Scrubbing & Polishing', defaultRooms: 3, defaultBaths: 2, duration: '2 - 4 Hours', crew: '2 - 3 Cleaners' },
]

export default function Hero({ onBookNow }) {
  const [selectedService, setSelectedService] = useState(serviceOptions[0])
  const [rooms, setRooms] = useState(3)
  const [baths, setBaths] = useState(2)

  const handleSelectService = (s) => {
    setSelectedService(s)
    setRooms(s.defaultRooms)
    setBaths(s.defaultBaths)
  }

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex items-center overflow-hidden pt-28 sm:pt-36 lg:pt-36 pb-16 lg:pb-24"
      style={{
        background: 'linear-gradient(135deg, #091a27 0%, #0d2538 45%, #081d2c 100%)',
      }}
    >
      {/* ── Low-Poly Geometric Background Facets (CleanItGo Style) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* Subtle SVG Polygon Grid Overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          preserveAspectRatio="none"
          viewBox="0 0 1000 700"
        >
          <polygon points="0,0 350,0 200,320 0,250" fill="#0284c7" fillOpacity="0.15" />
          <polygon points="350,0 700,0 520,280 200,320" fill="#0369a1" fillOpacity="0.1" />
          <polygon points="700,0 1000,0 1000,350 780,260" fill="#0284c7" fillOpacity="0.18" />
          <polygon points="520,280 780,260 1000,350 680,500" fill="#0ea5e9" fillOpacity="0.08" />
          <polygon points="200,320 520,280 480,560 160,480" fill="#0284c7" fillOpacity="0.12" />
          <polygon points="0,250 200,320 160,480 0,600" fill="#0369a1" fillOpacity="0.16" />
          <polygon points="160,480 480,560 380,700 0,700" fill="#075985" fillOpacity="0.15" />
          <polygon points="480,560 680,500 820,700 380,700" fill="#0284c7" fillOpacity="0.1" />
          <polygon points="680,500 1000,350 1000,700 820,700" fill="#0369a1" fillOpacity="0.14" />
        </svg>

        {/* Ambient Radial Sky Blue Glow */}
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-25"
          style={{ background: 'radial-gradient(circle, #0284c7 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT COLUMN — High-Converting Hero Content */}
          <div className="lg:col-span-7 text-white">
            {/* CleanItGo-style Subheader Tag with left rule */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-0.5 w-8 bg-sky-400" />
              <span className="text-sky-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
                Professional · Reliable · On-Demand
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight mb-6">
              Spotless cleaning for <br />
              <span className="text-sky-400 bg-gradient-to-r from-sky-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                Home, Office &amp; Beyond
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              From regular home cleaning to deep cleans and offices, our vetted
              professionals leave every space sparkling. Reliable, standardized
              and on-demand across Sri Lanka.{' '}
              <span className="text-white font-semibold">Book in 60 seconds.</span>
            </p>

            {/* Blue Badge Checklist (Exact CleanItGo Style) */}
            <div className="flex flex-wrap gap-x-6 gap-y-2.5 mb-9">
              {[
                'Home Cleaning',
                'Deep Cleaning',
                'Office Cleaning',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base font-semibold text-slate-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Action Row */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              <button
                onClick={() => onBookNow(selectedService.name)}
                className="flex items-center gap-3 px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-base shadow-lg shadow-sky-600/30 hover:shadow-sky-500/50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Start Your Booking</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* CleanItGo Happiness Guaranteed Badge */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm leading-tight">
                    Happiness guaranteed
                  </div>
                  <div className="text-slate-400 text-xs">
                    Our promise on every booking
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Pill Badges */}
            <div className="flex flex-wrap gap-4 mt-10 pt-8 border-t border-slate-800/80">
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="flex text-amber-400 text-sm">
                  {'★'.repeat(5)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">5.0 Star Rating</div>
                  <div className="text-[10px] text-slate-400">Verified Sri Lanka Reviews</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Bonded &amp; Insured</div>
                  <div className="text-[10px] text-slate-400">Trained Professional Team</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  100%
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Eco Supplies</div>
                  <div className="text-[10px] text-slate-400">Safe for Family &amp; Pets</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Clean Modern Interactive Booking & Quick Estimator Card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Team Showcase Pill */}
            <div className="flex items-center gap-3 p-2.5 bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/70 shadow-lg">
              <img
                src={teamImg}
                alt="Safeguard Cleaning Team"
                className="w-14 h-14 rounded-xl object-cover border border-slate-600 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sri Lanka's Dedicated Cleaning Pros</span>
                </div>
                <div className="text-xs font-semibold text-white truncate">
                  Vetted Cleaners • Standardized Equipment
                </div>
                <div className="text-[11px] text-slate-400">
                  Serving Kadawatha, Colombo &amp; Island-wide
                </div>
              </div>
            </div>

            {/* Quick Estimator Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 text-slate-900 relative">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
                    Quick Booking Estimator
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    Calculate Service Scope
                  </h3>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Free Quote
                </span>
              </div>

              {/* Service Select Buttons */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select Cleaning Service
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {serviceOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectService(opt)}
                      className={`text-left text-xs font-semibold p-2.5 rounded-xl border transition-all cursor-pointer ${
                        selectedService.id === opt.id
                          ? 'border-sky-600 bg-sky-50 text-sky-900 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                      }`}
                    >
                      <div className="truncate font-bold">{opt.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Room / Unit Counters */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-600 mb-2">Rooms / Units</div>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-800 font-bold hover:bg-slate-100 flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <span className="text-base font-extrabold text-slate-900">{rooms}</span>
                    <button
                      type="button"
                      onClick={() => setRooms(rooms + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-800 font-bold hover:bg-slate-100 flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-600 mb-2">Washrooms</div>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setBaths(Math.max(1, baths - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-800 font-bold hover:bg-slate-100 flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <span className="text-base font-extrabold text-slate-900">{baths}</span>
                    <button
                      type="button"
                      onClick={() => setBaths(baths + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-800 font-bold hover:bg-slate-100 flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Calculation Info Box */}
              <div className="p-3.5 bg-gradient-to-r from-sky-50 to-emerald-50 rounded-xl border border-sky-100 mb-5">
                <div className="flex items-center justify-between text-xs text-slate-700 mb-1">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    Est. Duration:
                  </span>
                  <span className="font-bold text-slate-900">{selectedService.duration}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    Crew Assigned:
                  </span>
                  <span className="font-bold text-slate-900">{selectedService.crew}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-sky-100/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Pricing Scheme:</span>
                  <span className="text-xs font-extrabold text-sky-700 uppercase tracking-wide">
                    Custom Quote · Fair Rates
                  </span>
                </div>
              </div>

              {/* Book Button */}
              <button
                type="button"
                onClick={() => onBookNow(selectedService.name, { rooms, baths })}
                className="w-full py-3.5 px-4 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-xl shadow-lg shadow-sky-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Book This Service Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" /> No hidden fees
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Supplies included
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
