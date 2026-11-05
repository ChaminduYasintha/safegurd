import { useState, useEffect } from 'react'
import {
  Check,
  Calendar,
  Clock,
  User,
  MapPin,
  Loader2,
  MessageCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Phone,
  CheckCircle2,
  Star,
} from 'lucide-react'
import logoImg from '../assets/logo.jpg'
import glassImg from '../assets/service_glass.jpg'
import sofaImg from '../assets/service_sofa.jpg'
import floorImg from '../assets/service_floor.jpg'
import washroomImg from '../assets/service_washroom.jpg'
import gardenImg from '../assets/service_garden.jpg'
import allImg from '../assets/service_all.jpg'

const SAFEGUARD_SERVICES = [
  { id: 'glass', label: 'Glass, Door & Window Cleaning', desc: 'Clear, streak-free windows & glass doors', tag: 'Standard', img: glassImg },
  { id: 'sofa', label: 'Sofa, Mattress & Furniture Care', desc: 'Deep upholstery sanitization & shampooing', tag: 'Deep Clean', img: sofaImg },
  { id: 'floor', label: 'Floor Scrubbing & Polishing', desc: 'Machine scrubbing & high-gloss floor finish', tag: 'Floor Care', img: floorImg },
  { id: 'washroom', label: 'Washroom Cleaning & Disinfection', desc: 'Deep disinfection for tiles, grout & fixtures', tag: 'Disinfection', img: washroomImg },
  { id: 'garden', label: 'Garden & Pond Cleaning', desc: 'Outdoor maintenance & water feature cleaning', tag: 'Outdoor', img: gardenImg },
  { id: 'all', label: 'All Cleaning Works', desc: 'Tailored whole-property cleaning service', tag: 'Full Scope', img: allImg },
  { id: 'residential', label: 'Residential Care Package', desc: 'Complete house or apartment care package', tag: 'Home Package', img: sofaImg },
  { id: 'commercial', label: 'Commercial Care Package', desc: 'Offices, shops and corporate workspace care', tag: 'Office Package', img: floorImg },
  { id: 'facility', label: 'Facility & Deep Cleaning Package', desc: 'Hotels, restaurants, hospitals & clinics', tag: 'Facility Care', img: washroomImg },
]

const PROPERTY_TYPES = [
  { id: '1-2rooms', label: '1 - 2 Rooms / Studio', subtitle: 'Apartment / Small Office' },
  { id: '3-4rooms', label: '3 - 4 Bedrooms / House', subtitle: 'Standard Family Residence' },
  { id: '5plus', label: '5+ Rooms / Large Residence', subtitle: 'Multi-story Home / Villa' },
  { id: 'commercial', label: 'Commercial Building / Floor', subtitle: 'Workplace / Retail / Medical' },
]

const TIME_SLOTS = [
  '8:00 AM - 10:00 AM (Morning)',
  '10:00 AM - 12:00 PM (Midday)',
  '1:00 PM - 3:00 PM (Afternoon)',
  '3:00 PM - 5:00 PM (Late Afternoon)',
]

const FREQUENCIES = [
  { id: 'onetime', label: 'One-Time Clean', desc: 'Thorough single service' },
  { id: 'weekly', label: 'Weekly Regular', desc: 'Save 10% on recurring' },
  { id: 'biweekly', label: 'Bi-Weekly', desc: 'Every 2 weeks schedule' },
  { id: 'monthly', label: 'Monthly Deep', desc: 'Routine monthly refresh' },
]

const STEPS = [
  { num: 1, label: 'Service & Property' },
  { num: 2, label: 'Schedule' },
  { num: 3, label: 'Contact Details' },
  { num: 4, label: 'Review & Confirm' },
]

function getMinDate() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

export default function BookingPage({ onBackToHome, initialService = null, initialParams = {} }) {
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [bookingRef, setBookingRef] = useState('')

  // Pre-select initial service if passed from hero/services
  const initialSvcObj = initialService
    ? SAFEGUARD_SERVICES.find(
        (s) =>
          s.label.toLowerCase().includes(initialService.toLowerCase()) ||
          initialService.toLowerCase().includes(s.label.toLowerCase())
      ) || SAFEGUARD_SERVICES[0]
    : SAFEGUARD_SERVICES[0]

  const [booking, setBooking] = useState({
    service: initialSvcObj,
    propertyType: PROPERTY_TYPES[1],
    rooms: initialParams?.rooms || 3,
    baths: initialParams?.baths || 2,
    date: '',
    time: TIME_SLOTS[0],
    frequency: FREQUENCIES[0],
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Kadawatha / Colombo',
    notes: initialParams?.notes || initialParams?.message || '',
  })

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step, submitted])

  const set = (key, val) => setBooking((prev) => ({ ...prev, [key]: val }))

  const canProceed = () => {
    if (step === 1) return booking.service && booking.propertyType
    if (step === 2) return booking.date && booking.time
    if (step === 3) return booking.name.trim() && booking.phone.trim() && booking.address.trim()
    return true
  }

  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      const refId = `SCS-${Math.floor(100000 + Math.random() * 900000)}`
      setBookingRef(refId)
      setSubmitting(false)
      setSubmitted(true)
    }, 800)
  }

  const handleSendViaWhatsApp = () => {
    const text = encodeURIComponent(
      `*SAFEGUARD CLEANING SERVICES - ONLINE BOOKING*\n` +
      `*Reference:* ${bookingRef || 'NEW-REQ'}\n` +
      `------------------------------------\n` +
      `*Service:* ${booking.service?.label}\n` +
      `*Property:* ${booking.propertyType?.label} (${booking.rooms} Rooms, ${booking.baths} Baths)\n` +
      `*Schedule:* ${booking.date || 'Flexible'} (${booking.time})\n` +
      `*Frequency:* ${booking.frequency?.label}\n` +
      `*Customer:* ${booking.name}\n` +
      `*Phone:* ${booking.phone}\n` +
      `*Address:* ${booking.address}, ${booking.city}\n` +
      (booking.notes ? `*Special Notes:* ${booking.notes}\n` : '') +
      `------------------------------------\n` +
      `Please confirm schedule & provide tailored quotation.`
    )
    window.open(`https://wa.me/94704906565?text=${text}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* ── Top Floating Navigation Bar (CleanItGo Style) ── */}
      <header className="sticky top-4 z-40 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-full bg-white/95 backdrop-blur-md shadow-lg shadow-black/10 px-5 sm:px-7 py-2.5 flex items-center justify-between border border-white/80">
            {/* Logo */}
            <button
              onClick={onBackToHome}
              className="flex items-center group py-0.5 cursor-pointer"
              aria-label="Back to Safeguard Cleaning Home"
            >
              <img
                src={logoImg}
                alt="Safeguard Cleaning Services"
                className="h-8 sm:h-10 md:h-11 w-auto max-w-[160px] sm:max-w-[200px] object-contain group-hover:opacity-90 transition-opacity"
              />
            </button>

            {/* Back to Home CTA */}
            <div className="flex items-center gap-4">
              <a
                href="tel:+94704906565"
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-sky-600 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                <span>070 490 5655</span>
              </a>
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Booking Content ── */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20 w-full">
        {submitted ? (
          /* ── SUCCESS SCREEN ── */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200/80 text-center animate-in fade-in zoom-in-95 duration-200 mt-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/30">
              <Check className="w-10 h-10" />
            </div>

            <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full mb-3">
              Booking Received
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Thank You, {booking.name}!
            </h1>

            <p className="text-slate-600 text-base leading-relaxed mb-6">
              Your service request has been registered under Reference{' '}
              <strong className="text-slate-900 font-mono bg-slate-100 px-2 py-0.5 rounded">
                {bookingRef}
              </strong>
              . Our supervisor will contact you at{' '}
              <strong className="text-slate-900">{booking.phone}</strong> to confirm scheduling and provide your free on-site quotation.
            </p>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left mb-8 space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b border-slate-200/80">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-slate-900">{booking.service?.label}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200/80">
                <span className="text-slate-500">Property:</span>
                <span className="font-bold text-slate-900">{booking.propertyType?.label} ({booking.rooms} Rooms)</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200/80">
                <span className="text-slate-500">Target Date &amp; Slot:</span>
                <span className="font-bold text-slate-900">
                  {booking.date || 'Flexible'} &bull; {booking.time}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200/80">
                <span className="text-slate-500">Address:</span>
                <span className="font-bold text-slate-900 text-right max-w-xs">{booking.address}, {booking.city}</span>
              </div>
              {booking.notes && booking.notes.trim() && (
                <div className="flex justify-between pb-2 border-b border-slate-200/80">
                  <span className="text-slate-500">Customer Notes:</span>
                  <span className="font-bold text-slate-900 text-right max-w-xs break-words">{booking.notes}</span>
                </div>
              )}
              <div className="flex justify-between pt-1">
                <span className="text-slate-500">Pricing Terms:</span>
                <span className="font-extrabold text-emerald-700">Custom Quotation &bull; Fair Guaranteed Rates</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
              <button
                type="button"
                onClick={handleSendViaWhatsApp}
                className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-sm shadow-lg shadow-emerald-600/30 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Direct via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={onBackToHome}
                className="px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-sm transition-all cursor-pointer"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        ) : (
          /* ── BOOKING FORM WITH STEPPER & SUMMARY SIDEBAR ── */
          <div>
            {/* Page Header Banner */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-extrabold uppercase tracking-widest mb-3 border border-sky-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Online Reservation</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
                Book Your Cleaning Service
              </h1>
              <p className="text-slate-600 text-base leading-relaxed">
                Complete your service requirements below. We provide prompt on-site assessments and transparent quotations across Sri Lanka.
              </p>
            </div>

            {/* Step Indicator Bar */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 mb-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                {STEPS.map((s, idx) => (
                  <div key={s.num} className="flex items-center flex-1 last:flex-none">
                    <button
                      type="button"
                      onClick={() => {
                        if (step > s.num) setStep(s.num)
                      }}
                      disabled={step < s.num}
                      className={`flex items-center gap-2 text-left cursor-pointer disabled:cursor-default ${
                        step === s.num
                          ? 'text-sky-600 font-extrabold'
                          : step > s.num
                          ? 'text-emerald-600 font-bold'
                          : 'text-slate-400 font-medium'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold transition-all ${
                          step === s.num
                            ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 ring-4 ring-sky-100'
                            : step > s.num
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                      </div>
                      <span className="text-xs sm:text-sm hidden md:inline">
                        {s.label}
                      </span>
                    </button>
                    {idx < STEPS.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-3 sm:mx-4 ${
                          step > s.num ? 'bg-emerald-400' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Two-Column Grid: Form Left, Sticky Summary Right */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Form Content Column */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/80">
                {/* ── STEP 1: SERVICE & PROPERTY SCALE ── */}
                {step === 1 && (
                  <div className="space-y-8 animate-in fade-in duration-200">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-extrabold text-slate-900">
                            1. Select Your Required Service
                          </h3>
                          <p className="text-xs text-slate-500">
                            Choose from our specialized cleaning categories
                          </p>
                        </div>
                        <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
                          Step 1 of 4
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {SAFEGUARD_SERVICES.map((svc) => (
                          <div
                            key={svc.id}
                            onClick={() => set('service', svc)}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                              booking.service?.id === svc.id
                                ? 'border-sky-600 bg-sky-50/70 shadow-sm ring-2 ring-sky-600/20'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <img
                              src={svc.img}
                              alt={svc.label}
                              className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-slate-200"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1 mb-0.5">
                                <span className="text-xs font-extrabold text-slate-900 truncate">
                                  {svc.label}
                                </span>
                                <span className="text-[9px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full flex-shrink-0">
                                  {svc.tag}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-2">
                                {svc.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Property Scale */}
                    <div className="pt-6 border-t border-slate-100">
                      <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                        2. Select Property Scale
                      </h3>
                      <p className="text-xs text-slate-500 mb-4">
                        Helps us allocate the right equipment and crew size
                      </p>

                      <div className="grid sm:grid-cols-2 gap-3 mb-6">
                        {PROPERTY_TYPES.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => set('propertyType', p)}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                              booking.propertyType?.id === p.id
                                ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-600/20'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div className="text-sm font-extrabold text-slate-900">
                              {p.label}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              {p.subtitle}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Counters */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-slate-800">Rooms / Areas</div>
                            <div className="text-[11px] text-slate-500">Bedrooms &amp; workspaces</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => set('rooms', Math.max(1, booking.rooms - 1))}
                              className="w-9 h-9 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-base font-extrabold text-slate-900 w-4 text-center">
                              {booking.rooms}
                            </span>
                            <button
                              type="button"
                              onClick={() => set('rooms', booking.rooms + 1)}
                              className="w-9 h-9 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-slate-800">Washrooms</div>
                            <div className="text-[11px] text-slate-500">Baths to sanitize</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => set('baths', Math.max(1, booking.baths - 1))}
                              className="w-9 h-9 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-base font-extrabold text-slate-900 w-4 text-center">
                              {booking.baths}
                            </span>
                            <button
                              type="button"
                              onClick={() => set('baths', booking.baths + 1)}
                              className="w-9 h-9 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: PREFERRED SCHEDULE ── */}
                {step === 2 && (
                  <div className="space-y-8 animate-in fade-in duration-200">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-extrabold text-slate-900">
                            1. Select Preferred Cleaning Date
                          </h3>
                          <p className="text-xs text-slate-500">
                            Advance scheduling ensures preferred crew availability
                          </p>
                        </div>
                        <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
                          Step 2 of 4
                        </span>
                      </div>

                      <input
                        type="date"
                        min={getMinDate()}
                        value={booking.date}
                        onChange={(e) => set('date', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-2xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      <p className="text-xs text-slate-500 mt-2">
                        * For emergency same-day service, please call our hotline directly at <strong>070 490 5655</strong>.
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                        2. Preferred Arrival Window
                      </h3>
                      <p className="text-xs text-slate-500 mb-4">
                        Our supervisor will call 30 minutes before arrival
                      </p>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {TIME_SLOTS.map((slot) => (
                          <div
                            key={slot}
                            onClick={() => set('time', slot)}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all text-center text-xs font-bold ${
                              booking.time === slot
                                ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-600/20'
                                : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                            }`}
                          >
                            {slot}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                        3. Service Frequency
                      </h3>
                      <p className="text-xs text-slate-500 mb-4">
                        Choose one-off deep clean or recurring maintenance
                      </p>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {FREQUENCIES.map((freq) => (
                          <div
                            key={freq.id}
                            onClick={() => set('frequency', freq)}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                              booking.frequency?.id === freq.id
                                ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-600/20'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div className="text-xs font-extrabold text-slate-900">{freq.label}</div>
                            <div className="text-[11px] text-slate-500">{freq.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: CONTACT & SERVICE ADDRESS ── */}
                {step === 3 && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900">
                          Customer &amp; Location Details
                        </h3>
                        <p className="text-xs text-slate-500">
                          Where should our team report for cleaning?
                        </p>
                      </div>
                      <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
                        Step 3 of 4
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={booking.name}
                          onChange={(e) => set('name', e.target.value)}
                          placeholder="e.g. Sunil Gunawardena"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                          Contact Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={booking.phone}
                          onChange={(e) => set('phone', e.target.value)}
                          placeholder="e.g. 077 123 4567"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          value={booking.email}
                          onChange={(e) => set('email', e.target.value)}
                          placeholder="yourname@gmail.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                          City / District *
                        </label>
                        <input
                          type="text"
                          required
                          value={booking.city}
                          onChange={(e) => set('city', e.target.value)}
                          placeholder="Kadawatha, Colombo, Kelaniya, Gampaha..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                        Street Address / Landmark *
                      </label>
                      <input
                        type="text"
                        required
                        value={booking.address}
                        onChange={(e) => set('address', e.target.value)}
                        placeholder="e.g. 14/1/A, Kandy Road, opposite petrol station"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="booking-notes" className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                        Special Instructions or Customer Notes (Optional)
                      </label>
                      <textarea
                        id="booking-notes"
                        name="notes"
                        rows={3}
                        value={booking.notes}
                        onChange={(e) => set('notes', e.target.value)}
                        placeholder="Specific stains, high ceiling windows, balcony tiles, water connection availability, gate access..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* ── STEP 4: REVIEW & CONFIRM ── */}
                {step === 4 && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900">
                          Review Your Booking Request
                        </h3>
                        <p className="text-xs text-slate-500">
                          Please verify your entered details before submitting
                        </p>
                      </div>
                      <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
                        Step 4 of 4
                      </span>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                      <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
                        <img
                          src={booking.service?.img}
                          alt={booking.service?.label}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-300"
                        />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-100 px-2 py-0.5 rounded-full">
                            {booking.service?.tag}
                          </span>
                          <h4 className="text-base font-extrabold text-slate-900 mt-1">
                            {booking.service?.label}
                          </h4>
                          <p className="text-xs text-slate-500">{booking.service?.desc}</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-slate-400 block font-medium">Property Scale</span>
                          <strong className="text-slate-900 text-sm">{booking.propertyType?.label}</strong>
                          <div className="text-slate-500 mt-0.5">{booking.rooms} Rooms &bull; {booking.baths} Washrooms</div>
                        </div>

                        <div>
                          <span className="text-slate-400 block font-medium">Schedule</span>
                          <strong className="text-slate-900 text-sm">{booking.date || 'Flexible'}</strong>
                          <div className="text-slate-500 mt-0.5">{booking.time}</div>
                        </div>

                        <div>
                          <span className="text-slate-400 block font-medium">Customer</span>
                          <strong className="text-slate-900 text-sm">{booking.name}</strong>
                          <div className="text-slate-500 mt-0.5">{booking.phone} {booking.email ? `• ${booking.email}` : ''}</div>
                        </div>

                        <div>
                          <span className="text-slate-400 block font-medium">Service Address</span>
                          <strong className="text-slate-900 text-sm">{booking.address}</strong>
                          <div className="text-slate-500 mt-0.5">{booking.city}</div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200 text-xs">
                        <span className="text-slate-400 block font-medium mb-1">Customer Notes</span>
                        <div className="text-slate-800 bg-white p-3.5 rounded-xl border border-slate-200 text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {booking.notes && booking.notes.trim() ? (
                            <span>{booking.notes}</span>
                          ) : (
                            <span className="text-slate-400 italic">No special instructions provided</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stepper Navigation Buttons */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous Step</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onBackToHome}
                      className="px-5 py-3 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Home</span>
                    </button>
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      disabled={!canProceed()}
                      onClick={() => setStep(step + 1)}
                      className="px-7 py-3 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <span>Continue Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={handleSubmit}
                      className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-sky-600/30 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Confirm &amp; Send Booking</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* ── RIGHT COLUMN: STICKY LIVE SUMMARY SIDEBAR ── */}
              <div className="lg:col-span-4 sticky top-24 space-y-5">
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/80">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Booking Summary
                    </h3>
                    <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Live Estimate
                    </span>
                  </div>

                  <div className="py-4 space-y-3.5 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium mb-1">Service</span>
                      <div className="font-extrabold text-slate-900 text-sm">
                        {booking.service?.label}
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        {booking.service?.desc}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex justify-between">
                      <span className="text-slate-500">Scale:</span>
                      <span className="font-bold text-slate-800">{booking.propertyType?.label}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Rooms &amp; Baths:</span>
                      <span className="font-bold text-slate-800">{booking.rooms} Rooms &bull; {booking.baths} Baths</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Target Date:</span>
                      <span className="font-bold text-slate-800">{booking.date || 'Flexible'}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Time Window:</span>
                      <span className="font-bold text-slate-800">{booking.time}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex justify-between">
                      <span className="text-slate-500">Frequency:</span>
                      <span className="font-bold text-sky-700">{booking.frequency?.label}</span>
                    </div>

                    {booking.notes && booking.notes.trim() && (
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-slate-500 block mb-1">Customer Notes:</span>
                        <p className="text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-[11px] leading-relaxed break-words line-clamp-3">
                          {booking.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Guaranteed Trust Checklist */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-5 space-y-2 text-[11px] text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Bonded &amp; background-checked team</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Eco-friendly supplies &amp; equipment included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>100% Satisfaction guarantee or free re-clean</span>
                    </div>
                  </div>

                  {/* Pricing Scheme */}
                  <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 text-center mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 block mb-0.5">
                      Pricing Scheme
                    </span>
                    <div className="text-lg font-extrabold text-slate-900">
                      Custom Quotation
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Confirmed post quick inspection
                    </div>
                  </div>

                  {/* Hotline Help Box */}
                  <div className="text-center text-xs text-slate-500 pt-3 border-t border-slate-100">
                    <span>Prefer speaking to a supervisor?</span>
                    <a
                      href="tel:+94704906565"
                      className="block font-bold text-sky-600 hover:text-sky-700 text-sm mt-1"
                    >
                      Call 070 490 5655
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

