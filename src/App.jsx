import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import FastLaptopMockup from './demo/FastLaptopDemo';

// Lazy loaded page modules for code-splitting
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Work = lazy(() => import('./pages/Work'))
const Contact = lazy(() => import('./pages/Contact'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))

// Stylized Zorbit loading terminal indicator
function LoadingSpinner() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-[#05070B] font-mono text-xs">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-slate-800" />
        <div className="absolute inset-0 rounded-full border-t-2 border-brand-blue animate-spin shadow-[0_0_8px_#2563EB]" />
      </div>
      <span className="text-white/40 tracking-widest uppercase animate-pulse">Loading modules...</span>
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col relative selection:bg-brand-blue selection:text-white">
      {/* Custom magnetic cursor */}
      <CustomCursor />
      
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<LoadingSpinner />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/work" element={<Work />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/messages" element={<AdminDashboard />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}