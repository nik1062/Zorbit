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
    
    // Save to localStorage safely so the admin dashboard can still show it
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
    localStorage.setItem('zorbit_contact_messages', JSON.stringify([newLead, ...leads]))

    // Open native mail client pre-filled with the message details to zorbitweb@gmail.com
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
    
    // Triggering the mailto redirection
    window.location.href = `mailto:zorbitweb@gmail.com?subject=${subject}&body=${body}`

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
          {/* Details column */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="lg:col-span-5 flex flex-col gap-8">
            <p className="text-slate-300 font-medium text-lg md:text-xl lg:text-2xl max-w-md leading-relaxed">
              Have a project in mind? We'd love to hear about it. Tell us your goals in our structured blueprint form and Zorbit's engineers will review it.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                  <FiMail size={18} className="text-brand-blue-light" />
                </div>
                <div>
                  <p className="text-slate-300 text-xs md:text-sm font-bold uppercase tracking-wide mb-0.5">Direct Line</p>
                  <p className="text-white text-sm md:text-base font-semibold">zorbitweb@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                  <FiMapPin size={18} className="text-brand-blue-light" />
                </div>
                <div>
                  <p className="text-slate-300 text-xs md:text-sm font-bold uppercase tracking-wide mb-0.5">Location</p>
                  <p className="text-white text-sm md:text-base font-semibold">Chennai, Tamil Nadu, India</p>
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
                    <label className="block text-slate-300 text-xs md:text-sm font-bold uppercase tracking-wide mb-2">Company / Brand</label>
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
                  <label className="block text-slate-300 text-xs md:text-sm font-bold uppercase tracking-wide mb-2">Project Brief & Details</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about the project goals, requirements, and timeline..."
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark-3 border border-slate-800 text-white placeholder-white/20 text-sm focus:outline-none focus:border-brand-blue/50 transition-colors resize-none"
                  />
                </div>

                <div className="flex justify-end">
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
