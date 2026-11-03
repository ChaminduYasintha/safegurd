import { Star, Sparkles, CheckCircle2 } from 'lucide-react'

const testimonials = [
  {
    name: 'Kavinda Perera',
    role: 'Homeowner',
    location: 'Kadawatha',
    review:
      'Safeguard cleaned our two-story house before our family gathering. The sofa deep cleaning and floor scrubbing brought the living area back to life. Very polite and thorough team.',
    rating: 5,
    tag: 'Residential Deep Clean',
  },
  {
    name: 'Nalaka Wickramasinghe',
    role: 'Managing Director, Horizon Tech',
    location: 'Colombo 03',
    review:
      'We contracted Safeguard for commercial office carpet and glass partition cleaning. Punctual, equipped with proper machines, and zero disturbance to our working hours.',
    rating: 5,
    tag: 'Commercial Care',
  },
  {
    name: 'Dilini Senanayake',
    role: 'Villa Owner',
    location: 'Kelaniya',
    review:
      'Excellent washroom sanitization and outdoor garden cleaning. Their staff followed all safety protocols and left everything spotless. Highly recommended in the Gampaha district.',
    rating: 5,
    tag: 'Washroom & Outdoor Care',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-extrabold uppercase tracking-widest mb-3 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            What Our Customers Say
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Real experiences from homeowners, villa hosts, and corporate clients across Sri Lanka.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
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
                  <div className="text-xs text-slate-500 font-medium">
                    {t.role} • {t.location}
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center" title="Verified Client">
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
