import { useRef } from 'react'
import { Star, Sparkles, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Kavinda Perera',
    role: 'Homeowner',
    location: 'Kadawatha',
    review:
      'Safeguard cleaned our two-story house before our family gathering. The sofa deep cleaning and floor scrubbing brought the living area back to life. Very polite and thorough team.',
    rating: 5,
    tag: 'Residential Deep Clean',
  },
  {
    id: 2,
    name: 'Nalaka Wickramasinghe',
    role: 'Managing Director, Horizon Tech',
    location: 'Colombo 03',
    review:
      'We contracted Safeguard for commercial office carpet and glass partition cleaning. Punctual, equipped with proper machines, and zero disturbance to our working hours.',
    rating: 5,
    tag: 'Commercial Care',
  },
  {
    id: 3,
    name: 'Dilini Senanayake',
    role: 'Villa Owner',
    location: 'Kelaniya',
    review:
      'Excellent washroom sanitization and outdoor garden cleaning. Their staff followed all safety protocols and left everything spotless. Highly recommended in the Gampaha district.',
    rating: 5,
    tag: 'Washroom & Outdoor Care',
  },
  {
    id: 4,
    name: 'Shanaka Fernando',
    role: 'Operations Manager, Blue Ocean',
    location: 'Gampaha',
    review:
      'We scheduled Safeguard for whole-facility glass and machine floor polishing. The crew arrived fully equipped with safety gear and industrial machines. Flawless execution and delivered right on time.',
    rating: 5,
    tag: 'Facility & Floor Care',
  },
  {
    id: 5,
    name: 'Kumari Jayawardena',
    role: 'Apartment Resident',
    location: 'Peliyagoda',
    review:
      'Booked their mattress deep disinfection and kitchen tile scrub service. Incredible difference! The team was polite, arrived exactly on schedule, and used eco-safe products that smelled fresh.',
    rating: 5,
    tag: 'Home Care & Disinfection',
  },
]

export default function Testimonials() {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <section id="testimonials" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Section Header with Carousel Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-extrabold uppercase tracking-widest mb-3 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customer Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
              What Our Customers Say
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Real experiences from homeowners, villa hosts, and corporate clients across Sri Lanka.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-amber-50 hover:border-amber-300 text-slate-700 hover:text-amber-600 flex items-center justify-center shadow-sm transition-all cursor-pointer"
              aria-label="Previous customer reviews"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-amber-50 hover:border-amber-300 text-slate-700 hover:text-amber-600 flex items-center justify-center shadow-sm transition-all cursor-pointer"
              aria-label="Next customer reviews"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Slider Track */}
        <div
          ref={scrollRef}
          className="flex gap-7 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none scroll-smooth"
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="w-[85vw] sm:w-[calc(50%-14px)] lg:w-[calc(33.333%-19px)] flex-shrink-0 snap-start bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars & Category Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {t.tag}
                  </span>
                </div>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    {t.role} &bull; {t.location}
                  </div>
                </div>

                <div
                  className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0"
                  title="Verified Customer Review"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
