import { ArrowRight, Sparkles } from 'lucide-react'
import glassImg from '../assets/service_glass.jpg'
import sofaImg from '../assets/service_sofa.jpg'
import floorImg from '../assets/service_floor.jpg'
import washroomImg from '../assets/service_washroom.jpg'
import gardenImg from '../assets/service_garden.jpg'
import allImg from '../assets/service_all.jpg'

const services = [
  {
    id: 'glass',
    title: 'Glass, Door & Window Cleaning',
    description: 'Clear, fresh-looking glass, doors and windows.',
    image: glassImg,
    tag: 'Popular',
    tagColor: '#0284c7',
  },
  {
    id: 'sofa',
    title: 'Sofa, Mattress & Furniture Cleaning',
    description: 'Cleaning care for upholstered furniture and mattresses.',
    image: sofaImg,
    tag: 'Deep Sanitise',
    tagColor: '#16a34a',
  },
  {
    id: 'floor',
    title: 'Floor Scrubbing & Polishing',
    description: 'Detailed floor cleaning and polishing for a refreshed finish.',
    image: floorImg,
    tag: 'Specialist',
    tagColor: '#0891b2',
  },
  {
    id: 'washroom',
    title: 'Washroom Cleaning & Disinfection',
    description: 'Washroom cleaning and disinfection for homes and workplaces.',
    image: washroomImg,
    tag: 'Hygienic Care',
    tagColor: '#059669',
  },
  {
    id: 'garden',
    title: 'Garden & Pond Cleaning',
    description: 'Outdoor cleaning support for gardens, ponds and surrounding areas.',
    image: gardenImg,
    tag: 'Outdoor',
    tagColor: '#d97706',
  },
  {
    id: 'all',
    title: 'All Cleaning Works',
    description: 'Tell us what you need and our team can discuss a suitable solution.',
    image: allImg,
    tag: 'Custom',
    tagColor: '#4f46e5',
  },
]

export default function Services({ onBookNow }) {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold uppercase tracking-widest mb-3 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>What We Do</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Our Cleaning Services
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            A complete range of cleaning solutions for residential and commercial spaces across Sri Lanka.
          </p>
        </div>

        {/* Services Grid (3 columns desktop, 2 tablet, 1 mobile) */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl hover:border-sky-300 transition-all duration-300 flex flex-col hover:-translate-y-1.5"
            >
              {/* Image Container with Zoom effect */}
              <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span
                  className="absolute top-4 left-4 text-[11px] font-bold text-white px-3 py-1 rounded-full shadow-sm backdrop-blur-xs"
                  style={{ backgroundColor: service.tagColor }}
                >
                  {service.tag}
                </span>
              </div>

              {/* Service Info */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Request Quotation Link Button */}
                <button
                  type="button"
                  onClick={() => onBookNow(service.title)}
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-600 hover:text-emerald-700 group-hover:gap-3 transition-all cursor-pointer pt-2 border-t border-slate-100"
                >
                  <span>Request a quotation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
