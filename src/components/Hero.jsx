import { useState } from 'react'
import { ArrowRight, Phone, ChevronLeft, CheckCircle2, MapPin, AlertCircle, ClipboardCheck, Navigation } from 'lucide-react'
import heroBgImg from '../assets/hero_bg.jpg'
import MapLocationPicker, { COLOMBO_HUB, calculateDistanceKm } from './MapLocationPicker'

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
  { id: 'corporate', label: 'Corporate', icon: '🏢', desc: 'Offices, shops & facilities' },
]

const SUB_SERVICES = {
  residential: [
    { id: 'customized', label: 'Customized Cleaning Package', westernOnly: true, requiresInspection: false },
    { id: 'longterm', label: 'Long Term Cleaning Agreement', westernOnly: true, requiresInspection: false },
    { id: 'premium', label: 'Full House / Premises Deep Cleaning', westernOnly: false, requiresInspection: true },
  ],
  corporate: [
    { id: 'customized', label: 'Customized Cleaning Package', westernOnly: true, requiresInspection: false },
    { id: 'longterm', label: 'Long Term Cleaning Agreement', westernOnly: false, requiresInspection: true },
    { id: 'fullservice', label: 'Full Service / Premium Deep Cleaning', westernOnly: false, requiresInspection: true },
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
  Weekly: ['Once (1x)', 'Twice (2x)', 'Three Times (3x)'],
  Monthly: ['Once (1x)', 'Twice (2x)'],
}

function getLongtermPrice(frequency, times, distance) {
  if (!frequency || !times || !distance) return null
  return LONGTERM_PRICING[frequency]?.[distance]?.[times] ?? null
}

/* ─────────────────────────────────────────────
   CUSTOMIZED PACKAGE PRICING
   * 1 Professional Cleaner, Chemicals & Equipment: 8,500
   * Additional cleaners charge: 3,000 each
   * Additional equipment charges: 2,000 each
   * Transportation charges:
     - Bike: within 20km = 500 | beyond 20km = 1000
     - Three-wheeler: within 20km = 1000 | beyond 20km = 1500
     - Lorry (heavy equipment): within 20km = 2000 | beyond 20km = 2500
   * 15% profit margin added to total cost
───────────────────────────────────────────── */

const HEAVY_EQUIPMENT = [
  'Scrubbing Machine',
  'High-Pressure Cleaning Machine',
]

const TRANSPORT_RATES = {
  bike: { 'Within 20 KM': 500, 'Beyond 20 KM': 1000 },
  threewheeler: { 'Within 20 KM': 1000, 'Beyond 20 KM': 1500 },
  lorry: { 'Within 20 KM': 2000, 'Beyond 20 KM': 2500 },
}

function getCustomizedEstimate(cleanersCount = 1, equipment = [], distance = null) {
  const count = Math.max(1, parseInt(cleanersCount, 10) || 1)
  const baseCleanerCharge = 8500
  const additionalCleanersCharge = (count - 1) * 3000
  const cleanerTotal = baseCleanerCharge + additionalCleanersCharge

  const eqList = Array.isArray(equipment) ? equipment : []
  const eqCount = eqList.length
  const equipmentTotal = eqCount * 2000

  // Heavy equipment requires a lorry; medium equipment or 2+ cleaners requires a three-wheeler; else bike
  const hasHeavy = eqList.some(item => HEAVY_EQUIPMENT.includes(item))
  let vehicleKey = 'bike'
  let vehicleName = 'Motorbike'
  if (hasHeavy) {
    vehicleKey = 'lorry'
    vehicleName = 'Lorry (Heavy Equipment)'
  } else if (eqCount > 0 || count >= 2) {
    vehicleKey = 'threewheeler'
    vehicleName = 'Three-Wheeler'
  }

  const transportRate = distance ? (TRANSPORT_RATES[vehicleKey]?.[distance] ?? null) : null

  // Subtotal of costs
  const costSubtotal = cleanerTotal + equipmentTotal + (transportRate || 0)
  // 15% profit margin
  const margin = Math.round(costSubtotal * 0.15)
  const total = costSubtotal + margin

  return {
    cleanersCount: count,
    baseCleanerCharge,
    additionalCleanersCharge,
    cleanerTotal,
    eqCount,
    equipmentTotal,
    vehicleKey,
    vehicleName,
    distance,
    transportRate,
    costSubtotal,
    margin,
    total,
    isComplete: Boolean(distance),
  }
}

/* ─────────────────────────────────────────────
   FORM DEFINITIONS — words from chart only
───────────────────────────────────────────── */

const INSPECTION_NOTE = 'Site inspection required before final quotation.'

const CORPORATE_IDENTITY_FIELDS = [
  { key: 'companyName', label: 'Company Name', type: 'text', placeholder: 'Company name' },
  { key: 'name', label: 'Authorized Person Name', type: 'text', placeholder: 'Full name' },
  { key: 'role', label: 'Role', type: 'text', placeholder: 'e.g. Facility Manager' },
]

const FORMS = {
  'residential-customized': {
    title: 'Customized Cleaning Package — Residential',
    note: 'Only Western Province',
    hasContactStep: true,
    fields: [
      { key: 'date', label: 'Cleaning Date', type: 'date' },
      { key: 'startTime', label: 'Start / Arrival Time', type: 'time' },
      { key: 'cleanersCount', label: 'Cleaners Count', type: 'counter' },
      {
        key: 'propertyDetails',
        label: 'Property Size / Details',
        type: 'text',
        placeholder: 'e.g. 3 Bedrooms, 2 Baths (~2,000 sq ft)',
        fullWidth: true,
        optional: true,
      },
      {
        key: 'equipment',
        label: 'Equipment Needed',
        type: 'checks',
        options: EQUIPMENT_OPTIONS,
        fullWidth: true,
      },
      {
        key: '_pricing',
        label: 'ESTIMATED PRICE',
        type: 'customized-pricing-display',
        fullWidth: true,
      },
      {
        key: 'instructions',
        label: 'Specific Instructions (Scope of Work)',
        type: 'textarea',
        placeholder: 'Special requests, areas requiring extra attention, or specific cleaning tasks...',
        fullWidth: true,
        optional: true,
      },
    ],
    contactFields: [
      { key: 'name', label: 'Name', type: 'text', placeholder: 'Full name' },
      { key: 'contact', label: 'Contact No', type: 'tel', placeholder: '07X XXX XXXX' },
    ],
  },

  'residential-longterm': {
    title: 'Long-Term Cleaning Agreement',
    note: 'Only Western Province',
    isLongTerm: true,
    hasContactStep: true,
    fields: [
      { key: 'frequency', label: 'Frequency', type: 'radio', options: ['Weekly', 'Monthly'], fullWidth: true },
      { key: 'times', label: 'How many times ?', type: 'radio-conditional', dependsOn: 'frequency', conditionalOptions: LONGTERM_TIMES, fullWidth: true },
      { key: '_pricing', label: 'PRICING', type: 'pricing-display', fullWidth: true },
    ],
    contactFields: [
      { key: 'name', label: 'Name', type: 'text', placeholder: 'Full name' },
      { key: 'contact', label: 'Contact', type: 'tel', placeholder: '07X XXX XXXX' },
    ],
  },

  'residential-premium': {
    title: 'Full House / Premises Deep Cleaning',
    isInspection: true,
    note: INSPECTION_NOTE,
    fields: [
      { key: 'name', label: 'Name', type: 'text', placeholder: 'Full name' },
      { key: 'contact', label: 'Contact No', type: 'tel', placeholder: '07X XXX XXXX' },
      { key: 'date', label: 'Preferred Inspection Date', type: 'date' },
      { key: 'time', label: 'Preferred Inspection Time', type: 'time' },
    ],
  },

  'corporate-customized': {
    title: 'Customized Cleaning Package — Corporate',
    note: 'Only Western Province',
    hasContactStep: true,
    fields: [
      { key: 'date', label: 'Cleaning Date', type: 'date' },
      { key: 'startTime', label: 'Start / Arrival Time', type: 'time' },
      { key: 'cleanersCount', label: 'Cleaners Count', type: 'counter' },
      {
        key: 'propertyDetails',
        label: 'Premises Size / Details',
        type: 'text',
        placeholder: 'e.g. 2 Floors, 15 Cabins (~3,500 sq ft)',
        fullWidth: true,
        optional: true,
      },
      {
        key: 'equipment',
        label: 'Equipment Needed',
        type: 'checks',
        options: EQUIPMENT_OPTIONS,
        fullWidth: true,
      },
      {
        key: '_pricing',
        label: 'ESTIMATED PRICE',
        type: 'customized-pricing-display',
        fullWidth: true,
      },
      {
        key: 'instructions',
        label: 'Specific Instructions (Scope of Work)',
        type: 'textarea',
        placeholder: 'Special requests, commercial areas, or custom scope of work...',
        fullWidth: true,
        optional: true,
      },
    ],
    contactFields: [
      ...CORPORATE_IDENTITY_FIELDS,
      { key: 'contact', label: 'Contact No', type: 'tel', placeholder: '07X XXX XXXX' },
    ],
  },

  'corporate-longterm': {
    title: 'Long Term Cleaning Agreement — Corporate',
    isInspection: true,
    note: INSPECTION_NOTE,
    fields: [
      ...CORPORATE_IDENTITY_FIELDS,
      { key: 'contact', label: 'Contact No', type: 'tel', placeholder: '07X XXX XXXX' },
    ],
  },

  'corporate-fullservice': {
    title: 'Full Service / Premium Deep Cleaning — Corporate',
    isInspection: true,
    note: INSPECTION_NOTE,
    fields: [
      ...CORPORATE_IDENTITY_FIELDS,
      { key: 'contact', label: 'Contact No', type: 'tel', placeholder: '07X XXX XXXX' },
      { key: 'date', label: 'Preferred Inspection Date', type: 'date' },
      {
        key: 'day',
        label: 'Preferred Day',
        type: 'select',
        options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Flexible'],
      },
    ],
  },
}

/* ─────────────────────────────────────────────
   WHATSAPP ICON & CONSTANTS
───────────────────────────────────────────── */
const WHATSAPP_BOOKING_NUMBER = '94711569849' // +94 71 156 9849

const WhatsAppIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

/* ─────────────────────────────────────────────
   MAIN HERO COMPONENT
───────────────────────────────────────────── */

export default function Hero() {
  const [step, setStep] = useState('category')   // category | location | subservice | form | done
  const [category, setCategory] = useState(null)
  const [district, setDistrict] = useState('Colombo')
  const [userLocation, setUserLocation] = useState(() => {
    const defaultLat = 6.9344
    const defaultLng = 79.8428
    const dist = calculateDistanceKm(COLOMBO_HUB.lat, COLOMBO_HUB.lng, defaultLat, defaultLng)
    return {
      name: 'Colombo Fort / CBD',
      address: 'Colombo Fort, Colombo',
      lat: defaultLat,
      lng: defaultLng,
      district: 'Colombo',
      province: 'Western Province',
      isWestern: true,
      distanceKm: dist,
      distanceCategory: dist <= 20 ? 'Within 20 KM' : 'Beyond 20 KM',
    }
  })
  const [subService, setSubService] = useState(null)
  const [formData, setFormData] = useState({})

  const isWestern = userLocation?.isWestern ?? WESTERN_DISTRICTS.includes(district)

  const formKey = category && subService ? `${category}-${subService}` : null
  const formDef = formKey ? FORMS[formKey] : null

  /* helpers */
  const selectCategory = (id) => { setCategory(id) }

  const confirmCategory = () => {
    if (!category) return
    setStep('location')
  }

  const confirmLocation = () => {
    if (!userLocation) return
    setStep('subservice')
  }

  const selectSubService = (sub) => {
    if (sub.westernOnly && !isWestern) return  // blocked
    setSubService(sub.id)
    setFormData({
      cleanersCount: 1,
      distance: userLocation?.distanceCategory || 'Within 20 KM',
      distanceKm: userLocation?.distanceKm || 0,
    })
    setStep('form')
  }

  const goBack = () => {
    if (step === 'contact') { setStep('form') }
    else if (step === 'form') { setSubService(null); setStep('subservice') }
    else if (step === 'subservice') { setStep('location') }
    else if (step === 'location') { setCategory(null); setStep('category') }
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

  const formatWhatsAppBookingMessage = () => {
    const isCorporate = category === 'corporate'
    const effectiveDist = formData.distance || userLocation?.distanceCategory || 'Within 20 KM'

    const lines = [
      `*SAFEGUARD CLEANING SERVICES*`,
      `*BOOKING & QUOTATION REQUEST*`,
      `────────────────────────────`,
      `📋 *Package:* ${formDef?.title || 'Cleaning Service'}`,
      `🏢 *Client Type:* ${isCorporate ? 'Corporate' : 'Residential'}`,
    ]

    if (isCorporate && formData.companyName) {
      lines.push(`🏛️ *Company:* ${formData.companyName}`)
    }
    if (isCorporate && formData.role) {
      lines.push(`👤 *Authorized Person:* ${formData.name || ''} (${formData.role})`)
    } else if (formData.name) {
      lines.push(`👤 *Customer Name:* ${formData.name}`)
    }
    if (formData.contact) {
      lines.push(`📞 *Contact No:* ${formData.contact}`)
    }

    lines.push(
      `📍 *Service Location:* ${userLocation?.name || district}`,
      `📌 *District / Province:* ${district}${userLocation?.province ? ` (${userLocation.province})` : ''}`,
      `🚗 *Distance from Hub:* ${userLocation?.distanceKm || 0} km (${effectiveDist})`
    )

    if (formData.date) {
      const timeStr = formData.startTime ? ` at ${formData.startTime}` : formData.time ? ` at ${formData.time}` : ''
      const dayStr = formData.day ? ` (${formData.day})` : ''
      lines.push(`📅 *${formDef?.isInspection ? 'Inspection Date' : 'Cleaning Date'}:* ${formData.date}${timeStr}${dayStr}`)
    }

    if (formData.cleanersCount) {
      lines.push(`👥 *Cleaners Count:* ${formData.cleanersCount}`)
    }

    if (formData.propertyDetails) {
      lines.push(`🏠 *${isCorporate ? 'Premises Details' : 'Property Details'}:* ${formData.propertyDetails}`)
    }

    if (formData.equipment && formData.equipment.length > 0) {
      lines.push(`🧰 *Equipment Needed:* ${formData.equipment.join(', ')}`)
    }

    if (formData.instructions && formData.instructions.trim()) {
      lines.push(`📝 *Scope of Work / Instructions:*\n${formData.instructions.trim()}`)
    }

    if (formDef?.isLongTerm) {
      const price = getLongtermPrice(formData.frequency, formData.times, effectiveDist)
      if (price !== null) {
        lines.push(
          `────────────────────────────`,
          `💰 *CONTRACT RATE:* LKR ${price.toLocaleString()} / month`,
          `(${formData.frequency} · ${formData.times} · ${effectiveDist})`
        )
      }
    } else if (!formDef?.isLongTerm && !formDef?.isInspection && formData.cleanersCount) {
      const est = getCustomizedEstimate(formData.cleanersCount, formData.equipment, effectiveDist)
      lines.push(
        `────────────────────────────`,
        `💰 *ESTIMATED TOTAL: LKR ${est.total.toLocaleString()}*`,
        `• Cleaners (${est.cleanersCount}): LKR ${est.cleanerTotal.toLocaleString()}`,
        ...(est.equipmentTotal > 0 ? [`• Additional Equipment (${est.eqCount} items): LKR ${est.equipmentTotal.toLocaleString()}`] : []),
        ...(est.transportRate !== null ? [`• Transport (${est.vehicleName} · ${effectiveDist}): LKR ${est.transportRate.toLocaleString()}`] : []),
        `• 15% Service Margin: LKR ${est.margin.toLocaleString()}`
      )
    } else if (formDef?.isInspection) {
      lines.push(
        `────────────────────────────`,
        `🔍 *Site inspection required before final quotation.*`
      )
    }

    lines.push(
      `────────────────────────────`,
      `Please confirm receipt and booking availability.`
    )

    return lines.join('\n')
  }

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(formatWhatsAppBookingMessage())
    return `https://wa.me/94711569849?text=${text}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep('done')
    try {
      window.open(getWhatsAppUrl(), '_blank')
    } catch (err) {
      console.warn('Popup blocked:', err)
    }
  }

  const reset = () => {
    setStep('category')
    setCategory(null)
    setDistrict('Colombo')
    const defaultLat = 6.9344
    const defaultLng = 79.8428
    const dist = calculateDistanceKm(COLOMBO_HUB.lat, COLOMBO_HUB.lng, defaultLat, defaultLng)
    setUserLocation({
      name: 'Colombo Fort / CBD',
      address: 'Colombo Fort, Colombo',
      lat: defaultLat,
      lng: defaultLng,
      district: 'Colombo',
      province: 'Western Province',
      isWestern: true,
      distanceKm: dist,
      distanceCategory: dist <= 20 ? 'Within 20 KM' : 'Beyond 20 KM',
    })
    setSubService(null)
    setFormData({})
  }

  /* progress */
  const hasContact = Boolean(formDef?.hasContactStep)
  const stepIndex = {
    category: 0,
    location: 1,
    subservice: 2,
    form: 3,
    contact: 4,
    done: hasContact ? 5 : 4,
  }[step] ?? 0

  const stepLabels = hasContact
    ? ['Type', 'Location', 'Service', 'Details', 'Contact', 'Done']
    : ['Type', 'Location', 'Service', 'Details', 'Done']

  const renderField = (field) => {
    const spanFull = field.fullWidth || ['radio', 'radio-conditional', 'pricing-display', 'customized-pricing-display', 'checks', 'textarea'].includes(field.type)
    return (
      <div key={field.key} className={spanFull ? 'sm:col-span-2' : ''}>
        {field.type !== 'pricing-display' && field.type !== 'customized-pricing-display' && (
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {field.label}
            {field.optional && <span className="text-[10px] text-slate-400 font-normal ml-1">(Optional)</span>}
          </label>
        )}

        {(field.type === 'text' || field.type === 'tel') && (
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.key] || ''}
            onChange={e => handleField(field.key, e.target.value)}
            required={!field.optional}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 bg-slate-50 placeholder-slate-400"
          />
        )}

        {(field.type === 'date' || field.type === 'time') && (
          <input
            type={field.type}
            value={formData[field.key] || ''}
            onChange={e => handleField(field.key, e.target.value)}
            required={!field.optional}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 bg-slate-50"
          />
        )}

        {field.type === 'textarea' && (
          <textarea
            rows={3}
            placeholder={field.placeholder}
            value={formData[field.key] || ''}
            onChange={e => handleField(field.key, e.target.value)}
            required={!field.optional}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 bg-slate-50 placeholder-slate-400 resize-none"
          />
        )}

        {field.type === 'radio' && (
          <div className="grid grid-cols-2 gap-2">
            {field.options.map(opt => {
              const selected = formData[field.key] === opt
              return (
                <label
                  key={opt}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${selected
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
                    className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${selected
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
          const effectiveDistance = formData.distance || userLocation?.distanceCategory || 'Within 20 KM'
          const price = getLongtermPrice(formData.frequency, formData.times, effectiveDistance)
          const isComplete = price !== null

          if (!isComplete) {
            return (
              <div className="rounded-2xl border-2 border-dashed border-sky-200 bg-sky-50/50 p-4 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-[11px] font-extrabold text-sky-800 uppercase tracking-wider mb-1.5">
                  <span>Agreement Pricing</span>
                </div>
                <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
                  {!formData.frequency
                    ? 'Select your preferred Frequency above to view pricing'
                    : 'Select how many times per week/month'}
                </p>
              </div>
            )
          }

          return (
            <div className="rounded-2xl border-2 border-sky-400/50 bg-gradient-to-br from-sky-50 via-white to-emerald-50/50 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Estimated Agreement Rate</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-700 font-bold pt-0.5">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs">
                      {formData.frequency}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs">
                      {formData.times}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-sky-200 text-sky-800 font-extrabold shadow-2xs flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-sky-600" />
                      {userLocation?.name ? `${userLocation.name} (${effectiveDistance})` : effectiveDistance}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-2xl sm:text-3xl font-black text-sky-800 tracking-tight leading-none">
                    <span className="text-xs font-bold text-sky-600 mr-1">LKR</span>
                    {price.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">
                    {formData.frequency === 'Weekly' ? 'Monthly Contract Rate' : 'Per Month'}
                  </span>
                </div>
              </div>

              <div className="pt-2.5 border-t border-sky-100/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  All cleaning chemicals &amp; equipment included
                </span>
                <span className="text-slate-400 font-medium">
                  {userLocation?.distanceKm ? `${userLocation.distanceKm} km from Hub` : 'Western Province'}
                </span>
              </div>
            </div>
          )
        })()}

        {field.type === 'customized-pricing-display' && (() => {
          const effectiveDistance = formData.distance || userLocation?.distanceCategory || 'Within 20 KM'
          const est = getCustomizedEstimate(formData.cleanersCount, formData.equipment, effectiveDistance)
          return (
            <div className="rounded-2xl border-2 border-sky-400/50 bg-gradient-to-br from-sky-50 via-white to-emerald-50/50 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Estimated Quotation</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>{userLocation?.name || 'Colombo'}:</span>
                    <span className="font-bold text-slate-700">{userLocation?.distanceKm || 0} km</span>
                    <span>({effectiveDistance})</span>
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-2xl sm:text-3xl font-black text-sky-800 tracking-tight leading-none">
                    <span className="text-xs font-bold text-sky-600 mr-1">LKR</span>
                    {est.total.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">
                    Includes 15% margin
                  </span>
                </div>
              </div>

              {/* Itemized breakdown */}
              <div className="pt-2.5 border-t border-sky-100/80 text-xs space-y-1.5 text-slate-600">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                    <span>1 Professional Cleaner, Chemicals &amp; Equipment</span>
                  </span>
                  <span className="font-bold text-slate-800">LKR 8,500</span>
                </div>

                {est.additionalCleanersCharge > 0 && (
                  <div className="flex justify-between items-center text-sky-900">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                      <span>Additional Cleaners ({est.cleanersCount - 1} × LKR 3,000)</span>
                    </span>
                    <span className="font-bold">+ LKR {est.additionalCleanersCharge.toLocaleString()}</span>
                  </div>
                )}

                {est.equipmentTotal > 0 && (
                  <div className="flex justify-between items-center text-sky-900">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                      <span>Additional Equipment ({est.eqCount} {est.eqCount === 1 ? 'item' : 'items'} × LKR 2,000)</span>
                    </span>
                    <span className="font-bold">+ LKR {est.equipmentTotal.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                    <span>Transportation ({est.vehicleName})</span>
                  </span>
                  <span className="font-bold text-slate-800">
                    + LKR {(est.transportRate || 0).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-1.5 border-t border-slate-100 text-[11px] text-slate-500">
                  <span>15% Service Margin</span>
                  <span className="font-semibold text-slate-700">+ LKR {est.margin.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )
        })()}

        {field.type === 'select' && (
          <select
            value={formData[field.key] || ''}
            onChange={e => handleField(field.key, e.target.value)}
            required={!field.optional}
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
  }

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
              {(step === 'location' || step === 'subservice' || step === 'form' || step === 'contact') && (
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
                          className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all cursor-pointer group ${active
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
                  <h3 className="text-xl font-extrabold text-slate-900 mb-0.5">Your Service Location</h3>
                  <p className="text-xs text-slate-500 mb-3.5">
                    Type your address or pin on the map to calculate service distance &amp; eligibility
                  </p>

                  <MapLocationPicker
                    initialLocation={userLocation}
                    onLocationSelect={(loc) => {
                      setUserLocation(loc)
                      setDistrict(loc.district)
                    }}
                    category={category}
                  />

                  <button
                    onClick={confirmLocation}
                    disabled={!userLocation}
                    className="w-full py-3.5 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold rounded-2xl transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30 hover:shadow-sky-500/50 hover:-translate-y-0.5 active:translate-y-0 mt-3"
                  >
                    <span>Continue to Packages</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* ── STEP 3: Sub-service ── */}
              {step === 'subservice' && category && (
                <>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-1">Select Service</h3>
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-4 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span className="font-bold text-slate-800 truncate">{userLocation?.name || district}</span>
                      <span className="text-[11px] text-slate-500 shrink-0">· {userLocation?.distanceKm || 0} km</span>
                    </div>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                      userLocation?.distanceCategory === 'Within 20 KM'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {userLocation?.distanceCategory || 'Within 20 KM'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {SUB_SERVICES[category].map(sub => {
                      const blocked = sub.westernOnly && !isWestern
                      return (
                        <button
                          key={sub.id}
                          onClick={() => selectSubService(sub)}
                          disabled={blocked}
                          className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all text-left group ${blocked
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
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span className="font-semibold text-slate-800 truncate">{userLocation?.name || district}</span>
                      <span className="text-[11px] text-slate-500 shrink-0">({userLocation?.distanceKm || 0} km · {userLocation?.distanceCategory || 'Within 20 KM'})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep('location')}
                      className="text-sky-600 hover:text-sky-700 font-bold text-[11px] shrink-0 ml-2 hover:underline cursor-pointer"
                    >
                      Change
                    </button>
                  </div>

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

                  <form
                    onSubmit={formDef.hasContactStep ? (e) => { e.preventDefault(); setStep('contact') } : handleSubmit}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
                  >
                    {formDef.fields.map(renderField)}

                    <button
                      type="submit"
                      className={`sm:col-span-2 w-full py-3.5 px-4 font-extrabold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 mt-1 ${
                        formDef.hasContactStep
                          ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 hover:shadow-sky-500/50'
                          : 'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-emerald-600/30 hover:shadow-emerald-500/50'
                      }`}
                    >
                      {!formDef.hasContactStep && <WhatsAppIcon className="w-5 h-5 shrink-0" />}
                      <span>
                        {formDef.hasContactStep
                          ? 'Next: Contact Details'
                          : formDef.isInspection
                            ? 'Request Inspection via WhatsApp'
                            : 'Send Booking via WhatsApp'}
                      </span>
                      {formDef.hasContactStep && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </form>
                </>
              )}

              {/* ── STEP: Contact Details (when hasContactStep) ── */}
              {step === 'contact' && formDef && formDef.contactFields && (
                <>
                  <h3 className="text-base font-extrabold text-slate-900 mb-0.5 leading-snug">
                    {category === 'corporate' ? 'Company & Contact Details' : 'Contact Details'}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span className="font-semibold text-slate-800 truncate">{userLocation?.name || district}</span>
                      <span className="text-[11px] text-slate-500 shrink-0">({userLocation?.distanceKm || 0} km · {userLocation?.distanceCategory || 'Within 20 KM'})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep('location')}
                      className="text-sky-600 hover:text-sky-700 font-bold text-[11px] shrink-0 ml-2 hover:underline cursor-pointer"
                    >
                      Change
                    </button>
                  </div>

                  {/* Selection Summary Pill */}
                  {formDef.isLongTerm && getLongtermPrice(formData.frequency, formData.times, formData.distance || userLocation?.distanceCategory) !== null && (
                    <div className="px-3.5 py-2 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-900 font-bold mb-3 flex items-center justify-between">
                      <span>{formData.frequency} · {formData.times} · {formData.distance || userLocation?.distanceCategory}</span>
                      <span className="font-extrabold text-sky-700">LKR {getLongtermPrice(formData.frequency, formData.times, formData.distance || userLocation?.distanceCategory).toLocaleString()}</span>
                    </div>
                  )}

                  {!formDef.isLongTerm && formData.cleanersCount && (() => {
                    const effectiveDist = formData.distance || userLocation?.distanceCategory || 'Within 20 KM'
                    const est = getCustomizedEstimate(formData.cleanersCount, formData.equipment, effectiveDist)
                    return (
                      <div className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-sky-50 to-emerald-50/70 border border-sky-200 text-xs text-sky-950 font-semibold mb-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <span>
                            {formData.cleanersCount} Cleaner{formData.cleanersCount > 1 ? 's' : ''}
                            {formData.date ? ` · ${formData.date}` : ''}
                            {formData.startTime ? ` (${formData.startTime})` : ''}
                          </span>
                          <span className="font-extrabold text-sky-800 text-sm">
                            LKR {est.total.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-600">
                          <span>
                            {est.vehicleName} · {effectiveDist} ({userLocation?.distanceKm || 0} km)
                            {formData.equipment?.length > 0 ? ` · ${formData.equipment.length} equipment items` : ''}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">Incl. 15% margin</span>
                        </div>
                      </div>
                    )
                  })()}

                  <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {formDef.contactFields.map(renderField)}

                    <button
                      type="submit"
                      className="sm:col-span-2 w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 mt-1"
                    >
                      <WhatsAppIcon className="w-5 h-5 shrink-0" />
                      <span>Send Booking via WhatsApp</span>
                    </button>
                  </form>
                </>
              )}

              {/* ── STEP 5: Done ── */}
              {step === 'done' && (
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-500/10">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                    {formDef?.isInspection ? 'Inspection Request Sent!' : 'Booking Request Sent!'}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                    Thank you{formData.name ? `, ${formData.name}` : ''}. Your details have been prepared for WhatsApp at{' '}
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-700 underline hover:text-emerald-800"
                    >
                      +94 71 156 9849
                    </a>.
                  </p>

                  <div className="text-left text-xs bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-4 space-y-1 text-slate-700">
                    <div><span className="font-bold">Type:</span> {category === 'residential' ? 'Residential' : 'Corporate'}</div>
                    {formData.companyName && <div><span className="font-bold">Company:</span> {formData.companyName}</div>}
                    {formData.role && <div><span className="font-bold">Authorized Person:</span> {formData.name} ({formData.role})</div>}
                    {!formData.role && formData.name && <div><span className="font-bold">Name:</span> {formData.name}</div>}
                    {formData.contact && <div><span className="font-bold">Contact:</span> {formData.contact}</div>}
                    <div><span className="font-bold">Service Location:</span> {userLocation?.name || district} ({userLocation?.distanceKm || 0} km · {userLocation?.distanceCategory || 'Within 20 KM'})</div>
                    <div><span className="font-bold">District / Province:</span> {district}{userLocation?.province ? ` (${userLocation.province})` : ''}</div>
                    {formDef && <div><span className="font-bold">Package:</span> {formDef.title}</div>}
                    {formData.date && (
                      <div>
                        <span className="font-bold">{formDef?.isInspection ? 'Inspection Date:' : 'Cleaning Date:'}</span> {formData.date}
                        {formData.startTime ? ` at ${formData.startTime}` : formData.time ? ` at ${formData.time}` : ''}
                      </div>
                    )}
                    {formData.cleanersCount && <div><span className="font-bold">Cleaners:</span> {formData.cleanersCount}</div>}
                    {formData.propertyDetails && <div><span className="font-bold">{category === 'corporate' ? 'Premises Details:' : 'Property Details:'}</span> {formData.propertyDetails}</div>}
                    {formData.equipment?.length > 0 && <div><span className="font-bold">Equipment:</span> {formData.equipment.join(', ')}</div>}
                    {formData.instructions && (
                      <div className="pt-1 border-t border-slate-200 mt-1">
                        <span className="font-bold">Scope / Special Requests:</span>
                        <p className="italic text-slate-600 whitespace-pre-wrap">{formData.instructions}</p>
                      </div>
                    )}
                    {formDef?.isLongTerm && getLongtermPrice(formData.frequency, formData.times, formData.distance || userLocation?.distanceCategory) !== null && (
                      <div className="pt-1 text-sky-700 font-extrabold">
                        Estimated Rate: LKR {getLongtermPrice(formData.frequency, formData.times, formData.distance || userLocation?.distanceCategory).toLocaleString()}
                      </div>
                    )}
                    {!formDef?.isLongTerm && !formDef?.isInspection && formData.cleanersCount && (() => {
                      const effectiveDist = formData.distance || userLocation?.distanceCategory || 'Within 20 KM'
                      const est = getCustomizedEstimate(formData.cleanersCount, formData.equipment, effectiveDist)
                      return (
                        <div className="pt-2 border-t border-slate-200 space-y-1">
                          <div className="flex items-center justify-between text-sky-800 font-black text-sm">
                            <span>Estimated Total:</span>
                            <span>LKR {est.total.toLocaleString()}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 space-y-0.5">
                            <div>• Cleaners ({est.cleanersCount}): LKR {est.cleanerTotal.toLocaleString()}</div>
                            {est.equipmentTotal > 0 && <div>• Additional Equipment ({est.eqCount} items): LKR {est.equipmentTotal.toLocaleString()}</div>}
                            {est.transportRate !== null && <div>• Transport ({est.vehicleName} · {effectiveDist}): LKR {est.transportRate.toLocaleString()}</div>}
                            <div>• 15% Service Margin: LKR {est.margin.toLocaleString()}</div>
                          </div>
                        </div>
                      )
                    })()}
                  </div>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm mb-2.5 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    <span>Send via WhatsApp (+94 71 156 9849)</span>
                  </a>

                  <button
                    onClick={reset}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all cursor-pointer text-xs"
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
