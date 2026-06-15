import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-dark/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="font-display font-bold text-2xl tracking-tight text-white">
          zorbit-<span className="text-brand-blue">studio</span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm md:text-base font-semibold transition-colors duration-200 ${
                  isActive ? 'text-brand-blue-light' : 'text-slate-300 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="ml-2 px-5 py-2.5 bg-brand-blue hover:bg-brand-blue-light text-white text-sm md:text-base font-bold rounded-lg transition-colors duration-200"
          >
            Let's Talk
          </NavLink>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white/80 hover:text-white focus:outline-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-dark-2 border-b border-white/5"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm md:text-base font-semibold transition-colors ${
                      isActive ? 'text-brand-blue-light' : 'text-slate-300 hover:text-white'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <NavLink
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 text-center px-5 py-3 bg-brand-blue hover:bg-brand-blue-light text-white text-sm md:text-base font-bold rounded-lg transition-colors duration-200"
              >
                Let's Talk
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}