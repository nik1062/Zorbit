import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import PageWrapper from '../components/PageWrapper'
import Button from '../components/Button'

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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Save to localStorage using the key zorbitLeads
    const saved = localStorage.getItem('zorbitLeads')
    let leads = []
    if (saved) {
      try {
        leads = JSON.parse(saved)
      } catch (err) {
        console.error('Error parsing stored zorbitLeads', err)
      }
    }
    
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
    
    localStorage.setItem('zorbitLeads', JSON.stringify([newLead, ...leads]))
    
    // Also update zorbit_contact_messages to keep Admin Stats aligned
    localStorage.setItem('zorbit_contact_messages', JSON.stringify([newLead, ...leads]))

    setSent(true)
    setForm({ name: '', company: '', project: '', email: '', message: '' })
  }

  return (
    <PageWrapper>
      <section className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        {/* Pulsing booking indicator */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue-glow text-sm font-semibold mb-8"
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
          {/* Details column */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="lg:col-span-5 flex flex-col gap-8">
            <p className="text-white/40 text-lg leading-relaxed max-w-md">
              Have a project in mind? We'd love to hear about it. Tell us your goals in our conversational form and Zorbit's engineers will review it.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                  <FiMail size={18} className="text-brand-blue-light" />
                </div>
                <div>
                  <p className="text-white/30 text-xs mb-0.5">Direct Line</p>
                  <p className="text-white text-sm font-medium">nikunjkumar1062@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                  <FiMapPin size={18} className="text-brand-blue-light" />
                </div>
                <div>
                  <p className="text-white/30 text-xs mb-0.5">Location</p>
                  <p className="text-white text-sm font-medium">Chennai, Tamil Nadu, India</p>
                </div>
              </div>
            </div>

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

          {/* Conversational form column */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="lg:col-span-7">
            {sent ? (
              <div className="p-8 rounded-3xl bg-brand-dark-2 border border-brand-blue/20 glow-blue text-center">
                <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-4 border border-brand-blue/20">
                  <FiSend size={28} className="text-brand-blue-light" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">Inquest Logged!</h3>
                <p className="text-white/40 text-sm">We've saved your blueprint in our client database.</p>
                <Button variant="outline" className="mt-6 text-xs cursor-pointer" onClick={() => setSent(false)}>
                  Submit New Brief
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-brand-dark-2/50 border border-slate-800/80 leading-[2.5] text-white/70 text-lg md:text-xl font-medium tracking-wide">
                <span>Hello Zorbit, my name is </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="px-2 py-0 border-b border-white/10 text-white placeholder-white/20 bg-transparent focus:outline-none focus:border-brand-blue text-lg font-semibold w-40 inline-block text-center"
                />
                <span>, and I represent </span>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                  className="px-2 py-0 border-b border-white/10 text-white placeholder-white/20 bg-transparent focus:outline-none focus:border-brand-blue text-lg font-semibold w-40 inline-block text-center"
                />
                <span>. I want to collaborate on a </span>
                <input
                  type="text"
                  name="project"
                  value={form.project}
                  onChange={handleChange}
                  placeholder="Custom POS"
                  required
                  className="px-2 py-0 border-b border-white/10 text-white placeholder-white/20 bg-transparent focus:outline-none focus:border-brand-blue text-lg font-semibold w-44 inline-block text-center"
                />
                <span> project. You can contact me at </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="px-2 py-0 border-b border-white/10 text-white placeholder-white/20 bg-transparent focus:outline-none focus:border-brand-blue text-lg font-semibold w-64 inline-block text-center font-mono"
                />
                <span>. Here are the custom goals of my project brief: </span>
                <div className="mt-4 leading-normal">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Brief details about targets, timeline, and offline availability..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark-3 border border-white/5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-brand-blue/50 transition-colors resize-none"
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <Button type="submit" variant="primary" className="py-3 px-6 text-xs uppercase tracking-wider font-bold">
                    Transmit Packet <FiSend size={12} />
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
