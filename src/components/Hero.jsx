import { useState } from 'react'
import { ArrowRight, Phone, ChevronLeft, Send, CheckCircle2 } from 'lucide-react'
import heroBgImg from '../assets/hero_bg.jpg'

/* ─────────────────────────────────────────────
   STEP DEFINITIONS
───────────────────────────────────────────── */

const CATEGORIES = [
  {
    id: 'residential',
    label: 'Residential',
    icon: '🏠',
    desc: 'Homes, villas & apartments',
  },
  {
    id: 'corporate',
    label: 'Corporate',
    icon: '🏢',
    desc: 'Offices, shops & facilities',
  },
]

const SUB_SERVICES = {
  residential: [
    { id: 'customized', label: 'Customized Cleaning Package', icon: '🧹' },
    { id: 'longterm',   label: 'Long Term Cleaning Agreement', icon: '🗓️' },
    { id: 'premium',    label: 'Pro Session / Premium Deep Cleaning', icon: '✨' },
  ],
  corporate: [
    { id: 'customized',   label: 'Customized Cleaning Package', icon: '🧹' },
    { id: 'longterm',     label: 'Long Term Cleaning Agreement', icon: '🗓️' },
    { id: 'fullservice',  label: 'Full Service / Premium Deep Cleaning', icon: '✨' },
  ],
}

/* ─────────────────────────────────────────────
   FORM FIELD DEFINITIONS per combination
───────────────────────────────────────────── */

const FORMS = {
  'residential-customized': {
    title: 'Customized Cleaning — Residential',
    fields: [
      { key: 'propertyType',  label: 'Property Type',           type: 'select',   options: ['House', 'Apartment', 'Villa', 'Other'] },
      { key: 'services',      label: 'Services Required',        type: 'checks',   options: ['General Cleaning', 'Kitchen Cleaning', 'Bathroom Cleaning', 'Window Cleaning', 'Floor Scrubbing', 'Sofa / Mattress Cleaning', 'Garden / Outdoor', 'Other'] },
      { key: 'frequency',     label: 'Cleaning Frequency',       type: 'select',   options: ['One-time', 'Weekly', 'Bi-weekly', 'Monthly'] },
      { key: 'name',          label: 'Your Name',                type: 'text',     placeholder: 'Full name' },
      { key: 'address',       label: 'Property Address',         type: 'text',     placeholder: 'No, Street, City' },
      { key: 'contact',       label: 'Contact Number',           type: 'tel',      placeholder: '07X XXX XXXX' },
    ],
  },
  'residential-longterm': {
    title: 'Long Term Agreement — Residential',
    fields: [
      { key: 'frequency',     label: 'Cleaning Frequency',       type: 'select',   options: ['Weekly', 'Bi-daily'] },
      { key: 'hoursPerDay',   label: 'Hours Per Day',            type: 'select',   options: ['30–35 hours', '40 hours'] },
      { key: 'pricingPlan',   label: 'Preferred Pricing Plan',   type: 'select',   options: ['Weekly Rate', 'Monthly Rate'] },
      { key: 'name',          label: 'Your Name',                type: 'text',     placeholder: 'Full name' },
      { key: 'address',       label: 'Property Address',         type: 'text',     placeholder: 'No, Street, City' },
      { key: 'contact',       label: 'Contact Number',           type: 'tel',      placeholder: '07X XXX XXXX' },
    ],
  },
  'residential-premium': {
    title: 'Pro Session / Premium Deep Cleaning',
    fields: [
      { key: 'name',          label: 'Your Name',                type: 'text',     placeholder: 'Full name' },
      { key: 'date',          label: 'Preferred Date',           type: 'date' },
      { key: 'address',       label: 'Property Address',         type: 'text',     placeholder: 'No, Street, City' },
      { key: 'contact',       label: 'Contact Number',           type: 'tel',      placeholder: '07X XXX XXXX' },
    ],
  },
  'corporate-customized': {
    title: 'Customized Cleaning — Corporate',
    fields: [
      { key: 'serviceCoverage',  label: 'Service Coverage',          type: 'text',   placeholder: 'e.g. Office floors, washrooms, cafeteria' },
      { key: 'premises',         label: 'Site Premises Allocations',  type: 'text',   placeholder: 'e.g. 3 floors, 20 rooms' },
      { key: 'businessHours',    label: 'Business Opening Hours',     type: 'text',   placeholder: 'e.g. 8:00 AM – 6:00 PM' },
      { key: 'demoSitting',      label: 'Demo Site Visit Required?',  type: 'select', options: ['Yes', 'No'] },
      { key: 'name',             label: 'Contact Name',               type: 'text',   placeholder: 'Full name' },
      { key: 'contact',          label: 'Contact Number',             type: 'tel',    placeholder: '07X XXX XXXX' },
    ],
  },
  'corporate-longterm': {
    title: 'Long Term Agreement — Corporate',
    fields: [
      { key: 'name',          label: 'Contact Name',             type: 'text',     placeholder: 'Full name' },
      { key: 'role',          label: 'Your Role / Designation',  type: 'text',     placeholder: 'e.g. Facility Manager' },
      { key: 'address',       label: 'Site Address',             type: 'text',     placeholder: 'No, Street, City' },
      { key: 'contact',       label: 'Contact Number',           type: 'tel',      placeholder: '07X XXX XXXX' },
    ],
  },
  'corporate-fullservice': {
    title: 'Full Service / Premium Deep Cleaning — Corporate',
    fields: [
      { key: 'date',          label: 'Preferred Date',           type: 'date' },
      { key: 'role',          label: 'Your Role / Designation',  type: 'text',     placeholder: 'e.g. Operations Manager' },
      { key: 'dayPreference', label: 'Preferred Day',            type: 'select',   options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Flexible'] },
      { key: 'address',       label: 'Site Address',             type: 'text',     placeholder: 'No, Street, City' },
      { key: 'name',          label: 'Contact Name',             type: 'text',     placeholder: 'Full name' },
      { key: 'contact',       label: 'Contact Number',           type: 'tel',      placeholder: '07X XXX XXXX' },
    ],
  },
}

/* ─────────────────────────────────────────────
   WHATSAPP MESSAGE BUILDER
───────────────────────────────────────────── */

function buildWhatsAppMessage(category, subService, formData, formDef) {
  const catLabel = category === 'residential' ? 'Residential' : 'Corporate'
  const subLabel = SUB_SERVICES[category].find(s => s.id === subService)?.label || subService

  const lines = [
    `📋 *New Quote Request — Safeguard Cleaning Services*`,
    ``,
    `*Category:* ${catLabel}`,
    `*Service:* ${subLabel}`,
    ``,
  ]

  formDef.fields.forEach(field => {
    const val = formData[field.key]
    if (!val || val === '') return
    if (field.type === 'checks') {
      const checked = Array.isArray(val) ? val.join(', ') : val
      lines.push(`*${field.label}:* ${checked}`)
    } else {
      lines.push(`*${field.label}:* ${val}`)
    }
  })

  lines.push(``, `_Sent via safeguardclean.lk_`)
  return encodeURIComponent(lines.join('\n'))
}

/* ─────────────────────────────────────────────
   MAIN HERO COMPONENT
───────────────────────────────────────────── */

export default function Hero() {
  const [step, setStep]               = useState('category')
  const [category, setCategory]       = useState(null)
  const [subService, setSubService]   = useState(null)
  const [formData, setFormData]       = useState({})

  const formKey = category && subService ? `${category}-${subService}` : null
  const formDef = formKey ? FORMS[formKey] : null

  const selectCategory   = (id) => { setCategory(id); setStep('subservice') }
  const selectSubService = (id) => { setSubService(id); setFormData({}); setStep('form') }
  const goBack = () => {
    if (step === 'subservice') { setCategory(null); setStep('category') }
    if (step === 'form')       { setSubService(null); setStep('subservice') }
  }

  const handleField = (key, value) =>
    setFormData(prev => ({ ...prev, [key]: value }))

  const handleCheck = (key, option, checked) => {
    setFormData(prev => {
      const list = Array.isArray(prev[key]) ? [...prev[key]] : []
      if (checked) return { ...prev, [key]: [...list, option] }
      return { ...prev, [key]: list.filter(x => x !== option) }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = buildWhatsAppMessage(category, subService, formData, formDef)
    window.open(`https://wa.me/94704906565?text=${msg}`, '_blank')
    setStep('done')
  }

  const reset = () => {
    setStep('category'); setCategory(null); setSubService(null); setFormData({})
  }

  const stepIndex  = { category: 0, subservice: 1, form: 2, done: 3 }[step]
  const stepLabels = ['Type', 'Service', 'Details', 'Done']

  return (
    <section
      id="home"
      className="relative min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden py-14 sm:py-18 lg:py-22"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(8,26,39,0.94) 0%, rgba(8,26,39,0.82) 42%, rgba(8,26,39,0.32) 50%, rgba(8,26,39,0.78) 72%, rgba(8,26,39,0.94) 100%), linear-gradient(180deg, rgba(8,26,39,0.45) 0%, transparent 22%, transparent 75%, rgba(8,26,39,0.85) 100%), url(${heroBgImg})`,
        backgroundPosition: '50% 20%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-7 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-400/50 text-emerald-300 text-xs font-extrabold uppercase tracking-wider mb-5 shadow-sm backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CLEAN SPACES. PROFESSIONAL CARE.</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight mb-5">
              Professional Cleaning Services for{' '}
              <span className="text-emerald-400 bg-gradient-to-r from-emerald-400 via-sky-300 to-sky-400 bg-clip-text text-transparent">
                Homes &amp; Businesses
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              Reliable, standardized and professional cleaning services in Sri Lanka for residential, commercial, hospital, hotel, restaurant and more.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={() => document.getElementById('quote-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
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

            <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-xs sm:text-sm font-bold text-slate-200 pt-6 border-t border-white/15">
              {['Residential', 'Commercial', 'Hospital, Hotel & Restaurant'].map(t => (
                <div key={t} className="flex items-center gap-2">
                  <span className="text-emerald-400 font-extrabold text-base">✓</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: Quote Calculator ── */}
          <div className="lg:col-span-5" id="quote-card">
            <div className="bg-white rounded-[2rem] p-6 sm:p-7 shadow-2xl border border-slate-100 text-slate-900">

              {/* Progress Dots */}
              <div className="flex items-center gap-2 mb-5">
                {stepLabels.map((label, i) => (
                  <div key={label} className="flex items-center gap-1.5 flex-1">
                    <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= stepIndex ? 'bg-sky-600' : 'bg-slate-200'}`} />
                  </div>
                ))}
              </div>

              {/* Back */}
              {(step === 'subservice' || step === 'form') && (
                <button onClick={goBack} className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-sky-600 mb-3 cursor-pointer transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              )}

              {/* ── Step 1: Category ── */}
              {step === 'category' && (
                <>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-1">Book Your Service</h3>
                  <p className="text-xs text-slate-500 mb-5">Select your client type to get started</p>
                  <div className="grid grid-cols-2 gap-3">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => selectCategory(cat.id)}
                        className="flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-slate-200 hover:border-sky-500 hover:bg-sky-50 transition-all cursor-pointer group"
                      >
                        <span className="text-3xl">{cat.icon}</span>
                        <span className="text-sm font-extrabold text-slate-800 group-hover:text-sky-700">{cat.label}</span>
                        <span className="text-[11px] text-slate-500 text-center leading-snug">{cat.desc}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* ── Step 2: Sub-service ── */}
              {step === 'subservice' && category && (
                <>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-1">Select Service Type</h3>
                  <p className="text-xs text-slate-500 mb-5">
                    {category === 'residential' ? 'Residential' : 'Corporate'} packages
                  </p>
                  <div className="flex flex-col gap-3">
                    {SUB_SERVICES[category].map(sub => (
                      <button
                        key={sub.id}
                        onClick={() => selectSubService(sub.id)}
                        className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-200 hover:border-sky-500 hover:bg-sky-50 transition-all cursor-pointer text-left group"
                      >
                        <span className="text-2xl">{sub.icon}</span>
                        <span className="text-sm font-bold text-slate-800 group-hover:text-sky-700 leading-snug">{sub.label}</span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 ml-auto shrink-0" />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* ── Step 3: Form ── */}
              {step === 'form' && formDef && (
                <>
                  <h3 className="text-base font-extrabold text-slate-900 mb-1 leading-snug">{formDef.title}</h3>
                  <p className="text-xs text-slate-500 mb-4">Fill in your details and we'll contact you via WhatsApp</p>
                  <form onSubmit={handleSubmit} className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {formDef.fields.map(field => (
                      <div key={field.key}>
                        <label className="block text-xs font-bold text-slate-700 mb-1">{field.label}</label>

                        {(field.type === 'text' || field.type === 'tel') && (
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={formData[field.key] || ''}
                            onChange={e => handleField(field.key, e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50 placeholder-slate-400"
                          />
                        )}

                        {field.type === 'date' && (
                          <input
                            type="date"
                            value={formData[field.key] || ''}
                            onChange={e => handleField(field.key, e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50"
                          />
                        )}

                        {field.type === 'select' && (
                          <select
                            value={formData[field.key] || ''}
                            onChange={e => handleField(field.key, e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50"
                          >
                            <option value="">— Select —</option>
                            {field.options.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        )}

                        {field.type === 'checks' && (
                          <div className="grid grid-cols-2 gap-1.5">
                            {field.options.map(opt => (
                              <label key={opt} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={Array.isArray(formData[field.key]) && formData[field.key].includes(opt)}
                                  onChange={e => handleCheck(field.key, opt, e.target.checked)}
                                  className="rounded accent-sky-600"
                                />
                                {opt}
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 bg-green-600 hover:bg-green-500 text-white font-extrabold rounded-2xl shadow-lg shadow-green-600/30 hover:shadow-green-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 mt-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </button>
                  </form>
                </>
              )}

              {/* ── Step 4: Done ── */}
              {step === 'done' && (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">Request Sent!</h3>
                  <p className="text-sm text-slate-500 mb-5 leading-relaxed">
                    Your quote request has been sent via WhatsApp. We'll get back to you shortly.
                  </p>
                  <button
                    onClick={reset}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-2xl transition-all cursor-pointer"
                  >
                    New Request
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
