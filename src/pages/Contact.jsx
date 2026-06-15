import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiTwitter, FiClock, FiActivity, FiSliders, FiCheckCircle } from 'react-icons/fi'
import PageWrapper from '../components/PageWrapper'
import Button from '../components/Button'
import { api } from '../services/api'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', project: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [blueprintApplied, setBlueprintApplied] = useState(false)

  // Estimator States
  const [selectedServices, setSelectedServices] = useState({
    web: true,
    mobile: false,
    platform: false,
    server: false,
  })
  const [speed, setSpeed] = useState('standard') // 'standard', 'express', 'rush'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const toggleService = (key) => {
    setSelectedServices((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      // Ensure at least one service is selected
      const activeCount = Object.values(next).filter(Boolean).length
      return activeCount > 0 ? next : prev
    })
  }

  const applyPreset = (presetKey) => {
    if (presetKey === 'frontend') {
      setSelectedServices({ web: true, mobile: false, platform: false, server: false })
    } else if (presetKey === 'mobile_mvp') {
      setSelectedServices({ web: false, mobile: true, platform: false, server: false })
    } else if (presetKey === 'fullstack') {
      setSelectedServices({ web: true, mobile: false, platform: true, server: true })
    }
  }

  // Exact Zorbit Backend Calculation Logic
  const calculateBlueprint = () => {
    let lowSum = 0
    let highSum = 0
    let activeCapabilitiesCount = 0

    if (selectedServices.web) {
      lowSum += 14000
      highSum += 18000
      activeCapabilitiesCount++
    }
    if (selectedServices.mobile) {
      lowSum += 26000
      highSum += 35000
      activeCapabilitiesCount++
    }
    if (selectedServices.platform) {
      lowSum += 22000
      highSum += 30000
      activeCapabilitiesCount++
    }
    if (selectedServices.server) {
      lowSum += 18000
      highSum += 26000
      activeCapabilitiesCount++
    }

    // Apply 15% Multi-Capability Bundle Discount if more than 1 capability is chosen
    const discountMultiplier = activeCapabilitiesCount > 1 ? 0.85 : 1.0
    let lowBase = lowSum * discountMultiplier
    let highBase = highSum * discountMultiplier

    // Speed Multipliers
    let speedMultiplier = 1.0
    let duration = '14 Days'
    let speedLabel = 'Standard'
    let hoursLabel = '80h'

    if (speed === 'express') {
      speedMultiplier = 1.5
      duration = '7 Days'
      speedLabel = 'Express'
      hoursLabel = '80h (High-Density)'
    } else if (speed === 'rush') {
      speedMultiplier = 2.25
      duration = '48 Hours'
      speedLabel = 'Rush'
      hoursLabel = 'Continuous Delivery'
    }

    const finalLow = Math.round(lowBase * speedMultiplier)
    const finalHigh = Math.round(highBase * speedMultiplier)

    return {
      low: finalLow,
      high: finalHigh,
      duration,
      speedLabel,
      hoursLabel
    }
  }

  const { low, high, duration, speedLabel, hoursLabel } = calculateBlueprint()

  const handleApplyBlueprint = () => {
    const activeServices = []
    if (selectedServices.web) activeServices.push('Website Building')
    if (selectedServices.mobile) activeServices.push('Mobile App')
    if (selectedServices.platform) activeServices.push('Platform Mgmt')
    if (selectedServices.server) activeServices.push('Server & POS')

    const projectString = `${activeServices.join(', ')} (${speedLabel} Delivery)`
    
    // Tailored brief paragraph outlining tech-stack justifications for the estimates
    let briefDescription = 'This sprint incorporates '
    if (selectedServices.web) {
      briefDescription += 'a high-performance frontend stack using React/Next.js and Tailwind CSS to ensure optimized web load times. '
    }
    if (selectedServices.mobile) {
      briefDescription += 'a cross-platform mobile architecture built with Flutter or React Native to achieve near-native performance on iOS and Android. '
    }
    if (selectedServices.platform) {
      briefDescription += 'a robust database and platform dashboard utilizing FastAPI or Node.js to govern custom API rules and role-based client controls. '
    }
    if (selectedServices.server) {
      briefDescription += 'a secure server pipeline set up on AWS or Virtual Private Servers with automated CI/CD workflows and secure gateway integrations. '
    }

    const messageTemplate = `📊 SYSTEM ESTIMATE SUMMARY\n` +
      `- Sprint Duration: ${duration}\n` +
      `- Delivery Speed Tier: ${speedLabel}\n` +
      `- Dev Sprint Scope: ${hoursLabel}\n` +
      `- Est. Price Range: ₹${low.toLocaleString('en-IN')} - ₹${high.toLocaleString('en-IN')} (INR)\n\n` +
      `🚀 BLUEPRINT BRIEF\n` +
      `${briefDescription}\n\n` +
      `Here are my custom requirements:\n[Please edit this to tell us more about your project goals...]`

    setForm((prev) => {
      let finalMessage = messageTemplate
      const currentMsg = prev.message.trim()
      
      if (currentMsg && !currentMsg.includes('SYSTEM ESTIMATE SUMMARY')) {
        // If there's user input, insert it inside the custom requirements placeholder
        finalMessage = messageTemplate.replace(
          '[Please edit this to tell us more about your project goals...]',
          currentMsg
        )
      } else if (currentMsg.includes('SYSTEM ESTIMATE SUMMARY')) {
        // If estimate already exists, keep user text below 'Here are my custom requirements:'
        const splitText = 'Here are my custom requirements:\n'
        const splitIndex = currentMsg.indexOf(splitText)
        if (splitIndex !== -1) {
          const userRequirements = currentMsg.substring(splitIndex + splitText.length)
          finalMessage = messageTemplate.replace(
            '[Please edit this to tell us more about your project goals...]',
            userRequirements.trim() || '[Please edit this to tell us more about your project goals...]'
          )
        }
      }
      return {
        ...prev,
        project: projectString,
        message: finalMessage
      }
    })

    setBlueprintApplied(true)
    setTimeout(() => setBlueprintApplied(false), 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const newLead = {
      id: Date.now(),
      name: form.name,
      company: form.company || 'Personal Brand',
      project: form.project,
      email: form.email,
      message: form.message,
      timestamp: new Date().toISOString(),
      archived: false,
    }
    
    // Delegate persistence and server endpoint checks to central API service
    const result = await api.createLead(newLead)

    // Open native mail client pre-filled with the message details to zorbitweb@gmail.com if sync failed
    const subject = encodeURIComponent(`Zorbit Inquest: ${form.project} from ${form.name}`)
    const body = encodeURIComponent(
      `Hello Zorbit Team,\n\n` +
      `Here is a new project brief submitted from the website:\n\n` +
      `Name: ${form.name}\n` +
      `Company: ${form.company || 'Personal Brand'}\n` +
      `Project Type: ${form.project}\n` +
      `Client Email: ${form.email}\n\n` +
      `Project Brief:\n` +
      `${form.message}\n\n` +
      `Best regards,\n` +
      `${form.name}`
    )
    
    if (!result.serverSynced) {
      console.warn('Primary API endpoint unavailable, initiating mailto redirection fallback.')
      window.location.href = `mailto:zorbitweb@gmail.com?subject=${subject}&body=${body}`
    }

    setSent(true)
    setForm({ name: '', company: '', project: '', email: '', message: '' })
    setLoading(false)
  }

  return (
    <PageWrapper>
      <section className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        {/* Pulsing booking indicator */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue-glow text-xs md:text-sm font-semibold mb-8"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-pulse shadow-[0_0_10px_#2563EB]" />
          Now Booking Late Q2 2026
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-display text-4xl md:text-6xl font-bold mb-6 max-w-2xl"
        >
          Let's build something <span className="text-brand-blue">together.</span>
        </motion.h1>

        <div className="grid lg:grid-cols-12 gap-16 mt-14 items-start">
          {/* Details & Estimator column */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="lg:col-span-5 flex flex-col gap-6">
            <p className="text-slate-300 font-medium text-lg leading-relaxed">
              Configure your project blueprint below and instantly apply it to your brief.
            </p>

            {/* Sprint Configurator Widget */}
            <div className="p-6 rounded-3xl bg-brand-dark-2/60 border border-slate-800/80 backdrop-blur-sm flex flex-col gap-5">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 flex items-center gap-1.5">
                  <FiSliders className="text-brand-blue-light" size={14} /> 1. Configure Sprint
                </h3>
                <span className="text-[9px] text-brand-blue-glow font-mono uppercase bg-brand-blue/10 px-2 py-0.5 rounded border border-brand-blue/20">
                  Estimator
                </span>
              </div>

              {/* Project Type Presets */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold font-mono">Project Presets</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'frontend', label: 'Frontend Only', desc: 'UI & Web' },
                    { key: 'mobile_mvp', label: 'Mobile MVP', desc: 'Flutter App' },
                    { key: 'fullstack', label: 'Full-Stack', desc: 'SaaS Platform' },
                  ].map((preset) => {
                    const isPresetMatch =
                      preset.key === 'frontend'
                        ? selectedServices.web && !selectedServices.mobile && !selectedServices.platform && !selectedServices.server
                        : preset.key === 'mobile_mvp'
                        ? !selectedServices.web && selectedServices.mobile && !selectedServices.platform && !selectedServices.server
                        : preset.key === 'fullstack'
                        ? selectedServices.web && !selectedServices.mobile && selectedServices.platform && selectedServices.server
                        : false

                    return (
                      <button
                        type="button"
                        key={preset.key}
                        onClick={() => applyPreset(preset.key)}
                        className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                          isPresetMatch
                            ? 'bg-brand-blue/25 border-brand-blue/50 text-brand-blue-glow shadow-[0_0_12px_rgba(59,130,246,0.15)]'
                            : 'bg-brand-dark-3/60 border-slate-800/80 text-white/45 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        <span className="text-[10px] md:text-xs font-bold leading-tight text-center">{preset.label}</span>
                        <span className="text-[8px] font-mono opacity-60 mt-0.5 text-center leading-none">{preset.desc}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Service Selectors */}
              <div className="flex flex-col gap-2.5 mt-2">
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold font-mono">Capabilities Needed</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'web', label: 'Website Building' },
                    { key: 'mobile', label: 'Mobile App' },
                    { key: 'platform', label: 'Platform Mgmt' },
                    { key: 'server', label: 'Server & POS' },
                  ].map((service) => {
                    const active = selectedServices[service.key]
                    return (
                      <button
                        type="button"
                        key={service.key}
                        onClick={() => toggleService(service.key)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          active
                            ? 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue-glow shadow-[0_0_10px_rgba(59,130,246,0.1)]'
                            : 'bg-brand-dark-3/60 border-slate-800/80 text-white/45 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {service.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Speed / Timeline Selector */}
              <div className="flex flex-col gap-2.5 mt-2">
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold font-mono">Delivery Speed</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'standard', label: 'Standard', desc: '14 Days' },
                    { key: 'express', label: 'Express', desc: '7 Days' },
                    { key: 'rush', label: 'Rush', desc: '48 Hours' },
                  ].map((s) => {
                    const active = speed === s.key
                    return (
                      <button
                        type="button"
                        key={s.key}
                        onClick={() => setSpeed(s.key)}
                        className={`p-2 border flex flex-col items-center justify-center transition-all cursor-pointer rounded-xl ${
                          active
                            ? 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue-glow shadow-[0_0_10px_rgba(59,130,246,0.1)]'
                            : 'bg-brand-dark-3/60 border-slate-800/80 text-white/45 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs font-bold">{s.label}</span>
                        <span className="text-[9px] font-mono opacity-60 mt-0.5">{s.desc}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Live HUD Estimates */}
              <div className="mt-3 p-4 rounded-2xl bg-brand-dark-3/80 border border-slate-800/80 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] text-white/40 uppercase font-semibold tracking-wider font-mono">Sprint Duration</span>
                  <p className="font-display text-sm md:text-base font-bold text-brand-blue-light flex items-center gap-1.5 mt-0.5">
                    <FiClock size={13} /> {duration}
                  </p>
                </div>
                <div>
                  <span className="text-[9px] text-white/40 uppercase font-semibold tracking-wider font-mono">Est. Price Range</span>
                  <p className="font-display text-sm md:text-base font-bold text-emerald-400 mt-0.5">
                    ₹{low.toLocaleString('en-IN')} - ₹{high.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="col-span-2 border-t border-slate-800/50 pt-2 flex items-center justify-between">
                  <span className="text-[9px] text-white/40 uppercase font-semibold tracking-wider font-mono font-semibold">Dev Sprint Scope</span>
                  <span className="text-xs font-mono font-bold text-white/80">{hoursLabel}</span>
                </div>
              </div>

              {/* Apply Button */}
              <button
                type="button"
                onClick={handleApplyBlueprint}
                className={`py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  blueprintApplied
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                    : 'bg-brand-blue hover:bg-brand-blue-light text-white shadow-[0_0_15px_rgba(59,130,246,0.25)]'
                }`}
              >
                {blueprintApplied ? (
                  <>
                    <FiCheckCircle size={13} /> Blueprint Applied!
                  </>
                ) : (
                  <>
                    <FiActivity size={13} /> Apply Blueprint to Brief
                  </>
                )}
              </button>
            </div>

            {/* Direct Line Details */}
            <div className="flex flex-col gap-4 mt-2 p-5 rounded-2xl bg-brand-dark-3/20 border border-slate-800/40">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                  <FiMail size={18} className="text-brand-blue-light" />
                </div>
                <div>
                  <p className="text-slate-300 text-xs font-bold uppercase tracking-wide mb-0.5">Direct Line</p>
                  <p className="text-white text-sm font-semibold">zorbitweb@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                  <FiMapPin size={18} className="text-brand-blue-light" />
                </div>
                <div>
                  <p className="text-slate-300 text-xs font-bold uppercase tracking-wide mb-0.5">Location</p>
                  <p className="text-white text-sm font-semibold">Chennai, Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {[FiGithub, FiLinkedin, FiTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-brand-dark-3 border border-white/5 flex items-center justify-center text-white/40 hover:text-brand-blue-light hover:border-brand-blue/30 transition-all"
                  aria-label="Social Link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Structured card form column */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="lg:col-span-7">
            {sent ? (
              <div className="p-8 rounded-3xl bg-brand-dark-2 border border-brand-blue/20 glow-blue text-center">
                <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-4 border border-brand-blue/20">
                  <FiSend size={28} className="text-brand-blue-light" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">Inquest Logged!</h3>
                <p className="text-slate-300 text-sm md:text-base">We've saved your blueprint in our client database.</p>
                <Button variant="outline" className="mt-6 text-xs cursor-pointer" onClick={() => setSent(false)}>
                  Submit New Brief
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-brand-dark-2/50 border border-slate-800/80 flex flex-col gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 text-xs md:text-sm font-bold uppercase tracking-wide mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark-3 border border-slate-800 text-white placeholder-white/20 text-sm focus:outline-none focus:border-brand-blue/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-350 text-xs md:text-sm font-bold uppercase tracking-wide mb-2">Company / Brand</label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="e.g. Acme Corp"
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark-3 border border-slate-800 text-white placeholder-white/20 text-sm focus:outline-none focus:border-brand-blue/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 text-xs md:text-sm font-bold uppercase tracking-wide mb-2">Project Type</label>
                    <input
                      type="text"
                      name="project"
                      value={form.project}
                      onChange={handleChange}
                      placeholder="e.g. Web App, Custom POS"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark-3 border border-slate-800 text-white placeholder-white/20 text-sm focus:outline-none focus:border-brand-blue/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-xs md:text-sm font-bold uppercase tracking-wide mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark-3 border border-slate-800 text-white placeholder-white/20 text-sm focus:outline-none focus:border-brand-blue/50 transition-colors font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-350 text-xs md:text-sm font-bold uppercase tracking-wide mb-2">Project Brief & Details</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about the project goals, requirements, and timeline..."
                    rows={12}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark-3 border border-slate-800 text-white placeholder-white/20 text-sm focus:outline-none focus:border-brand-blue/50 transition-colors resize-none font-mono text-xs"
                  />
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={loading}
                    className={`py-3 px-6 text-xs uppercase tracking-wider font-bold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading ? (
                      <>
                        Transmitting... <span className="inline-block w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin ml-1" />
                      </>
                    ) : (
                      <>
                        Transmit Packet <FiSend size={12} />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
