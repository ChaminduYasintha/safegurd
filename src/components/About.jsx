import { CheckCircle2, ShieldCheck, Sparkles, Award, Clock, ArrowRight } from 'lucide-react'
import teamImg from '../assets/team_cleaners.jpg'

const propertyTypes = [
  'Residential properties',
  'Commercial premises',
  'Hospitals & facilities',
  'Hotels & restaurants',
]

const valuePillars = [
  {
    icon: ShieldCheck,
    title: 'Bonded, Insured & Fully Vetted',
    desc: 'Every team member passes background checks, rigorous cleaning training, and identity verification.',
  },
  {
    icon: Sparkles,
    title: 'Standardized Equipment & Supplies',
    desc: 'We arrive fully prepared with industrial scrubbers, steam cleaners, and eco-friendly sanitized solutions.',
  },
  {
    icon: Award,
    title: '100% Satisfaction Guarantee',
    desc: 'If any area does not meet your expectations, our crew will re-address it immediately without question.',
  },
  {
    icon: Clock,
    title: 'Flexible & Punctual Schedules',
    desc: 'Tailored timings for homes, busy corporate offices, and 24/7 hospitality establishments.',
  },
]

export default function About({ onBookNow }) {
  return (
    <section id="why-us" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column — Team Image & Trust Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={teamImg}
                alt="Safeguard Cleaning Professional Team"
                className="w-full h-[460px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-3 py-1 rounded-full mb-2 inline-block">
                  Verified Professionals
                </span>
                <h4 className="text-xl font-extrabold text-white">
                  Safeguard Cleaning Services (Pvt) Ltd
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Serving Sri Lanka with integrity, precision, and dedication.
                </p>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -top-6 -right-4 sm:-right-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 hidden sm:flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-extrabold text-lg">
                5★
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">Island-wide Trust</div>
                <div className="text-xs text-slate-500">Over 500+ Spaces Cleaned</div>
              </div>
            </div>
          </div>

          {/* Right Column — Content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold uppercase tracking-widest mb-3 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Why Safeguard</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-5 leading-[1.15]">
              Professional cleaning for <br />
              <span className="text-sky-600">the places that matter.</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Safeguard Cleaning Services provides cleaning support for a wide range of property types across Sri Lanka. Contact our team to discuss the service scope, schedule, and custom quotation for your location.
            </p>

            {/* 4 Property Types Checked Grid (from index.html) */}
            <div className="grid sm:grid-cols-2 gap-3.5 mb-10">
              {propertyTypes.map((prop) => (
                <div
                  key={prop}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">
                    {prop}
                  </span>
                </div>
              ))}
            </div>

            {/* Key Value Highlights */}
            <div className="grid sm:grid-cols-2 gap-5 mb-10">
              {valuePillars.slice(0, 2).map((val) => {
                const Icon = val.icon
                return (
                  <div key={val.title} className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">{val.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onBookNow()}
                className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-sky-600/30 hover:shadow-sky-500/40 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Request a Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:+94704906565"
                className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-xl text-sm border border-slate-300 transition-colors"
              >
                Call 070 490 5655
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
