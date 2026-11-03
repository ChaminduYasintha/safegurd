import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import logoImg from '../assets/logo.jpg'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Why Safeguard', href: '#why-us' },
  { label: 'Videos', href: '#videos' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onBookNow }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25)
    }
    // Check initial scroll state
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 px-4 sm:px-6 transition-all duration-300">
      <div className="max-w-5xl mx-auto">
        <div
          className={`rounded-full transition-all duration-300 px-4 sm:px-7 py-2 sm:py-2.5 flex items-center justify-between border ${
            scrolled
              ? 'bg-white/95 backdrop-blur-md shadow-xl shadow-slate-900/15 border-slate-200'
              : 'bg-transparent border-transparent shadow-none'
          }`}
        >
          {/* Logo Container — Clean white rounded card when transparent to keep logo dark text crystal-clear */}
          <a
            href="#"
            className="flex items-center group transition-all"
            aria-label="Safeguard Cleaning Services"
          >
            <div
              className={`rounded-full transition-all duration-300 flex items-center ${
                scrolled
                  ? 'bg-transparent p-0'
                  : 'bg-white px-3 sm:px-4 py-1 sm:py-1.5 shadow-md shadow-black/20'
              }`}
            >
              <img
                src={logoImg}
                alt="Safeguard Cleaning Services"
                className="h-7 sm:h-8 md:h-9 w-auto max-w-[145px] sm:max-w-[175px] md:max-w-[195px] object-contain group-hover:opacity-90 transition-opacity"
              />
            </div>
          </a>

          {/* Desktop Navigation Links — White text when transparent at top, dark slate when scrolled */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:scale-x-0 hover:after:scale-x-100 after:transition-transform ${
                  scrolled
                    ? 'text-slate-700 hover:text-sky-600 after:bg-sky-600'
                    : 'text-white hover:text-sky-300 after:bg-sky-400'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={onBookNow}
              className="px-6 sm:px-7 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-sm font-extrabold rounded-full shadow-md shadow-sky-600/30 hover:shadow-lg hover:shadow-sky-600/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={onBookNow}
              className="px-3.5 py-1.5 bg-sky-600 text-white text-xs font-bold rounded-full cursor-pointer"
            >
              Book
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-1.5 transition-colors focus:outline-none cursor-pointer ${
                scrolled ? 'text-slate-700 hover:text-sky-600' : 'text-white hover:text-sky-300'
              }`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown Card */}
        {menuOpen && (
          <div className="lg:hidden mt-2 p-4 bg-white/98 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-colors"
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
                  className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-xl shadow-md transition-all text-center cursor-pointer"
                >
                  Book Now / Get a Quote
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
