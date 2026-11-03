import { Check, Sparkles, ArrowRight } from 'lucide-react'

const packages = [
  {
    tag: 'For homes',
    name: 'Residential Care',
    description: 'For apartments, houses and private residences.',
    features: [
      'Routine home cleaning',
      'Kitchen and washroom cleaning',
      'Optional deep-cleaning add-ons',
      'Eco-friendly child & pet safe products',
      'Flexible weekly or bi-weekly schedules',
    ],
    priceText: 'Custom quotation',
    popular: false,
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  {
    tag: 'For workplaces',
    name: 'Commercial Care',
    description: 'For offices, shops and business premises.',
    features: [
      'Office and common-area cleaning',
      'Floor and glass cleaning options',
      'Scheduled service arrangements',
      'After-hours & weekend availability',
      'Dedicated facility supervisor',
    ],
    priceText: 'Custom quotation',
    popular: true,
    badgeColor: 'text-sky-700 bg-sky-50 border-sky-200',
  },
  {
    tag: 'Specialist facilities',
    name: 'Facility & Deep Cleaning',
    description: 'For hotels, restaurants, hospitals and larger facilities.',
    features: [
      'Washroom cleaning and disinfection',
      'Detailed cleaning tasks by agreement',
      'Site-specific service planning',
      'High-grade sanitized standards',
      'Full post-service verification checklist',
    ],
    priceText: 'Custom quotation',
    popular: false,
    badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
  },
]

export default function Packages({ onBookNow }) {
  return (
    <section id="packages" className="py-24 bg-slate-50 relative border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-extrabold uppercase tracking-widest mb-3 border border-sky-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Flexible Service Options</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Cleaning Packages
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Choose a service level and request a quotation. Final scope and pricing are confirmed after reviewing your requirements.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid gap-8 lg:grid-cols-3 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? 'bg-white shadow-2xl border-2 border-sky-500 lg:-translate-y-2'
                  : 'bg-white shadow-md border border-slate-200/80 hover:shadow-xl hover:border-slate-300'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-sky-600 text-white text-xs font-extrabold rounded-full shadow-md uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div>
                <span
                  className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 border ${pkg.badgeColor}`}
                >
                  {pkg.tag}
                </span>

                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                  {pkg.name}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {pkg.description}
                </p>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  {pkg.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="pt-6 border-t border-slate-100 mb-6">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Pricing Scheme
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">
                    {pkg.priceText}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onBookNow(pkg.name)}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    pkg.popular
                      ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 hover:shadow-sky-600/50 hover:-translate-y-0.5'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20 hover:-translate-y-0.5'
                  }`}
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

