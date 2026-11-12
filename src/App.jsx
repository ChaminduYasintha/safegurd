import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Packages from './components/Packages'
import VideoGallery from './components/VideoGallery'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

const scrollToQuote = () => {
  document.getElementById('quote-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white font-sans antialiased">
      <Navbar onBookNow={scrollToQuote} />
      <main>
        <Hero />
        <Services onBookNow={scrollToQuote} />
        <Packages onBookNow={scrollToQuote} />
        <VideoGallery />
        <About onBookNow={scrollToQuote} />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
