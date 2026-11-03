import { useState } from 'react'
import { CheckCircle2, Shield, Star, Clock, Users, ArrowRight, Phone } from 'lucide-react'
import heroBgImg from '../assets/hero_bg.jpg'

const serviceOptions = [
  { id: 'residential', name: 'Residential Care', defaultRooms: 3, defaultBaths: 2, duration: '2 - 3 Hours', crew: '2 Cleaners' },
  { id: 'facility', name: 'Facility & Deep Cleaning', defaultRooms: 4, defaultBaths: 3, duration: '4 - 6 Hours', crew: '3 - 4 Cleaners' },
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
    <section id="home" className="py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[620px] lg:min-h-[680px] flex items-center px-6 sm:px-10 lg:px-12 py-10 sm:py-14"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(8, 26, 39, 0.94) 0%, rgba(8, 26, 39, 0.82) 42%, rgba(8, 26, 39, 0.32) 50%, rgba(8, 26, 39, 0.78) 72%, rgba(8, 26, 39, 0.94) 100%), linear-gradient(180deg, rgba(8, 26, 39, 0.45) 0%, transparent 22%, transparent 75%, rgba(8, 26, 39, 0.85) 100%), url(${heroBgImg})`,
            backgroundPosition: '50% 20%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="relative z-10 w-full">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* ── LEFT COLUMN: High-Converting Headline & Trust Highlights ── */}
          <div className="lg:col-span-7 text-white">
            {/* Eyebrow Green Pill (Exact match to reference screenshot) */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-400/50 text-emerald-300 text-xs font-extrabold uppercase tracking-wider mb-5 shadow-sm backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CLEAN SPACES. PROFESSIONAL CARE.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight mb-5">
              Professional Cleaning Services for{' '}
              <span className="text-emerald-400 bg-gradient-to-r from-emerald-400 via-sky-300 to-sky-400 bg-clip-text text-transparent">
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
                className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-xl text-sm sm:text-base shadow-lg shadow-sky-600/30 hover:shadow-sky-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer"
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

            {/* Trust Checkmarks */}
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

          {/* ── RIGHT COLUMN: Quick Booking Estimator Calculator Card ── */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2rem] p-6 sm:p-7 shadow-2xl border border-slate-100 text-slate-900 relative">
              {/* Header Tags & Title */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                  Quick Booking Estimator
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  Free Quote
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 mb-5">
                Calculate Service Scope
              </h3>

              {/* Service Selection Buttons (2 columns) */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select Cleaning Service
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {serviceOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectService(opt)}
                      className={`text-left text-xs font-bold p-3 rounded-xl border transition-all cursor-pointer ${
                        selectedService.id === opt.id
                          ? 'border-sky-600 bg-sky-50 text-sky-900 shadow-xs ring-1 ring-sky-600'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <div className="truncate">{opt.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Counter Buttons: Rooms/Units & Washrooms */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-600 mb-2">Rooms / Units</div>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-800 font-extrabold hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-base font-extrabold text-slate-900">{rooms}</span>
                    <button
                      type="button"
                      onClick={() => setRooms(rooms + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-800 font-extrabold hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-600 mb-2">Washrooms</div>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setBaths(Math.max(1, baths - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-800 font-extrabold hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-base font-extrabold text-slate-900">{baths}</span>
                    <button
                      type="button"
                      onClick={() => setBaths(baths + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-800 font-extrabold hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Estimate Duration & Crew Box */}
              <div className="p-3.5 bg-gradient-to-r from-sky-50 to-emerald-50 rounded-2xl border border-sky-100 mb-5">
                <div className="flex items-center justify-between text-xs text-slate-700 mb-1.5">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    Est. Duration:
                  </span>
                  <span className="font-extrabold text-slate-900">{selectedService.duration}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    Crew Assigned:
                  </span>
                  <span className="font-extrabold text-slate-900">{selectedService.crew}</span>
                </div>
                <div className="mt-2.5 pt-2 border-t border-sky-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Pricing Scheme:</span>
                  <span className="text-xs font-extrabold text-sky-800 uppercase tracking-wide">
                    CUSTOM QUOTE &bull; FAIR RATES
                  </span>
                </div>
              </div>

              {/* Action Button: Renamed to "Get a Quote Now" */}
              <button
                type="button"
                onClick={() => onBookNow(selectedService.name, { rooms, baths })}
                className="w-full py-4 px-4 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-2xl shadow-lg shadow-sky-600/30 hover:shadow-sky-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Get a Quote Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust Checkmarks */}
              <div className="mt-3.5 flex items-center justify-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> No hidden fees
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Supplies included
                </span>
              </div>
            </div>
          </div>

        </div>
          </div>
        </div>
      </div>
    </section>
  )
}
