import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiMail, FiMapPin, FiCopy, FiCheck, FiCpu } from 'react-icons/fi'
import Logo from './Logo'

const socials = [
  { icon: FiGithub, href: 'https://github.com/nik1062' },
  { icon: FiTwitter, href: '#' },
  { icon: FiLinkedin, href: '#' },
  { icon: FiInstagram, href: '#' },
]

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('zorbitweb@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer className="bg-brand-dark-2 border-t border-white/5 py-16 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/4 w-[350px] h-[150px] rounded-full bg-brand-blue/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-10 items-start">
        {/* Info & Motto Column */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <span className="font-display font-bold text-2xl tracking-tight text-white flex items-center gap-2">
            <Logo variant="orbit-z" className="w-6 h-6 shrink-0" />
            zorbit-<span className="text-brand-blue">studio</span>
          </span>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Engineering high-velocity, zero-latency digital systems. Rebuilding standard agency templates with rapid production execution.
          </p>
          <div className="flex gap-3 mt-2">
            {socials.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-brand-dark-3 text-white/40 hover:text-brand-blue-light hover:bg-brand-dark-4 border border-white/5 hover:border-brand-blue/20 transition-all duration-300"
                aria-label="Social Link"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Operations & Headquarters Column */}
        <div className="md:col-span-4 flex flex-col gap-5">
          <h4 className="font-display font-bold text-white text-xs tracking-wider uppercase font-mono border-b border-white/5 pb-2">
            Operations Base
          </h4>
          
          <div className="flex items-start gap-3 text-slate-355 text-xs md:text-sm font-semibold">
            <FiMapPin className="text-brand-blue-light mt-0.5 shrink-0" size={14} />
            <div>
              <span className="text-white/50 text-[10px] block uppercase font-mono">Headquarters</span>
              <span className="text-slate-200 mt-1 block">Bhagalpur, Bihar, India</span>
              <span className="text-slate-450 text-[11px] block mt-1.5 font-medium">Operating Remotely Worldwide</span>
            </div>
          </div>

          <div className="relative flex items-center gap-3 text-slate-200 text-xs md:text-sm font-semibold cursor-pointer group mt-2" onClick={copyEmail}>
            <FiMail className="text-brand-blue-light shrink-0" size={14} />
            <div className="flex items-center gap-2">
              <span className="hover:text-brand-blue-glow transition-colors font-mono">zorbitweb@gmail.com</span>
              <button 
                className="text-white/40 group-hover:text-white focus:outline-none transition-colors cursor-pointer"
                aria-label="Copy Email"
              >
                {copied ? <FiCheck className="text-emerald-500" size={13} /> : <FiCopy size={13} />}
              </button>
            </div>

            {/* Tooltip */}
            <span className={`absolute bottom-full left-0 mb-2 px-2.5 py-1 text-[10px] text-white bg-brand-blue rounded shadow-lg transition-all duration-200 pointer-events-none ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
              Email Copied!
            </span>
          </div>
        </div>

        {/* Navigation & Rights */}
        <div className="md:col-span-3 flex flex-col gap-6 md:items-end justify-between h-full">
          <div className="flex flex-col gap-3 text-left md:text-right">
            <h4 className="font-display font-bold text-white text-xs tracking-wider uppercase font-mono border-b border-white/5 pb-2">
              Navigation
            </h4>
            <div className="flex flex-col gap-2.5 text-slate-400 text-xs md:text-sm font-semibold">
              <NavLink to="/" className="hover:text-white transition-colors">Home Base</NavLink>
              <NavLink to="/about" className="hover:text-white transition-colors">Founder Bio</NavLink>
              <NavLink to="/services" className="hover:text-white transition-colors">Sprint Services</NavLink>
              <NavLink to="/work" className="hover:text-white transition-colors">Case Studies</NavLink>
              <NavLink to="/contact" className="hover:text-white transition-colors">Initiate Sprint</NavLink>
            </div>
          </div>
          <p className="text-slate-450 text-[10px] font-mono mt-8 md:text-right">
            &copy; {new Date().getFullYear()} Zorbit Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}