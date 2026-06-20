import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiPhone, 
  FiMapPin, 
  FiCheckCircle, 
  FiStar, 
  FiArrowRight, 
  FiMenu, 
  FiX, 
  FiInfo, 
  FiCalendar,
  FiUsers,
  FiClock,
  FiShield,
  FiCompass,
  FiChevronRight
} from 'react-icons/fi'

// Custom WhatsApp SVG icon to ensure absolute compatibility and premium styling
const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function HotelImperialHeightsDemo() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [hoveredMapNode, setHoveredMapNode] = useState(null)

  // Standard WhatsApp Details
  const PHONE_NUMBER = "919123461616"
  const getWhatsAppLink = (message) => {
    return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`
  }

  // Detect scroll to make navbar sticky with background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll handler
  const scrollToSection = (id) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Custom styling tokens
  const colors = {
    bg: "bg-[#1B1410]", // deep warm charcoal background
    card: "bg-[#211A14]", // card surface
    border: "border-[#3A2E22]", // borders
    gold: "text-[#B8893E]", // muted brass gold accent
    goldBg: "bg-[#B8893E]",
    goldBorder: "border-[#B8893E]",
    oxblood: "bg-[#2A1418]", // deep oxblood/maroon background
    oxbloodBorder: "border-[#6B2630]"
  }

  // Sample data for rooms
  const rooms = [
    {
      id: 'featured',
      name: 'Executive Suite',
      price: '₹5,200',
      tagline: 'The Pinnacle of Sanctuary & Luxury',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
      description: 'Our most prestigious suite, offering a spacious split-living arrangement. Impeccably furnished with solid hardwoods, premium linen, separate seating parlor, and a direct visual vista of the holy town. Perfect for VIP temple visits and families seeking absolute comfort.',
      tags: ['King Bed', 'Separate Parlor', 'Temple View', 'Free High-speed Wi-Fi', 'Premium Bath Linens'],
      ctaMessage: 'Hello Hotel Imperial Heights, I would like to book the Executive Suite (₹5,200/night). Please check availability.'
    },
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      price: '₹2,800',
      tagline: 'Refined Comfort for Pilgrims & Professionals',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
      description: 'Elegant comfort featuring a plush queen-sized bed, fully air-conditioned interiors, workspace desk, and sleek walk-in shower room.',
      tags: ['Queen Bed', 'Air Conditioned', 'Free Wi-Fi', 'Smart TV'],
      ctaMessage: 'Hello Hotel Imperial Heights, I would like to book the Deluxe Room (₹2,800/night). Please check availability.'
    },
    {
      id: 'premium',
      name: 'Premium Room',
      price: '₹3,600',
      tagline: 'Spacious Sanctuary with Enhanced Views',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      description: 'Elevated room configuration featuring an expansive king-sized bed, refined heritage accents, writing lounge, and panoramic views of Williams Town.',
      tags: ['King Bed', 'City/Temple View', 'Lounge Seating', 'Mini Fridge', 'Free Wi-Fi'],
      ctaMessage: 'Hello Hotel Imperial Heights, I would like to book the Premium Room (₹3,600/night). Please check availability.'
    },
    {
      id: 'family',
      name: 'Family Suite',
      price: '₹6,800',
      tagline: 'Generous Space for Your Entire Entourage',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80',
      description: 'Specifically engineered for families visiting Baba Baidyanath Dham together. Features two large queen beds, a cozy seating zone, and dual vanity washrooms.',
      tags: ['2 Queen Beds', 'Spacious Seating', 'Up to 4 Guests', 'Dual Vanity Washroom', 'Free Wi-Fi'],
      ctaMessage: 'Hello Hotel Imperial Heights, I would like to book the Family Suite (₹6,800/night). Please check availability.'
    }
  ]

  // Gallery items with grid positions
  const galleryItems = [
    {
      title: 'Rooftop Lounge',
      description: 'Panoramic views of Deoghar city at twilight.',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80',
      gridClass: 'md:col-span-2 md:row-span-2'
    },
    {
      title: 'Grand Lobby',
      description: 'Warm heritage stone pillars and welcoming seating.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      gridClass: 'md:col-span-1 md:row-span-1'
    },
    {
      title: 'Executive Suite Interior',
      description: 'Warm mood lighting and custom Indian wood detailing.',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80',
      gridClass: 'md:col-span-1 md:row-span-1'
    },
    {
      title: 'Dining Hall',
      description: 'Authentic multi-cuisine dining options with fine seating.',
      image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=600&q=80',
      gridClass: 'md:col-span-1 md:row-span-1'
    },
    {
      title: 'Banquet & Event Setup',
      description: 'Premium wedding arrangement with royal floral motifs.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80',
      gridClass: 'md:col-span-1 md:row-span-1'
    }
  ]

  // Map landmarks
  const mapLandmarks = [
    { id: 'temple', label: 'Baidyanath Dham Temple', x: '50%', y: '20%', type: 'landmark', desc: '5 mins drive / walk' },
    { id: 'station', label: 'Baidyanath Dham Station', x: '25%', y: '45%', type: 'station', desc: '3 mins drive' },
    { id: 'hotel', label: 'Hotel Imperial Heights', x: '45%', y: '50%', type: 'hotel', desc: 'Your Destination' },
    { id: 'chowk', label: 'Tower Chowk', x: '70%', y: '60%', type: 'landmark', desc: 'Located nearby' },
    { id: 'airport', label: 'Deoghar Airport (IXR)', x: '80%', y: '90%', type: 'airport', desc: '15 mins drive' }
  ]

  // Map route connections
  const mapConnections = [
    { from: 'station', to: 'hotel', color: '#B8893E' },
    { from: 'hotel', to: 'temple', color: '#B8893E' },
    { from: 'hotel', to: 'chowk', color: '#3A2E22' },
    { from: 'airport', to: 'hotel', color: '#3A2E22' }
  ]

  return (
    <div className={`min-h-screen bg-[#1B1410] text-[#E8DCC4] font-worksans overflow-x-hidden selection:bg-[#B8893E] selection:text-[#1B1410]`}>
      
      {/* Dynamic Marquee CSS Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}} />

      {/* 1. STICKY NAV */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-[#211A14]/95 backdrop-blur-md border-[#3A2E22] py-4 shadow-lg' 
          : 'bg-transparent border-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Hotel Name/Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-start focus:outline-none">
            <span className="font-fraunces text-xl md:text-2xl font-semibold tracking-wide text-white flex items-center gap-2">
              Hotel Imperial Heights
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8893E] font-medium font-worksans">Deoghar</span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {['Rooms', 'Gallery', 'Banquet', 'Why Direct', 'Location'].map((item) => {
              const id = item.toLowerCase().replace(' ', '-');
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(id)}
                  className="text-xs uppercase tracking-widest text-[#E8DCC4]/70 hover:text-[#B8893E] transition-colors duration-300 font-medium"
                >
                  {item}
                </button>
              )
            })}
          </nav>

          {/* Nav CTA */}
          <div className="hidden lg:flex items-center">
            <a
              href={getWhatsAppLink("Hello Hotel Imperial Heights, I would like to make a booking inquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B8893E] hover:bg-[#a17734] text-[#1B1410] font-semibold text-xs tracking-wider uppercase px-5 py-2.5 rounded-sm transition-all duration-300 flex items-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Book on WhatsApp
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white/95 focus:outline-none p-1.5 border border-[#3A2E22] rounded bg-[#211A14]/50"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#211A14] border-b border-[#3A2E22] absolute top-full left-0 right-0 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {['Rooms', 'Gallery', 'Banquet', 'Why Direct', 'Location'].map((item) => {
                  const id = item.toLowerCase().replace(' ', '-');
                  return (
                    <button
                      key={item}
                      onClick={() => scrollToSection(id)}
                      className="text-left text-sm uppercase tracking-widest text-[#E8DCC4]/80 hover:text-[#B8893E] transition-colors py-1"
                    >
                      {item}
                    </button>
                  )
                })}
                <hr className="border-[#3A2E22]" />
                <a
                  href={getWhatsAppLink("Hello Hotel Imperial Heights, I would like to make a booking inquiry.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#B8893E] hover:bg-[#a17734] text-[#1B1410] font-semibold text-xs tracking-wider uppercase py-3.5 rounded-sm transition-all duration-300 flex items-center justify-center gap-2.5 w-full shadow-lg"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Book on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer to push content past header */}
      <div className="h-[76px] lg:h-[88px]" />

      {/* 2. TICKER MARQUEE */}
      <div className="bg-[#0E0906] border-y border-[#3A2E22] py-3.5 overflow-hidden w-full select-none">
        <div className="animate-marquee-slow flex items-center whitespace-nowrap gap-12 text-[#B8893E]">
          {Array(4).fill([
            "5 MIN FROM BAIDYANATH DHAM",
            "DIRECT BOOKING",
            "NO COMMISSION",
            "4.4★ 3,500+ GUESTS",
            "WEDDING-READY BANQUET"
          ]).flat().map((text, idx) => (
            <span key={idx} className="flex items-center gap-4 font-worksans text-xs font-semibold uppercase tracking-[0.2em]">
              {idx % 5 === 0 && <FiStar className="fill-current w-3 h-3 text-[#B8893E]" />}
              {idx % 5 !== 0 && <span className="w-1.5 h-1.5 rounded-full bg-[#B8893E]" />}
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* 3. HERO SECTION */}
      <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center justify-start overflow-hidden">
        {/* Full-width Image Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80" 
            alt="Hotel Imperial Heights Heritage Facade" 
            className="w-full h-full object-cover filter brightness-[0.35]" 
          />
          {/* Subtle Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1410] via-black/25 to-transparent z-1" />
          
          {/* Clear Placeholder Tag */}
          <div className="absolute top-6 right-6 bg-[#211A14]/80 backdrop-blur-md border border-[#B8893E]/30 px-4 py-2 rounded text-[10px] md:text-xs text-[#B8893E] font-medium tracking-wider uppercase z-10 flex items-center gap-2 shadow-xl">
            <FiInfo className="w-3.5 h-3.5" />
            Demo Placeholder: Real Photography Will Replace This
          </div>
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full py-16 md:py-24">
          <div className="max-w-2xl text-left">
            <span className="text-[#B8893E] font-semibold text-xs tracking-[0.25em] uppercase font-worksans block mb-3">
              Welcome to Deoghar's Premier Address
            </span>
            <h1 className="font-fraunces text-4xl md:text-6xl text-white font-medium leading-[1.1] mb-6">
              A Stay Worthy of <br />
              <span className="italic text-[#B8893E] font-normal">Baidyanath Dham</span>
            </h1>
            <p className="text-white/80 font-worksans text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              Experience restrained luxury and spiritual convenience. Nestled in Williams Town, just 5 minutes from the sacred Baba Baidyanath Dham temple, offering direct booking perks with absolute transparency.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={getWhatsAppLink("Hello Hotel Imperial Heights, I would like to book a stay with you.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#B8893E] hover:bg-[#a17734] text-[#1B1410] font-semibold text-sm tracking-wider uppercase px-8 py-4 rounded-sm transition-all duration-300 text-center flex items-center justify-center gap-2.5 shadow-lg group"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Book Now via WhatsApp
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button
                onClick={() => scrollToSection('rooms')}
                className="border border-white/20 hover:border-[#B8893E] hover:text-[#B8893E] text-white font-semibold text-sm tracking-wider uppercase px-8 py-4 rounded-sm transition-all duration-300 text-center bg-transparent"
              >
                View Rooms
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar Overlapping Bottom Edge */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-4 z-20">
          <div className="bg-[#211A14] border border-[#3A2E22] rounded-md shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-stretch justify-around divide-y md:divide-y-0 md:divide-x divide-[#3A2E22]">
            <div className="flex flex-col items-center justify-center py-4 md:py-0 text-center flex-1">
              <span className="font-fraunces text-2xl md:text-3xl font-semibold text-[#B8893E] flex items-center gap-1.5">
                4.4 ★
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#E8DCC4]/55 mt-1 font-medium">Guest Rating</span>
            </div>
            <div className="flex flex-col items-center justify-center py-4 md:py-0 text-center flex-1">
              <span className="font-fraunces text-2xl md:text-3xl font-semibold text-[#B8893E]">
                3,500+
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#E8DCC4]/55 mt-1 font-medium">Verified Reviews</span>
            </div>
            <div className="flex flex-col items-center justify-center py-4 md:py-0 text-center flex-1">
              <span className="font-fraunces text-2xl md:text-3xl font-semibold text-[#B8893E]">
                500+
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#E8DCC4]/55 mt-1 font-medium">Banquet Capacity</span>
            </div>
          </div>
        </div>
      </section>

      {/* Adjust layout below the stats bar overlap */}
      <div className="h-16 md:h-20" />

      {/* 4. ROOMS & SUITES */}
      <section id="rooms" className="py-20 md:py-28 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[#B8893E] font-semibold text-xs tracking-[0.2em] uppercase font-worksans block mb-2">Accommodations</span>
          <h2 className="font-fraunces text-3xl md:text-5xl text-white font-medium">Rooms & Suites</h2>
          <div className="w-16 h-[2px] bg-[#B8893E] mx-auto mt-4" />
          <p className="text-[#E8DCC4]/75 text-sm md:text-base max-w-lg mx-auto mt-4 font-worksans leading-relaxed">
            Thoughtfully curated spaces offering rest and rejuvenation. Click to request availability directly from our front desk.
          </p>
        </div>

        {/* Featured Large Room Card */}
        <div className="mb-12 border border-[#3A2E22] rounded bg-[#211A14] overflow-hidden group shadow-xl hover:border-[#B8893E]/30 transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Image section */}
            <div className="lg:col-span-7 relative h-72 md:h-96 lg:h-auto min-h-[320px]">
              <img 
                src={rooms[0].image} 
                alt={rooms[0].name} 
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {/* Featured Badge */}
              <div className="absolute top-4 left-4 bg-[#B8893E] text-[#1B1410] text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 shadow-md">
                Featured Experience
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 text-[10px] text-white/70 uppercase tracking-widest">
                Demo Placeholder
              </div>
            </div>

            {/* Content section */}
            <div className="lg:col-span-5 p-6 md:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-fraunces text-2xl md:text-3xl text-white font-medium">{rooms[0].name}</h3>
                  <span className="font-fraunces text-xl md:text-2xl text-[#B8893E] font-medium">{rooms[0].price}<span className="text-xs text-white/50 font-worksans">/night</span></span>
                </div>
                <p className="text-[#B8893E] text-xs font-semibold uppercase tracking-widest mb-6 font-worksans">{rooms[0].tagline}</p>
                <p className="text-[#E8DCC4]/75 text-sm md:text-base leading-relaxed mb-6 font-worksans">
                  {rooms[0].description}
                </p>

                {/* Amenity tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {rooms[0].tags.map(tag => (
                    <span key={tag} className="bg-[#1B1410] border border-[#3A2E22] text-[#E8DCC4]/80 text-[10px] md:text-xs px-2.5 py-1 rounded font-worksans font-medium flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#B8893E]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={getWhatsAppLink(rooms[0].ctaMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#B8893E] hover:bg-[#a17734] text-[#1B1410] font-semibold text-xs tracking-wider uppercase py-4 rounded-sm transition-all duration-300 text-center flex items-center justify-center gap-2 group shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Book Executive Suite on WhatsApp
                <FiChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Grid of 3 Standard Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.slice(1).map((room) => (
            <div 
              key={room.id} 
              className="border border-[#3A2E22] rounded bg-[#211A14] overflow-hidden flex flex-col justify-between group shadow-lg hover:border-[#B8893E]/20 transition-all duration-300"
            >
              <div>
                {/* Image container */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs border border-white/10 px-2 py-0.5 text-[8px] text-white/60 uppercase tracking-widest">
                    Demo Placeholder
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-fraunces text-xl text-white font-medium">{room.name}</h3>
                    <span className="font-fraunces text-lg text-[#B8893E] font-semibold">{room.price}<span className="text-[10px] text-white/50 font-worksans">/n</span></span>
                  </div>
                  <p className="text-[#B8893E] text-[10px] font-semibold uppercase tracking-wider mb-4 font-worksans">{room.tagline}</p>
                  <p className="text-[#E8DCC4]/70 text-xs md:text-sm leading-relaxed mb-6 font-worksans">
                    {room.description}
                  </p>

                  {/* Amenity tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {room.tags.map(tag => (
                      <span key={tag} className="bg-[#1B1410] border border-[#3A2E22] text-[#E8DCC4]/70 text-[9px] md:text-[10px] px-2 py-0.5 rounded font-worksans">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="p-6 pt-0">
                <a
                  href={getWhatsAppLink(room.ctaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-[#B8893E]/40 hover:border-[#B8893E] text-[#B8893E] hover:bg-[#B8893E] hover:text-[#1B1410] font-semibold text-xs tracking-wider uppercase py-3.5 rounded-sm transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Book Room
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. GALLERY SECTION */}
      <section id="gallery" className="py-20 md:py-28 bg-[#16100D] border-t border-b border-[#3A2E22]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16 md:mb-20">
            <span className="text-[#B8893E] font-semibold text-xs tracking-[0.2em] uppercase block mb-2">Visual Tour</span>
            <h2 className="font-fraunces text-3xl md:text-5xl text-white font-medium">The Property Gallery</h2>
            <div className="w-16 h-[2px] bg-[#B8893E] mx-auto mt-4" />
            <p className="text-[#E8DCC4]/70 text-xs md:text-sm max-w-md mx-auto mt-4 leading-relaxed">
              Take a walk through our premises. High-quality placeholders showcasing our premier guest and banquet amenities.
            </p>
          </div>

          {/* Asymmetric Mosaic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryItems.map((item, idx) => (
              <div 
                key={idx}
                className={`relative overflow-hidden group rounded-sm border border-[#3A2E22] bg-[#211A14] h-72 md:h-auto min-h-[260px] ${item.gridClass}`}
              >
                {/* Photo */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-[0.8]" 
                />
                
                {/* Dark Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                
                {/* Label Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                  <span className="text-[10px] md:text-xs text-[#B8893E] font-semibold tracking-widest uppercase mb-1 font-worksans">
                    {item.title}
                  </span>
                  <p className="text-white/80 text-xs font-worksans">
                    {item.description}
                  </p>
                </div>

                {/* Translucent Demo Placeholder Tag */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-[9px] text-white/50 tracking-wider font-worksans">
                  Placeholder
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BANQUET/WEDDING SECTION */}
      <section id="banquet" className="py-20 md:py-28 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Copy Column */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <span className="text-[#B8893E] font-semibold text-xs tracking-[0.2em] uppercase block mb-2">Grand Celebrations</span>
            <h2 className="font-fraunces text-3xl md:text-5xl text-white font-medium mb-6 leading-tight">
              A Majestic Banquet Near <br />
              <span className="italic text-[#B8893E] font-normal">Baidyanath Dham</span>
            </h2>
            <p className="text-[#E8DCC4]/80 text-sm md:text-base leading-relaxed mb-6">
              Establish auspicious beginnings under the blessings of Baba Baidyanath. Our premium, wedding-ready banquet hall is located in Williams Town, just 5 minutes from the holy temple, offering guests unparalleled reachability.
            </p>
            <p className="text-[#E8DCC4]/80 text-sm md:text-base leading-relaxed mb-8">
              With a grand capacity to comfortably host up to <strong>500 guests</strong>, the banquet features specialized lighting capabilities, sophisticated acoustics, customizable multi-cuisine catering, and dedicated changing suites for the wedding entourage.
            </p>

            {/* Event Specific Stats/Highlights */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#211A14] border border-[#3A2E22] p-4 rounded-sm">
                <div className="text-[#B8893E] font-fraunces text-xl font-semibold flex items-center gap-2">
                  <FiUsers size={16} />
                  500 Capacity
                </div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest mt-1">Guests Comfortably hosted</div>
              </div>
              <div className="bg-[#211A14] border border-[#3A2E22] p-4 rounded-sm">
                <div className="text-[#B8893E] font-fraunces text-xl font-semibold flex items-center gap-2">
                  <FiMapPin size={16} />
                  5 Min Away
                </div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest mt-1">From Baidyanath Dham Temple</div>
              </div>
            </div>

            <a
              href={getWhatsAppLink("Hello Hotel Imperial Heights, I would like to enquire about booking your banquet hall for an event.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B8893E] hover:bg-[#a17734] text-[#1B1410] font-semibold text-xs tracking-wider uppercase px-8 py-4 rounded-sm transition-all duration-300 inline-flex items-center gap-2.5 shadow-lg"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Enquire for Events
            </a>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative group">
            <div className="border border-[#3A2E22] rounded overflow-hidden shadow-2xl relative">
              <img 
                src="/banquet_hall.jpg" 
                alt="Banquets and Wedding events" 
                className="w-full h-96 lg:h-[450px] object-cover group-hover:scale-102 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1.5 text-[10px] text-white/70 uppercase tracking-widest">
                Demo Banquet Placeholder
              </div>
            </div>
            {/* Ambient gold glow decoration */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#B8893E]/20 to-transparent rounded blur opacity-25 group-hover:opacity-40 transition duration-1000 -z-10" />
          </div>
        </div>
      </section>

      {/* 7. WHY BOOK DIRECT (Oxblood Background Section) */}
      <section id="why-direct" className="py-20 md:py-28 bg-[#2A1418] border-t border-b border-[#6B2630]/35 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16 md:mb-20">
            <span className="text-[#B8893E] font-semibold text-xs tracking-[0.2em] uppercase block mb-2">Direct Benefits</span>
            <h2 className="font-fraunces text-3xl md:text-5xl text-white font-medium">Why Book Direct With Us</h2>
            <div className="w-16 h-[2px] bg-[#B8893E] mx-auto mt-4" />
            <p className="text-white/75 text-xs md:text-sm max-w-sm mx-auto mt-4 leading-relaxed font-worksans">
              Cut out commission-heavy intermediaries. Get direct answers and authentic reservations directly over WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="bg-[#1B1410]/40 border border-[#6B2630]/50 p-8 rounded-sm hover:border-[#B8893E]/40 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-sm bg-[#B8893E]/10 border border-[#B8893E]/25 flex items-center justify-center text-[#B8893E] mb-6">
                  <FiShield size={24} />
                </div>
                <h3 className="font-fraunces text-xl font-medium mb-3 text-white">No Commission Markup</h3>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed font-worksans">
                  Online Travel Agencies (OTAs) like MakeMyTrip or Booking.com add substantial commissions to room prices. Booking directly over WhatsApp bypasses these middlemen entirely, saving you up to 15-20% on booking fees.
                </p>
              </div>
              <div className="mt-8 text-xs text-[#B8893E] font-semibold tracking-wider uppercase flex items-center gap-1.5 font-worksans">
                Direct Pricing Guaranteed <FiArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Column 2 */}
            <div className="bg-[#1B1410]/40 border border-[#6B2630]/50 p-8 rounded-sm hover:border-[#B8893E]/40 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-sm bg-[#B8893E]/10 border border-[#B8893E]/25 flex items-center justify-center text-[#B8893E] mb-6">
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <h3 className="font-fraunces text-xl font-medium mb-3 text-white">Instant Confirmation</h3>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed font-worksans">
                  Forget waiting for automated system emails or navigating confusing customer service queues. You connect straight to our front desk supervisor on WhatsApp. Your room allocation is locked and confirmed instantly.
                </p>
              </div>
              <div className="mt-8 text-xs text-[#B8893E] font-semibold tracking-wider uppercase flex items-center gap-1.5 font-worksans">
                Fast Reservation desk <FiArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Column 3 */}
            <div className="bg-[#1B1410]/40 border border-[#6B2630]/50 p-8 rounded-sm hover:border-[#B8893E]/40 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-sm bg-[#B8893E]/10 border border-[#B8893E]/25 flex items-center justify-center text-[#B8893E] mb-6">
                  <FiCheckCircle size={24} />
                </div>
                <h3 className="font-fraunces text-xl font-medium mb-3 text-white">Best Price Guarantee</h3>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed font-worksans">
                  We promise that our direct WhatsApp bookings offer the lowest available rates. In addition, direct-book guests receive high-priority consideration for early check-ins, complimentary room upgrades, and local guidance.
                </p>
              </div>
              <div className="mt-8 text-xs text-[#B8893E] font-semibold tracking-wider uppercase flex items-center gap-1.5 font-worksans">
                Exclusive Direct Perks <FiArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LOCATION SECTION (Split Screen + Custom Interactive Map) */}
      <section id="location" className="py-20 md:py-28 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[#B8893E] font-semibold text-xs tracking-[0.2em] uppercase block mb-2">Our Position</span>
              <h2 className="font-fraunces text-3xl md:text-5xl text-white font-medium mb-6">Location & Details</h2>
              
              <div className="space-y-6 my-8">
                {/* Address block */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-sm bg-[#211A14] border border-[#3A2E22] flex items-center justify-center text-[#B8893E] shrink-0">
                    <FiMapPin size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#E8DCC4]/50 mb-1 font-semibold">Address</h4>
                    <p className="text-white/95 text-sm font-worksans leading-relaxed">
                      Tower Chowk Road, near Baidyanath Dham Station, Williams Town, Deoghar, Jharkhand 814112
                    </p>
                  </div>
                </div>

                {/* Contact phone block */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-sm bg-[#211A14] border border-[#3A2E22] flex items-center justify-center text-[#B8893E] shrink-0">
                    <FiPhone size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#E8DCC4]/50 mb-1 font-semibold">Direct Telephone / Booking Desk</h4>
                    <p className="text-white/95 text-sm font-worksans">
                      <a href="tel:+919123461616" className="hover:text-[#B8893E] transition-colors font-medium">+91 91234 61616</a>
                    </p>
                    <p className="text-[10px] text-white/50 tracking-wider mt-0.5 uppercase font-medium">Available for Direct calls & WhatsApp chats</p>
                  </div>
                </div>

                {/* Proximity benchmarks */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-sm bg-[#211A14] border border-[#3A2E22] flex items-center justify-center text-[#B8893E] shrink-0">
                    <FiClock size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#E8DCC4]/50 mb-1 font-semibold">Proximity Highlights</h4>
                    <ul className="text-white/90 text-sm font-worksans space-y-1.5 mt-1">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8893E]" />
                        <strong>Baidyanath Dham Temple:</strong> 5 mins drive / walk distance
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8893E]" />
                        <strong>Baidyanath Dham Station:</strong> 3 mins drive (under 1.5 km)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8893E]" />
                        <strong>Deoghar Airport (IXR):</strong> 15 mins drive (approx. 7.5 km)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a
                href={getWhatsAppLink("Hello Hotel Imperial Heights, I need directions to the hotel. Please assist.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#B8893E] hover:bg-[#a17734] text-[#1B1410] font-semibold text-xs tracking-wider uppercase px-6 py-3.5 rounded-sm transition-all duration-300 text-center flex items-center justify-center gap-2 shadow"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Ask Directions via WA
              </a>
              <a
                href="https://maps.google.com/?q=Hotel+Imperial+Heights+Deoghar+Williams+Town"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 hover:border-[#B8893E] hover:text-[#B8893E] text-white font-semibold text-xs tracking-wider uppercase px-6 py-3.5 rounded-sm transition-all duration-300 text-center flex items-center justify-center gap-2 bg-transparent"
              >
                <FiCompass size={15} />
                Open Google Maps
              </a>
            </div>
          </div>

          {/* Interactive Map Side */}
          <div className="lg:col-span-7 relative min-h-[380px] border border-[#3A2E22] rounded bg-[#211A14] overflow-hidden flex flex-col justify-between">
            {/* Simulated Luxury Dark Map Background */}
            <div className="absolute inset-0 bg-[#0E0906] z-0 overflow-hidden select-none">
              
              {/* Map grid lines background */}
              <div 
                className="absolute inset-0 opacity-[0.08]" 
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #B8893E 1px, transparent 1px),
                    linear-gradient(to bottom, #B8893E 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px'
                }} 
              />

              {/* Draw connected roads as gold/grey SVG lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                {mapConnections.map((conn, idx) => {
                  const fromNode = mapLandmarks.find(n => n.id === conn.from);
                  const toNode = mapLandmarks.find(n => n.id === conn.to);
                  if (!fromNode || !toNode) return null;
                  return (
                    <line 
                      key={idx}
                      x1={fromNode.x} 
                      y1={fromNode.y} 
                      x2={toNode.x} 
                      y2={toNode.y} 
                      stroke={conn.color} 
                      strokeWidth="2" 
                      strokeDasharray="4 4"
                    />
                  );
                })}
              </svg>

              {/* Render Map Nodes */}
              {mapLandmarks.map((node) => (
                <div 
                  key={node.id} 
                  style={{ left: node.x, top: node.y }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group cursor-pointer"
                  onMouseEnter={() => setHoveredMapNode(node)}
                  onMouseLeave={() => setHoveredMapNode(null)}
                >
                  {/* Pulsing indicator for Hotel */}
                  {node.type === 'hotel' ? (
                    <div className="relative flex items-center justify-center w-8 h-8">
                      <div className="absolute inset-0 rounded-full bg-[#B8893E]/20 animate-ping" />
                      <div className="w-4 h-4 rounded-full bg-[#B8893E] border border-white flex items-center justify-center shadow-lg">
                        <FiStar className="w-2.5 h-2.5 text-[#1B1410] fill-current" />
                      </div>
                    </div>
                  ) : (
                    <div className={`w-3.5 h-3.5 rounded-full ${node.type === 'station' ? 'bg-[#9C3848]' : 'bg-[#3A2E22]'} border border-[#B8893E]/30 flex items-center justify-center shadow`} />
                  )}

                  {/* Node Label text */}
                  <span className={`text-[9px] font-worksans tracking-wider uppercase mt-1 px-1.5 py-0.5 rounded transition-all whitespace-nowrap ${
                    node.type === 'hotel' 
                      ? 'bg-[#B8893E] text-[#1B1410] font-semibold font-fraunces' 
                      : 'bg-[#211A14]/85 text-white/80'
                  }`}>
                    {node.label}
                  </span>
                </div>
              ))}
              
              {/* Compass Indicator decoration */}
              <div className="absolute top-4 left-4 text-[#3A2E22]/60 select-none">
                <FiCompass size={40} className="animate-spin-slow" />
              </div>
            </div>

            {/* Map Header Overlay */}
            <div className="relative z-10 p-4 bg-gradient-to-b from-[#211A14]/90 to-transparent">
              <span className="text-[10px] text-[#B8893E] uppercase tracking-widest font-semibold font-worksans">Bespoke Proximity Map</span>
              <p className="text-[10px] text-white/50 font-worksans">Hover nodes on the schematic layout to view direct travel times.</p>
            </div>

            {/* Map Interactive Information Overlay */}
            <div className="relative z-10 p-4 m-4 bg-[#211A14]/95 border border-[#3A2E22] backdrop-blur-sm rounded shadow-lg min-h-[70px] flex items-center justify-between">
              {hoveredMapNode ? (
                <div>
                  <h5 className="font-fraunces text-xs text-[#B8893E] font-medium">{hoveredMapNode.label}</h5>
                  <p className="text-[10px] text-white/80 mt-0.5 font-worksans">{hoveredMapNode.desc}</p>
                </div>
              ) : (
                <div>
                  <h5 className="font-fraunces text-xs text-[#B8893E] font-medium">Hotel Imperial Heights</h5>
                  <p className="text-[10px] text-white/70 mt-0.5 font-worksans">Perfect base camp location in Deoghar near Baidyanath Dham temple.</p>
                </div>
              )}
              <div className="bg-[#B8893E]/10 border border-[#B8893E]/20 px-2 py-1 rounded text-[8px] uppercase tracking-wider text-[#B8893E] font-bold">Schematic</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-20 md:py-28 bg-[#16100D] border-t border-b border-[#3A2E22]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16 md:mb-20">
            <span className="text-[#B8893E] font-semibold text-xs tracking-[0.2em] uppercase block mb-2">Guest Feedback</span>
            <h2 className="font-fraunces text-3xl md:text-5xl text-white font-medium">What Our Guests Say</h2>
            <div className="w-16 h-[2px] bg-[#B8893E] mx-auto mt-4" />
            <p className="text-[#E8DCC4]/70 text-xs md:text-sm max-w-sm mx-auto mt-4 leading-relaxed font-worksans">
              Paraphrased real reviews highlighting proximity to Baba Mandir, spacious suites, and customized care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-[#211A14] border border-[#3A2E22] p-8 rounded-sm hover:border-[#B8893E]/10 transition-colors duration-300 flex flex-col justify-between">
              <div>
                {/* Star rating */}
                <div className="flex gap-1 mb-6 text-[#B8893E]">
                  {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-current w-4 h-4" />)}
                </div>
                <blockquote className="text-white/95 text-xs md:text-sm italic font-worksans leading-relaxed mb-6">
                  "Superb location for pilgrims! We walked to the temple in 5 minutes. The room was exceptionally clean, the AC worked beautifully, and the staff helped us arrange puja arrangements. Directly booking over WhatsApp got us a free late check-out."
                </blockquote>
              </div>
              <div>
                <cite className="not-italic text-xs font-semibold text-[#B8893E] block font-worksans">— Aarav Sharma</cite>
                <span className="text-[10px] text-white/40 uppercase tracking-widest block font-worksans mt-0.5">Guest from Patna</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#211A14] border border-[#3A2E22] p-8 rounded-sm hover:border-[#B8893E]/10 transition-colors duration-300 flex flex-col justify-between">
              <div>
                {/* Star rating */}
                <div className="flex gap-1 mb-6 text-[#B8893E]">
                  {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-current w-4 h-4" />)}
                </div>
                <blockquote className="text-white/95 text-xs md:text-sm italic font-worksans leading-relaxed mb-6">
                  "Perfect choice for family travel. We booked the Family Suite directly and the spacing was enormous for 4 adults. The breakfast was fresh and customized to our preferences. Best price comparison vs OTA portals."
                </blockquote>
              </div>
              <div>
                <cite className="not-italic text-xs font-semibold text-[#B8893E] block font-worksans">— Priyanka Dey</cite>
                <span className="text-[10px] text-white/40 uppercase tracking-widest block font-worksans mt-0.5">Guest from Kolkata</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#211A14] border border-[#3A2E22] p-8 rounded-sm hover:border-[#B8893E]/10 transition-colors duration-300 flex flex-col justify-between">
              <div>
                {/* Star rating */}
                <div className="flex gap-1 mb-6 text-[#B8893E]">
                  {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-current w-4 h-4" />)}
                </div>
                <blockquote className="text-white/95 text-xs md:text-sm italic font-worksans leading-relaxed mb-6">
                  "Unbelievably simple booking process over WhatsApp. Got a prompt quote from the supervisor, verified the rate against MakeMyTrip, and saved 15%. Direct, responsive customer care without any robot chatbots."
                </blockquote>
              </div>
              <div>
                <cite className="not-italic text-xs font-semibold text-[#B8893E] block font-worksans">— Vikram Singh</cite>
                <span className="text-[10px] text-white/40 uppercase tracking-widest block font-worksans mt-0.5">Guest from Ranchi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-[#0E0906] border-t border-[#3A2E22] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            {/* Branding col */}
            <div className="md:col-span-2">
              <span className="font-fraunces text-2xl font-semibold text-white tracking-wide block mb-2">
                Hotel Imperial Heights
              </span>
              <p className="text-white/60 text-xs md:text-sm max-w-sm font-worksans leading-relaxed">
                Spiritual comfort, restrained luxury, and authentic Indian hospitality located 5 minutes from the divine Baidyanath Dham shrine in Deoghar.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider text-white/50 font-semibold font-worksans">Direct WhatsApp Desk Active</span>
              </div>
            </div>

            {/* Quick Links col */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#B8893E] font-semibold mb-4 font-worksans">Quick Navigation</h4>
              <ul className="space-y-2.5 text-xs text-[#E8DCC4]/70 font-worksans">
                {['Rooms', 'Gallery', 'Banquet', 'Why Direct', 'Location'].map((item) => {
                  const id = item.toLowerCase().replace(' ', '-');
                  return (
                    <li key={item}>
                      <button onClick={() => scrollToSection(id)} className="hover:text-white transition-colors duration-300">
                        {item}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Contact Details col */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#B8893E] font-semibold mb-4 font-worksans">Contact Details</h4>
              <p className="text-xs text-[#E8DCC4]/70 font-worksans leading-relaxed mb-4">
                Tower Chowk Road, near Baidyanath Dham Station, Williams Town, Deoghar, Jharkhand 814112
              </p>
              <p className="text-xs text-[#E8DCC4]/70 font-worksans mb-1">
                <strong>WhatsApp:</strong> <a href={getWhatsAppLink("General enquiry")} className="hover:text-[#B8893E] transition-colors font-medium">+91 91234 61616</a>
              </p>
              <p className="text-xs text-[#E8DCC4]/70 font-worksans">
                <strong>Tel:</strong> <a href="tel:+919123461616" className="hover:text-[#B8893E] transition-colors font-medium">+91 91234 61616</a>
              </p>
            </div>
          </div>

          <hr className="border-[#3A2E22] mb-8" />

          {/* Bottom Footer block */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] tracking-wider uppercase text-white/40 font-worksans text-center md:text-left">
              &copy; {new Date().getFullYear()} Hotel Imperial Heights Deoghar. All Rights Reserved.
            </p>
            <div className="bg-[#211A14] border border-[#3A2E22] px-3.5 py-1.5 rounded text-[9px] uppercase tracking-wider text-white/50 font-worksans flex items-center gap-1.5 shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8893E]" />
              Direct Booking Sales Pitch Demo Landing Page
            </div>
          </div>
        </div>
      </footer>

      {/* 11. FIXED FLOATING WHATSAPP BUTTON (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={getWhatsAppLink("Hello Hotel Imperial Heights, I would like to book a room directly with you. Please assist.")}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center gap-2 px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 font-worksans font-semibold text-xs tracking-wider uppercase group relative hover:-translate-y-1"
        >
          {/* Subtle Ring Ping Animation */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          
          <WhatsAppIcon className="w-5 h-5 fill-current" />
          <span>Book via WhatsApp</span>
        </a>
      </div>

    </div>
  )
}
