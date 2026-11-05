import { useState } from 'react'
import { Phone, MessageCircle, Clock, MapPin, Mail, Send, CheckCircle2 } from 'lucide-react'

const services = [
  'Glass, Door & Window Cleaning',
  'Sofa, Mattress & Furniture Cleaning',
  'Floor Scrubbing & Polishing',
  'Washroom Cleaning & Disinfection',
  'Garden & Pond Cleaning',
  'All Cleaning Works',
  'Residential Care Package',
  'Commercial Care Package',
  'Facility & Deep Cleaning Package',
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: services[0],
    propertyType: 'Residential',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, integrate with EmailJS or backend
    console.log('Quotation Request Submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: services[0],
        propertyType: 'Residential',
        message: '',
      })
    }, 5000)
  }

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Safeguard Cleaning! My name is ${formData.name || 'a customer'}. I would like a quote for ${formData.service} for my ${formData.propertyType} property. Phone: ${formData.phone || 'N/A'}. Details: ${formData.message || 'Please provide details.'}`
    )
    window.open(`https://wa.me/94704906565?text=${text}`, '_blank')
  }

  return (
    <section id="contact" className="py-24 bg-slate-50 relative border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-extrabold uppercase tracking-widest mb-3 border border-sky-200">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Contact &amp; Quotation Request
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Reach out directly or send us your requirements. Our management team will provide a tailored quote and inspection schedule.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left Column — Contact Information & Map */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md">
              <h3 className="text-xl font-extrabold text-slate-900 mb-6">
                Safeguard Cleaning Services (Pvt) Ltd
              </h3>

              <div className="space-y-5">
                {/* Phones */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Hotline Numbers
                    </div>
                    <a
                      href="tel:+94704906565"
                      className="block text-slate-900 font-extrabold text-base hover:text-sky-600 transition-colors"
                    >
                      070 490 5655
                    </a>
                    <div className="text-slate-600 text-sm font-semibold mt-0.5">
                      070 330 56 50 &bull; 077 530 56 50
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      WhatsApp Support
                    </div>
                    <a
                      href="https://wa.me/94704906565"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-slate-900 font-extrabold text-base hover:text-emerald-600 transition-colors"
                    >
                      +94 70 490 5655
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Email Address
                    </div>
                    <a
                      href="mailto:sameerasellapperuma@gmail.com"
                      className="block text-slate-900 font-semibold text-sm hover:text-indigo-600 transition-colors break-all"
                    >
                      sameerasellapperuma@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Head Office
                    </div>
                    <div className="text-slate-900 font-bold text-sm leading-snug">
                      14/1/A, Kandy Road, Kadawatha, Sri Lanka
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Service Hours
                    </div>
                    <div className="text-slate-900 font-bold text-sm">
                      Monday &ndash; Sunday: 7:00 AM &ndash; 7:00 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200/80 bg-white h-64">
              <iframe
                title="Safeguard Cleaning Services Kadawatha Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.2285145620953!2d79.94825947475765!3d6.982329993018596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae257f867c29e61%3A0x6d092d6e3c5ec4f0!2sKadawatha!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column — Inquiry & Quotation Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                Request a Free Quotation
              </h3>
              <p className="text-slate-600 text-sm mb-8">
                Fill in the details below and we will get back to you with pricing and schedule availability.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-extrabold text-emerald-950 mb-2">
                    Inquiry Received Successfully!
                  </h4>
                  <p className="text-sm text-emerald-800 max-w-md mx-auto mb-6">
                    Thank you, <span className="font-bold">{formData.name}</span>. A Safeguard representative will call or WhatsApp you at <span className="font-bold">{formData.phone}</span> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-md inline-flex items-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Also Send via WhatsApp</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priyantha Silva"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 077 123 4567"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                        Property Type
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                      >
                        <option value="Residential">Residential (House / Apartment)</option>
                        <option value="Commercial">Commercial / Office</option>
                        <option value="Hospitality">Hotel / Restaurant</option>
                        <option value="Hospital/Clinic">Hospital / Medical Facility</option>
                        <option value="Other">Other Space</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                      Select Service Needed
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    >
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                      Additional Details &amp; Location
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please mention your location, approximate area or number of rooms, and preferred date..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-y"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-4 px-6 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-xl shadow-lg shadow-sky-600/30 hover:shadow-sky-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Quotation Request</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Chat on WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
