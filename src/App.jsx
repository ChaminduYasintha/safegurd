import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Packages from './components/Packages'
import VideoGallery from './components/VideoGallery'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BookingPage from './components/BookingPage'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  const [currentPage, setCurrentPage] = useState(
    window.location.hash === '#booking' ? 'booking' : 'home'
  )
  const [selectedService, setSelectedService] = useState(null)
  const [selectedParams, setSelectedParams] = useState({})

  // Handle browser back / forward navigation and hash sync
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#booking') {
        setCurrentPage('booking')
      } else {
        setCurrentPage('home')
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateToBooking = (service = null, params = {}) => {
    setSelectedService(service)
    setSelectedParams(params)
    setCurrentPage('booking')
    window.location.hash = '#booking'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToHome = (sectionHash = '') => {
    setCurrentPage('home')
    window.location.hash = sectionHash
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white font-sans antialiased">
      {currentPage === 'booking' ? (
        <>
          <BookingPage
            onBackToHome={() => navigateToHome('')}
            initialService={selectedService}
            initialParams={selectedParams}
          />
          <Footer />
          <WhatsAppButton />
        </>
      ) : (
        <>
          <Navbar onBookNow={() => navigateToBooking()} />
          <main>
            <Hero onBookNow={navigateToBooking} />
            <Services onBookNow={navigateToBooking} />
            <Packages onBookNow={navigateToBooking} />
            <VideoGallery onBookNow={navigateToBooking} />
            <About onBookNow={navigateToBooking} />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
          <WhatsAppButton />
        </>
      )}
    </div>
  )
}

export default App
