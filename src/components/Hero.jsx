import { useState } from 'react'
import { ArrowRight, Phone, ChevronLeft, CheckCircle2, MapPin, AlertCircle, ClipboardCheck } from 'lucide-react'
import heroBgImg from '../assets/hero_bg.jpg'

/* ─────────────────────────────────────────────
   LOCATION DATA
───────────────────────────────────────────── */

const WESTERN_DISTRICTS = ['Colombo', 'Gampaha', 'Kalutara']

const ALL_DISTRICTS = [
  'Colombo', 'Gampaha', 'Kalutara',           // Western Province
  'Kandy', 'Matale', 'Nuwara Eliya',           // Central
  'Galle', 'Matara', 'Hambantota',             // Southern
  'Jaffna', 'Kilinochchi', 'Mannar',           // Northern
  'Ampara', 'Batticaloa', 'Trincomalee',       // Eastern
  'Kurunegala', 'Puttalam',                    // North Western
  'Anuradhapura', 'Polonnaruwa',               // North Central
  'Badulla', 'Monaragala',                     // Uva
  'Ratnapura', 'Kegalle',                      // Sabaragamuwa
]

// Equipment list (from chart) used in Customized packages
const EQUIPMENT_OPTIONS = [
  'Ladder',
  'Vacuum Cleaner',
  'Scrubbing Machine',
  'High-Pressure Cleaning Machine',
  'Sofa Shampoo Cleaning Machine',
  'Steam Cleaning',
  'Grass Cutting Machine',
]

/* ─────────────────────────────────────────────
   CATEGORIES & SUB-SERVICES
───────────────────────────────────────────── */

const CATEGORIES = [
  { id: 'residential', label: 'Residential', icon: '🏠', desc: 'Homes, villas & apartments' },
  { id: 'corporate',   label: 'Corporate',   icon: '🏢', desc: 'Offices, shops & facilities' },
]

const SUB_SERVICES = {
  residential: [
    { id: 'customized', label: 'Customized Cleaning Package',          westernOnly: true,  requiresInspection: false },
    { id: 'longterm',   label: 'Long Term Cleaning Agreement',         westernOnly: true,  requiresInspection: false },
    { id: 'premium',    label: 'Full House / Premises Deep Cleaning',  westernOnly: false, requiresInspection: true  },
  ],
  corporate: [
    { id: 'customized',  label: 'Customized Cleaning Package',          westernOnly: true,  requiresInspection: false },
    { id: 'longterm',    label: 'Long Term Cleaning Agreement',         westernOnly: false, requiresInspection: true  },
    { id: 'fullservice', label: 'Full Service / Premium Deep Cleaning', westernOnly: false, requiresInspection: true  },
  ],
}

/* ─────────────────────────────────────────────
   LONG-TERM PRICING TABLE
───────────────────────────────────────────── */

const LONGTERM_PRICING = {
  Weekly: {
    'Within 20 KM': { 'Once (1x)': 27950, 'Twice (2x)': 55900, 'Three Times (3x)': 83850 },
    'Beyond 20 KM': { 'Once (1x)': 31500, 'Twice (2x)': 63500, 'Three Times (3x)': 94500 },
  },
  Monthly: {
    'Within 20 KM': { 'Once (1x)': 10500, 'Twice (2x)': 19500 },
    'Beyond 20 KM': { 'Once (1x)': 12500, 'Twice (2x)': 21500 },
  },
}

const LONGTERM_TIMES = {
  Weekly:  ['Once (1x)', 'Twice (2x)', 'Three Times (3x)'],
  Monthly: ['Once (1x)', 'Twice (2x)'],
}

function getLongtermPrice(frequency, times, distance) {
  if (!frequency || !times || !distance) return null
  return LONGTERM_PRICING[frequency]?.[distance]?.[times] ?? null
}

/* ─────────────────────────────────────────────
   FORM DEFINITIONS — words from chart only
───────────────────────────────────────────── */

const INSPECTION_NOTE = 'Site inspection required before final quotation.'

const CORPORATE_IDENTITY_FIELDS = [
  { key: 'companyName', label: 'Company Name',           type: 'text', placeholder: 'Company name' },
  { key: 'name',        label: 'Authorized Person Name', type: 'text', placeholder: 'Full name' },
  { key: 'role',        label: 'Role',                   type: 'text', placeholder: 'e.g. Facility Manager' },
]

const FORMS = {
  'residential-customized': {
    title: 'Customized Cleaning Package — Residential',
    note: 'Only Western Province',
    fields: [
      { key: 'name',          label: 'Name',            type: 'text',    placeholder: 'Full name' },
      { key: 'contact',       label: 'Contact No',      type: 'tel',     placeholder: '07X XXX XXXX' },
      { key: 'date',          label: 'Date',            type: 'date' },
      { key: 'cleanersCount', label: 'Cleaners Count',  type: 'counter' },
      { key: 'address',       label: 'Address',         type: 'text',    placeholder: 'No, Street, City', fullWidth: true },
      {
        key: 'equipment',
        label: 'Equipment Needed',
        type: 'checks',
        options: EQUIPMENT_OPTIONS,
        fullWidth: true,
      },
    ],
  },

  'residential-longterm': {
    title: 'Long-Term Cleaning Agreement',
    note: 'Only Western Province',
    isLongTerm: true,
    fields: [
      { key: 'frequency', label: 'Frequency',        type: 'radio',             options: ['Weekly', 'Monthly'], fullWidth: true },
      { key: 'times',     label: 'How many times ?', type: 'radio-conditional', dependsOn: 'frequency', conditionalOptions: LONGTERM_TIMES, fullWidth: true },
      { key: 'distance',  label: 'Distance',         type: 'radio',             options: ['Within 20 KM', 'Beyond 20 KM'], fullWidth: true },
      { key: '_pricing',  label: 'PRICING',          type: 'pricing-display',   fullWidth: true },
      { key: 'name',      label: 'Name',             type: 'text',              placeholder: 'Full name' },
      { key: 'contact',   label: 'Contact',          type: 'tel',               placeholder: '07X XXX XXXX' },
      { key: 'address',   label: 'Address',          type: 'text',              placeholder: 'No, Street, City', fullWidth: true },
    ],
  },

  'residential-premium': {
    title: 'Full House / Premises Deep Cleaning',
    isInspection: true,
    note: INSPECTION_NOTE,
    fields: [
      { key: 'name',    label: 'Name',                      type: 'text', placeholder: 'Full name' },
      { key: 'contact', label: 'Contact No',                type: 'tel',  placeholder: '07X XXX XXXX' },
      { key: 'date',    label: 'Preferred Inspection Date', type: 'date' },
      { key: 'time',    label: 'Preferred Inspection Time', type: 'time' },
      { key: 'address', label: 'Address',                   type: 'text', placeholder: 'No, Street, City', fullWidth: true },
    ],
  },

  'corporate-customized': {
    title: 'Customized Cleaning Package — Corporate',
    note: 'Only Western Province',
    fields: [
      ...CORPORATE_IDENTITY_FIELDS,
      { key: 'contact',       label: 'Contact No',      type: 'tel',     placeholder: '07X XXX XXXX' },
      { key: 'date',          label: 'Date',            type: 'date' },
      { key: 'cleanersCount', label: 'Cleaners Count',  type: 'counter' },
      { key: 'address',       label: 'Address',         type: 'text',    placeholder: 'No, Street, City', fullWidth: true },
      {
        key: 'equipment',
        label: 'Equipment Needed',
        type: 'checks',
        options: EQUIPMENT_OPTIONS,
        fullWidth: true,
      },
    ],
  },

  'corporate-longterm': {
    title: 'Long Term Cleaning Agreement — Corporate',
    isInspection: true,
    note: INSPECTION_NOTE,
    fields: [
      ...CORPORATE_IDENTITY_FIELDS,
      { key: 'contact', label: 'Contact No', type: 'tel',  placeholder: '07X XXX XXXX' },
      { key: 'address', label: 'Address',    type: 'text', placeholder: 'No, Street, City', fullWidth: true },
    ],
  },

  'corporate-fullservice': {
    title: 'Full Service / Premium Deep Cleaning — Corporate',
    isInspection: true,
    note: INSPECTION_NOTE,
    fields: [
      ...CORPORATE_IDENTITY_FIELDS,
      { key: 'contact', label: 'Contact No',                type: 'tel', placeholder: '07X XXX XXXX' },
      { key: 'date',    label: 'Preferred Inspection Date', type: 'date' },
      {
        key: 'day',
        label: 'Preferred Day',
        type: 'select',
        options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Flexible'],
      },
      { key: 'address', label: 'Address', type: 'text', placeholder: 'No, Street, City', fullWidth: true },
    ],
  },
}

/* ─────────────────────────────────────────────
   MAIN HERO COMPONENT
───────────────────────────────────────────── */

export default function Hero() {
  const [step, setStep]             = useState('category')   // category | location | subservice | form | done
  const [category, setCategory]     = useState(null)
  const [district, setDistrict]     = useState('')
  const [subService, setSubService] = useState(null)
  const [formData, setFormData]     = useState({})

  const isWestern = WESTERN_DISTRICTS.includes(district)

  const formKey = category && subService ? `${category}-${subService}` : null
  const formDef = formKey ? FORMS[formKey] : null

  /* helpers */
  const selectCategory = (id) => { setCategory(id) }

  const confirmCategory = () => {
    if (!category) return
    setStep('location')
  }

  const confirmLocation = () => {
    if (!district) return
    setStep('subservice')
  }

  const selectSubService = (sub) => {
    if (sub.westernOnly && !isWestern) return  // blocked
    setSubService(sub.id)
    setFormData({})
    setStep('form')
  }

  const goBack = () => {
    if (step === 'location')    { setDistrict(''); setStep('category') }
    if (step === 'subservice')  { setDistrict(''); setStep('location') }
    if (step === 'form')        { setSubService(null); setStep('subservice') }
  }

  const handleField = (key, value) =>
    setFormData(prev => {
      if (key === 'frequency') return { ...prev, [key]: value, times: '' }
      return { ...prev, [key]: value }
    })

  const handleCheck = (key, option, checked) => {
    setFormData(prev => {
      const list = Array.isArray(prev[key]) ? [...prev[key]] : []
      if (checked) return { ...prev, [key]: [...list, option] }
      return { ...prev, [key]: list.filter(x => x !== option) }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep('done')
  }

  const reset = () => {
    setStep('category')
    setCategory(null)
    setDistrict('')
    setSubService(null)
    setFormData({})
  }

  /* progress */
  const stepIndex  = { category: 0, location: 1, subservice: 2, form: 3, done: 4 }[step]
  const stepLabels = ['Type', 'Location', 'Service', 'Details', 'Done']

  /* ─── RENDER ─── */
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
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-6 text-white">
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
          <div className="lg:col-span-6" id="quote-card">
            <div className="bg-white rounded-[2rem] p-6 sm:p-7 shadow-2xl border border-slate-100 text-slate-900">

              {/* Progress bar */}
              <div className="flex items-center gap-1.5 mb-5">
                {stepLabels.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= stepIndex ? 'bg-sky-600' : 'bg-slate-200'}`}
                  />
                ))}
              </div>

              {/* Back button */}
              {(step === 'location' || step === 'subservice' || step === 'form') && (
                <button onClick={goBack} className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-sky-600 mb-3 cursor-pointer transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              )}

              {/* ── STEP 1: Category ── */}
              {step === 'category' && (
                <>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-1">Book Your Service</h3>
                  <p className="text-xs text-slate-500 mb-5">Select your client type to get started</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {CATEGORIES.map(cat => {
                      const active = category === cat.id
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => selectCategory(cat.id)}
                          className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all cursor-pointer group ${
                            active
                              ? 'border-sky-600 bg-sky-50 ring-1 ring-sky-600'
                              : 'border-slate-200 hover:border-sky-500 hover:bg-sky-50'
                          }`}
                        >
                          <span className="text-3xl">{cat.icon}</span>
                          <span className={`text-sm font-extrabold ${active ? 'text-sky-900' : 'text-slate-800 group-hover:text-sky-700'}`}>
                            {cat.label}
                          </span>
                          <span className="text-[11px] text-slate-500 text-center leading-snug">{cat.desc}</span>
                        </button>
                      )
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={confirmCategory}
                    disabled={!category}
                    className="w-full py-4 px-4 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:hover:translate-y-0 disabled:cursor-not-allowed text-white font-extrabold rounded-2xl shadow-lg shadow-sky-600/30 hover:shadow-sky-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Get a Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* ── STEP 2: Location ── */}
              {step === 'location' && (
                <>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-1">Your Location</h3>
                  <p className="text-xs text-slate-500 mb-4">Select your district so we can confirm service availability</p>

                  <div className="mb-4">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      <MapPin className="inline w-3.5 h-3.5 mr-1 text-sky-600" />
                      District
                    </label>
                    <select
                      value={district}
                      onChange={e => setDistrict(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50"
                    >
                      <option value="">— Select District —</option>
                      <optgroup label="Western Province">
                        {['Colombo', 'Gampaha', 'Kalutara'].map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Other Districts">
                        {ALL_DISTRICTS.filter(d => !WESTERN_DISTRICTS.includes(d)).map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {/* Notice if outside Western Province */}
                  {district && !isWestern && (
                    <div className="flex items-start gap-2.5 p-3 bg-amber-50 border border-amber-200 rounded-xl mb-4">
                      <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <p className="text-xs text-amber-800 leading-snug">
                        <span className="font-bold">Note:</span>{' '}
                        {category === 'corporate'
                          ? 'Customized Cleaning Package is only available in the Western Province (Colombo, Gampaha, Kalutara). Long Term & Full Service packages are available in your district via site inspection.'
                          : 'Customized Cleaning Package and Long Term Cleaning Agreement are only available in the Western Province (Colombo, Gampaha, Kalutara).'}
                      </p>
                    </div>
                  )}

                  {district && isWestern && (
                    <div className="flex items-start gap-2.5 p-3 bg-emerald-50 border border-emerald-200 rounded-xl mb-4">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <p className="text-xs text-emerald-800 leading-snug">
                        All packages are available in <span className="font-bold">{district}</span>.
                      </p>
                    </div>
                  )}

                  <button
                    onClick={confirmLocation}
                    disabled={!district}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold rounded-2xl transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* ── STEP 3: Sub-service ── */}
              {step === 'subservice' && category && (
                <>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-1">Select Service</h3>
                  <p className="text-xs text-slate-500 mb-5">
                    {category === 'residential' ? 'Residential' : 'Corporate'} · {district}
                  </p>
                  <div className="flex flex-col gap-3">
                    {SUB_SERVICES[category].map(sub => {
                      const blocked = sub.westernOnly && !isWestern
                      return (
                        <button
                          key={sub.id}
                          onClick={() => selectSubService(sub)}
                          disabled={blocked}
                          className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all text-left group ${
                            blocked
                              ? 'border-slate-100 bg-slate-50 cursor-not-allowed opacity-50'
                              : 'border-slate-200 hover:border-sky-500 hover:bg-sky-50 cursor-pointer'
                          }`}
                        >
                          <div className="flex-1">
                            <div className={`text-sm font-bold leading-snug ${blocked ? 'text-slate-400' : 'text-slate-800 group-hover:text-sky-700'}`}>
                              {sub.label}
                            </div>
                            {sub.westernOnly && (
                              <div className="text-[10px] mt-0.5 font-semibold text-amber-600">
                                Western Province only
                              </div>
                            )}
                            {!blocked && sub.requiresInspection && (
                              <div className="text-[10px] mt-0.5 font-semibold text-sky-600">
                                Requires site inspection
                              </div>
                            )}
                          </div>
                          {!blocked && <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 mt-0.5 shrink-0" />}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}

              {/* ── STEP 4: Form ── */}
              {step === 'form' && formDef && (
                <>
                  <h3 className="text-base font-extrabold text-slate-900 mb-0.5 leading-snug">{formDef.title}</h3>
                  <p className="text-[11px] text-slate-400 mb-3">District: {district}</p>

                  {formDef.isInspection ? (
                    <div className="flex items-start gap-2.5 p-3 bg-sky-50 border border-sky-200 rounded-xl mb-3">
                      <ClipboardCheck className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                      <div className="text-xs leading-snug">
                        <div className="font-extrabold text-sky-900">Request a Site Inspection</div>
                        <div className="text-sky-800 mt-0.5">{formDef.note}</div>
                      </div>
                    </div>
                  ) : formDef.note ? (
                    <p className="text-xs font-semibold text-sky-700 mb-3">{formDef.note}</p>
                  ) : null}

                  <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {formDef.fields.map(field => {
                      const spanFull = field.fullWidth || ['radio', 'radio-conditional', 'pricing-display', 'checks'].includes(field.type)
                      return (
                      <div key={field.key} className={spanFull ? 'sm:col-span-2' : ''}>
                        <label className="block text-xs font-bold text-slate-700 mb-1">{field.label}</label>

                        {(field.type === 'text' || field.type === 'tel') && (
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={formData[field.key] || ''}
                            onChange={e => handleField(field.key, e.target.value)}
                            required
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 bg-slate-50 placeholder-slate-400"
                          />
                        )}

                        {(field.type === 'date' || field.type === 'time') && (
                          <input
                            type={field.type}
                            value={formData[field.key] || ''}
                            onChange={e => handleField(field.key, e.target.value)}
                            required
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 bg-slate-50"
                          />
                        )}

                        {field.type === 'radio' && (
                          <div className="grid grid-cols-2 gap-2">
                            {field.options.map(opt => {
                              const selected = formData[field.key] === opt
                              return (
                                <label
                                  key={opt}
                                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                                    selected
                                      ? 'border-sky-600 bg-sky-50 text-sky-900'
                                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={field.key}
                                    value={opt}
                                    checked={selected}
                                    onChange={() => handleField(field.key, opt)}
                                    required
                                    className="accent-sky-600 shrink-0"
                                  />
                                  <span>{opt}</span>
                                </label>
                              )
                            })}
                          </div>
                        )}

                        {field.type === 'radio-conditional' && (() => {
                          const depVal = formData[field.dependsOn]
                          const opts = depVal ? (field.conditionalOptions[depVal] || []) : []
                          if (!depVal) {
                            return (
                              <p className="text-xs text-slate-400 italic px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
                                Select Frequency first
                              </p>
                            )
                          }
                          return (
                            <div className={`grid gap-2 ${opts.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                              {opts.map(opt => {
                                const selected = formData[field.key] === opt
                                return (
                                  <label
                                    key={opt}
                                    className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                                      selected
                                        ? 'border-sky-600 bg-sky-50 text-sky-900'
                                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name={field.key}
                                      value={opt}
                                      checked={selected}
                                      onChange={() => handleField(field.key, opt)}
                                      required
                                      className="accent-sky-600 shrink-0"
                                    />
                                    <span>{opt}</span>
                                  </label>
                                )
                              })}
                            </div>
                          )
                        })()}

                        {field.type === 'pricing-display' && (() => {
                          const price = getLongtermPrice(formData.frequency, formData.times, formData.distance)
                          return (
                            <div className="px-3.5 py-2.5 rounded-xl border border-sky-200 bg-sky-50/70 flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-600">
                                {price !== null ? `${formData.frequency} · ${formData.times} · ${formData.distance}` : 'Estimated Rate'}
                              </span>
                              <span className="text-sm font-extrabold text-sky-700">
                                {price !== null ? `LKR ${price.toLocaleString()}` : 'Select options above'}
                              </span>
                            </div>
                          )
                        })()}

                        {field.type === 'select' && (
                          <select
                            value={formData[field.key] || ''}
                            onChange={e => handleField(field.key, e.target.value)}
                            required
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 bg-slate-50"
                          >
                            <option value="">— Select —</option>
                            {field.options.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        )}

                        {field.type === 'checks' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {field.options.map(opt => (
                              <label key={opt} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:bg-slate-50 rounded-lg px-2 py-1 transition-colors">
                                <input
                                  type="checkbox"
                                  checked={Array.isArray(formData[field.key]) && formData[field.key].includes(opt)}
                                  onChange={e => handleCheck(field.key, opt, e.target.checked)}
                                  className="rounded accent-sky-600 shrink-0"
                                />
                                {opt}
                              </label>
                            ))}
                          </div>
                        )}

                        {field.type === 'counter' && (
                          <div className="flex items-center gap-3 p-1.5 bg-slate-50 rounded-xl border border-slate-200">
                            <button
                              type="button"
                              onClick={() => handleField(field.key, Math.max(1, (formData[field.key] || 1) - 1))}
                              className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-800 font-extrabold hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                            >−</button>
                            <span className="flex-1 text-center text-base font-extrabold text-slate-900">
                              {formData[field.key] || 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleField(field.key, (formData[field.key] || 1) + 1)}
                              className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-800 font-extrabold hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                            >+</button>
                          </div>
                        )}
                      </div>
                      )
                    })}

                    <button
                      type="submit"
                      className="sm:col-span-2 w-full py-3.5 px-4 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-2xl shadow-lg shadow-sky-600/30 hover:shadow-sky-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 mt-1"
                    >
                      <span>{formDef.isInspection ? 'Request an Inspection' : 'Get a Quote'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </>
              )}

              {/* ── STEP 5: Done ── */}
              {step === 'done' && (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                    {formDef?.isInspection ? 'Inspection Request Received!' : 'Quote Request Received!'}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                    Thank you{formData.name ? `, ${formData.name}` : ''}.{' '}
                    {formDef?.isInspection
                      ? 'Our team will contact you shortly to confirm your site inspection.'
                      : 'Our team will contact you shortly.'}
                  </p>
                  <div className="text-left text-xs bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-5 space-y-1 text-slate-700">
                    <div><span className="font-bold">Type:</span> {category === 'residential' ? 'Residential' : 'Corporate'}</div>
                    {formData.companyName && <div><span className="font-bold">Company:</span> {formData.companyName}</div>}
                    {formData.role && <div><span className="font-bold">Authorized Person:</span> {formData.name} ({formData.role})</div>}
                    <div><span className="font-bold">District:</span> {district}</div>
                    {formDef && <div><span className="font-bold">Package:</span> {formDef.title}</div>}
                    {formDef?.isLongTerm && getLongtermPrice(formData.frequency, formData.times, formData.distance) !== null && (
                      <div className="pt-1 text-sky-700 font-extrabold">
                        Estimated Rate: LKR {getLongtermPrice(formData.frequency, formData.times, formData.distance).toLocaleString()}
                      </div>
                    )}
                  </div>
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
