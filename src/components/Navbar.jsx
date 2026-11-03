import { useState, useEffect } from 'react'
import { Menu, X, Phone, MapPin, Mail } from 'lucide-react'
import logoImg from '../assets/logo.jpg'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#why-us' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onBookNow }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* ── Top Blue Contact Bar ── */}
      <div className="bg-[#08729f] text-white text-xs py-2 px-4 sm:px-8 border-b border-white/10 relative z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-5 sm:gap-6 flex-wrap">
            <a
              href="tel:+94704906565"
              className="inline-flex items-center gap-1.5 hover:text-sky-200 transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-white/90" />
              <span>+94 70 490 5655</span>
            </a>
            <span className="hidden md:inline-flex items-center gap-1.5 text-white/90">
              <MapPin className="w-3.5 h-3.5 text-white/90" />
              <span>14/1/A, Kandy Road, Kadawatha</span>
            </span>
            <a
              href="mailto:sameerasellapperuma@gmail.com"
              className="hidden lg:inline-flex items-center gap-1.5 hover:text-sky-200 transition-colors text-white/90"
            >
              <Mail className="w-3.5 h-3.5 text-white/90" />
              <span>sameerasellapperuma@gmail.com</span>
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.facebook.com/profile.php?id=100084914851233"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-[#08729f] transition-all text-[11px] font-bold"
              aria-label="Safeguard Facebook Page"
            >
              f
            </a>
            <a
              href="https://wa.me/94704906565"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-[#08729f] transition-all text-[11px]"
              aria-label="Safeguard WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-[#08729f] transition-all text-[11px]"
              aria-label="Safeguard Instagram"
            >
              ◎
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Bar (Clean borderless transition) ── */}
      <header
        className={`transition-[background-color,padding,top] duration-300 z-50 ${
          scrolled
            ? 'fixed top-3 sm:top-4 left-0 right-0 px-4 sm:px-6 bg-transparent border-0'
            : 'sticky top-0 w-full bg-white border-b border-slate-100 shadow-xs px-0'
        }`}
      >
        <div className={scrolled ? 'max-w-6xl mx-auto' : 'max-w-7xl mx-auto px-5 sm:px-8'}>
          <div
            className={`transition-[box-shadow,border-radius,padding,background-color] duration-300 flex items-center justify-between border-0 ${
              scrolled
                ? 'rounded-full bg-white shadow-2xl shadow-slate-900/15 px-6 sm:px-10 py-3 sm:py-3.5'
                : 'rounded-none bg-transparent shadow-none px-0 py-3.5 sm:py-4'
            }`}
          >
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center group py-0.5"
              aria-label="Safeguard Cleaning Services"
            >
              <img
                src={logoImg}
                alt="Safeguard Cleaning Services"
                className="h-9 sm:h-11 md:h-12 w-auto max-w-[165px] sm:max-w-[210px] md:max-w-[240px] object-contain group-hover:opacity-90 transition-opacity"
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 sm:gap-9">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm sm:text-base font-bold text-slate-800 hover:text-sky-600 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sky-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA Button: Get a Quote */}
            <div className="hidden sm:flex items-center">
              <button
                onClick={onBookNow}
                className="px-7 sm:px-8 py-2.5 sm:py-3 bg-sky-600 hover:bg-sky-500 text-white text-sm sm:text-base font-extrabold rounded-full shadow-md shadow-sky-600/30 hover:shadow-lg hover:shadow-sky-600/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border-0"
              >
                Get a Quote
              </button>
            </div>

            {/* Mobile Buttons */}
            <div className="flex items-center gap-2 sm:hidden">
              <button
                onClick={onBookNow}
                className="px-3.5 py-1.5 bg-sky-600 text-white text-xs font-bold rounded-full cursor-pointer shadow-sm border-0"
              >
                Get Quote
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1.5 text-slate-800 hover:text-sky-600 focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="lg:hidden mt-2 p-4 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2.5 text-sm font-semibold text-slate-800 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMenuOpen(false)
                      onBookNow()
                    }}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-xl shadow-md transition-all text-center cursor-pointer border-0"
                  >
                    Get a Quote
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
