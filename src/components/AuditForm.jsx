import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiCheckCircle, FiGlobe, FiUser, FiMail, FiLoader } from 'react-icons/fi'
import { api } from '../services/api'
import Button from './Button'

export default function AuditForm() {
  const [form, setForm] = useState({ url: '', name: '', contact: '', goal: 'convert' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const goalLabels = {
      convert: 'Increase client conversions / bookings',
      speed: 'Make the page load faster (Sub-1s)',
      seo: 'Improve local search visibility / ranking',
      rebuild: 'Complete modern redesign from scratch'
    }

    const newLead = {
      id: Date.now(),
      name: form.name,
      company: 'Free Performance Audit Request',
      project: `Web Audit: ${form.url.replace(/https?:\/\//, '')}`,
      email: form.contact,
      message: `FREE 15-MINUTE PERFORMANCE & CONVERSION AUDIT REQUEST\n` +
        `- Target URL: ${form.url}\n` +
        `- Client Goal: ${goalLabels[form.goal] || form.goal}\n\n` +
        `Please analyze page loading speed, lighthouse score, local SEO markers, and direct conversion channels (like WhatsApp CTA placements).`,
      timestamp: new Date().toISOString(),
      archived: false,
    }

    const result = await api.createLead(newLead)

    // Fallback if local sync fails (open pre-filled email client)
    if (!result.serverSynced) {
      const subject = encodeURIComponent(`Free Web Audit Request: ${form.url}`)
      const body = encodeURIComponent(
        `Hello Zorbit Team,\n\n` +
        `I would like to request a free 15-minute web performance audit for my website:\n\n` +
        `Website URL: ${form.url}\n` +
        `My Name: ${form.name}\n` +
        `Contact: ${form.contact}\n` +
        `Primary Goal: ${goalLabels[form.goal]}\n\n` +
        `Please send the speed and conversion checklist to my contact email above.\n\n` +
        `Best regards,\n` +
        `${form.name}`
      )
      window.location.href = `mailto:zorbitweb@gmail.com?subject=${subject}&body=${body}`
    }

    setSent(true)
    setForm({ url: '', name: '', contact: '', goal: 'convert' })
    setLoading(false)
  }

  return (
    <div className="w-full rounded-3xl bg-brand-dark-2/40 border border-slate-800/80 p-6 md:p-8 backdrop-blur-sm shadow-[0_0_30px_rgba(37,99,235,0.02)] relative overflow-hidden text-left mt-8">
      {/* Top ambient highlight */}
      <div className="absolute top-0 right-1/3 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]" />

      {sent ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-10 text-center flex flex-col items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
            <FiCheckCircle size={28} className="text-emerald-400" />
          </div>
          <h3 className="font-display text-2xl font-bold text-white mb-2">Audit Registered!</h3>
          <p className="text-slate-300 text-sm max-w-md leading-relaxed">
            Nikunj will personally run a performance diagnostics suite on your URL. Expect your custom speed & conversion optimization checklist in your inbox within 24 hours.
          </p>
          <Button 
            variant="outline" 
            className="mt-6 text-xs" 
            onClick={() => setSent(false)}
          >
            Audit Another Website
          </Button>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Informational Column */}
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-[10px] font-mono uppercase tracking-widest font-semibold">
              <FiGlobe className="animate-pulse" /> Free Conversion Audit
            </span>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-white leading-tight">
              Is Your Website <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-brand-blue-glow">Losing Customers?</span>
            </h3>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
              Slow websites and complicated contact forms kill sales. Enter your URL to request a **Free 15-Minute Web Speed & Conversion Audit** showing exactly how to optimize your funnel.
            </p>
            <ul className="text-[11px] md:text-xs text-slate-350 space-y-2 mt-4 font-mono">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Lighthouse speed score audit
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Mobile responsiveness check
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Conversion rate optimization (CRO) review
              </li>
            </ul>
          </div>

          {/* Form Column */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 bg-[#080B13]/60 border border-slate-800/80 p-5 md:p-6 rounded-2xl flex flex-col gap-4 relative z-10 w-full">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(34,211,238,0.015)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none rounded-2xl" />
            
            {/* Website URL */}
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-white/50 mb-1.5">
                Current Website URL
              </label>
              <div className="relative">
                <FiGlobe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                <input
                  type="url"
                  name="url"
                  value={form.url}
                  onChange={handleChange}
                  placeholder="https://yourbusiness.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-dark border border-slate-800 text-white placeholder-white/20 text-xs focus:outline-none focus:border-cyan-400/50 transition-colors"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-white/50 mb-1.5">
                  Your Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nikunj Kumar"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-dark border border-slate-800 text-white placeholder-white/20 text-xs focus:outline-none focus:border-cyan-400/50 transition-colors"
                  />
                </div>
              </div>

              {/* Email / WhatsApp */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-white/50 mb-1.5">
                  Email / Contact Info
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                  <input
                    type="text"
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    placeholder="name@company.com or phone"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-dark border border-slate-800 text-white placeholder-white/20 text-xs focus:outline-none focus:border-cyan-400/50 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Main Goal Selection */}
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-white/50 mb-1.5">
                Primary Goal / Improvement Focus
              </label>
              <select
                name="goal"
                value={form.goal}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400/50 transition-colors cursor-pointer"
              >
                <option value="convert">Boost Customer Conversions / WhatsApp Lead Inflows</option>
                <option value="speed">Optimize Page Loading Performance (Target Sub-1s)</option>
                <option value="seo">Enhance Local Google Search Ranking & SEO Visibility</option>
                <option value="rebuild">A Complete High-Velocity Redesign of the Platform</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 font-mono font-semibold text-xs tracking-wider uppercase rounded-xl bg-cyan-400 hover:bg-cyan-500 text-brand-dark-3 py-3 px-5 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin" /> Processing Request...
                  </>
                ) : (
                  <>
                    Get Free Performance Report <FiSend size={12} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
