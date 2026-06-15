import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCode, FiLayout, FiActivity, FiSearch, FiChevronDown, FiCompass, FiSettings, FiBriefcase } from 'react-icons/fi'
import PageWrapper from '../components/PageWrapper'
import { servicesData } from '../data/servicesData'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
}

const sopSteps = [
  {
    id: 'discovery',
    title: '01. Discovery & Blueprinting',
    desc: 'We deep dive into your business operations. This involves mapping user journeys, auditing bottlenecks in offline POS operations, and structuring data models.',
    details: ['Technical requirements definition', 'Architecture blueprinting', 'Database design & mapping'],
  },
  {
    id: 'design',
    title: '02. Figma & Token Design',
    desc: 'Pixel-perfect wireframes are built into reusable Figma design systems. We establish color systems, custom component grids, and typography structures.',
    details: ['Interactive prototype generation', 'Design system token setups', 'Multi-device responsive layouts'],
  },
  {
    id: 'build',
    title: '03. High-Velocity Build Sprints',
    desc: 'Our engineering team develops the product in rapid sprints. We deploy clean, modular React components, custom API layers, and optimized queries.',
    details: ['Modular component building', 'FastAPI/Node.js logic pairing', 'State-management persistence layers'],
  },
  {
    id: 'deploy',
    title: '04. Deployment & SLA Monitoring',
    desc: 'We deploy the code, configure fallbacks, and run lighthouse builds. We monitor performance and ensure response times stay below the 4-hour SLA.',
    details: ['CI/CD pipeline configuration', 'Offline caching Fallbacks', 'Performance audits & telemetry'],
  },
]

export default function Services() {
  const [activeSop, setActiveSop] = useState('discovery')

  return (
    <PageWrapper>
      <section className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Core Capabilities Timeline */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="text-brand-blue-light text-sm font-semibold uppercase tracking-widest">Our Capabilities</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
                Services built for <span className="text-brand-blue">scale.</span>
              </h1>
              <p className="text-white/40 text-sm max-w-md">
                We handle the full spectrum of high-end frontend, design, and enterprise tool execution.
              </p>
            </div>

            {/* Vertical Scroll Timeline */}
            <div className="relative border-l-2 border-slate-800 ml-4 pl-8 py-4 flex flex-col gap-12 mt-6">
              {servicesData.map((service, idx) => {
                const icons = [FiCode, FiLayout, FiActivity]
                const Icon = icons[idx] || FiCode
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative flex flex-col gap-2 group"
                  >
                    {/* Glowing blue timeline node */}
                    <div className="absolute -left-[41px] top-1.5 w-4.5 h-4.5 rounded-full bg-brand-dark border-2 border-slate-800 group-hover:border-brand-blue transition-colors flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-brand-blue-glow group-hover:shadow-[0_0_8px_#3B82F6] transition-all" />
                    </div>

                    <div className="flex items-center gap-3 text-brand-blue-glow font-bold tracking-wide text-sm">
                      <Icon size={16} />
                      <h3>{service.title}</h3>
                    </div>
                    <p className="text-white/50 text-xs leading-relaxed max-w-md">
                      {service.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-brand-dark-2 border border-white/5 text-white/30 text-[9px] font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right: Standard Operating Procedure Accordion */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-brand-dark-2/50 border border-slate-800/80 backdrop-blur-sm self-start">
            <div className="mb-6">
              <span className="text-brand-blue-light text-xs font-semibold uppercase tracking-widest font-mono">Operations Pipeline</span>
              <h2 className="font-display font-bold text-2xl mt-1 text-white">Standard Operating Procedure</h2>
              <p className="text-white/40 text-xs mt-1">How Zorbit transitions your ideas into stable code models.</p>
            </div>

            {/* Accordion List */}
            <div className="flex flex-col gap-3">
              {sopSteps.map((step) => {
                const isOpen = activeSop === step.id
                return (
                  <div
                    key={step.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isOpen ? 'bg-brand-dark-3/30 border-brand-blue/30 glow-blue' : 'bg-brand-dark-3/10 border-slate-800/60'
                    }`}
                  >
                    {/* Header trigger */}
                    <button
                      onClick={() => setActiveSop(isOpen ? '' : step.id)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm text-white hover:text-brand-blue-glow focus:outline-none transition-colors cursor-pointer"
                    >
                      <span>{step.title}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiChevronDown size={16} className="text-white/40" />
                      </motion.div>
                    </button>

                    {/* Expandable Details */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-5 pb-5 pt-1 border-t border-slate-800/40 flex flex-col gap-3">
                            <p className="text-white/50 text-xs leading-relaxed">
                              {step.desc}
                            </p>
                            <div className="flex flex-col gap-1.5 mt-2">
                              {step.details.map((detail, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-[10px] text-brand-blue-glow font-mono">
                                  <span className="w-1 h-1 rounded-full bg-brand-blue" />
                                  <span>{detail}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </section>
    </PageWrapper>
  )
}
