import { Phone, MapPin, Mail, ArrowUp } from 'lucide-react'
import logoImg from '../assets/logo.jpg'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Services', href: '#services' },
  { label: 'Cleaning Packages', href: '#packages' },
  { label: 'Why Safeguard', href: '#why-us' },
  { label: 'Cleaning Videos', href: '#videos' },
  { label: 'Customer Reviews', href: '#testimonials' },
  { label: 'Contact Us', href: '#contact' },
]

const servicesList = [
  'Glass, Door & Window Cleaning',
  'Sofa, Mattress & Furniture Cleaning',
  'Floor Scrubbing & Polishing',
  'Washroom Cleaning & Disinfection',
  'Garden & Pond Cleaning',
  'All Cleaning Works',
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0b1c28] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 mb-14">
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <div className="mb-4 inline-block bg-white px-3 py-1.5 rounded-xl shadow-xs">
              <img
                src={logoImg}
                alt="Safeguard Cleaning Services"
                className="h-9 w-auto max-w-[190px] object-contain"
              />
            </div>

            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              Standardized, reliable and professional cleaning services in Sri Lanka for residential, commercial, hospital, hotel, restaurant and more.
            </p>

            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100084914851233"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-sky-600 hover:text-white transition-all text-xs font-bold"
                aria-label="Safeguard Facebook Page"
              >
                f
              </a>
              <a
                href="https://wa.me/94704906565"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-[#25D366] hover:text-white transition-all"
                aria-label="Safeguard WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-pink-600 hover:text-white transition-all text-xs font-bold"
                aria-label="Safeguard Instagram"
              >
                ig
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h5 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h5>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-slate-400 hover:text-sky-400 transition-colors font-medium inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h5 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4">
              Our Services
            </h5>
            <ul className="space-y-2.5">
              {servicesList.map((svc) => (
                <li key={svc}>
                  <a
                    href="#services"
                    className="text-xs text-slate-400 hover:text-sky-400 transition-colors font-medium inline-block"
                  >
                    {svc}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="lg:col-span-3">
            <h5 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4">
              Find Us
            </h5>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  14/1/A, Kandy Road,<br />
                  Kadawatha, Sri Lanka
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+94704906565" className="hover:text-white text-slate-300 font-bold block">
                    070 490 5655
                  </a>
                  <span className="text-[11px] text-slate-500">
                    070 330 56 50 &bull; 077 530 56 50
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:sameerasellapperuma@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  sameerasellapperuma@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Safeguard Cleaning Services (Pvt) Ltd. All rights reserved.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-sky-400 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
