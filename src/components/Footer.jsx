import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiMail, FiMapPin, FiCopy, FiCheck } from 'react-icons/fi'

const socials = [
  { icon: FiGithub, href: '#' },
  { icon: FiTwitter, href: '#' },
  { icon: FiLinkedin, href: '#' },
  { icon: FiInstagram, href: '#' },
]

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('nikunjkumar1062@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer className="bg-brand-dark-2 border-t border-white/5 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 items-start">
        {/* Info & Motto */}
        <div className="flex flex-col gap-3">
          <span className="font-display font-bold text-2xl tracking-tight">
            Zor<span className="text-brand-blue">bit</span>
          </span>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-sm">
            Zorbit bridges the gap between high-velocity sprints and exceptional engineering standards.
          </p>
          <div className="flex gap-4 mt-2">
            {socials.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-brand-dark-3 text-white/50 hover:text-brand-blue-light hover:bg-brand-dark-4 transition-all duration-200"
                aria-label="Social link"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Contact Info & Copy Wrapper */}
        <div className="flex flex-col gap-4">
          <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase">Contact Details</h4>
          
          <div className="flex items-center gap-3 text-slate-300 text-sm md:text-base font-semibold">
            <FiMapPin className="text-brand-blue-light" size={16} />
            <span>Chennai, Tamil Nadu, India</span>
          </div>

          <div className="relative flex items-center gap-3 text-slate-300 text-sm md:text-base font-semibold cursor-pointer" onClick={copyEmail}>
            <FiMail className="text-brand-blue-light" size={16} />
            <span className="hover:text-white transition-colors">nikunjkumar1062@gmail.com</span>
            <button 
              className="ml-1 text-white/40 hover:text-white focus:outline-none transition-colors cursor-pointer"
              aria-label="Copy Email"
            >
              {copied ? <FiCheck className="text-emerald-500" size={14} /> : <FiCopy size={14} />}
            </button>

            {/* Tooltip */}
            <span className={`absolute bottom-full left-1/3 mb-2 px-2.5 py-1 text-[10px] text-white bg-brand-blue rounded shadow-lg transition-all duration-200 pointer-events-none ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
              Email Copied!
            </span>
          </div>
        </div>

        {/* Navigation & Rights */}
        <div className="flex flex-col gap-4 md:items-end justify-between h-full">
          <div className="flex flex-wrap gap-6 text-slate-300 text-sm md:text-base font-semibold">
            <NavLink to="/" className="hover:text-white transition-colors">Home</NavLink>
            <NavLink to="/services" className="hover:text-white transition-colors">Services</NavLink>
            <NavLink to="/work" className="hover:text-white transition-colors">Work</NavLink>
            <NavLink to="/contact" className="hover:text-white transition-colors">Contact</NavLink>
          </div>
          <p className="text-slate-300 text-xs md:text-sm font-medium mt-auto md:text-right">
            &copy; {new Date().getFullYear()} Zorbit Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}