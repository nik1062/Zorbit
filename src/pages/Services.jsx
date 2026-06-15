import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCode, FiSmartphone, FiSliders, FiServer, FiChevronDown } from 'react-icons/fi'
import PageWrapper from '../components/PageWrapper'
import { servicesData } from '../data/servicesData'
import GlobalTelemetryMap from '../components/GlobalTelemetryMap'

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
        {/* Header Section */}
        <div className="max-w-2xl mb-12">
          <span className="text-brand-blue-light text-sm font-semibold uppercase tracking-widest font-mono">Capabilities</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2">
            Services <span className="text-brand-blue">Providing</span>
          </h1>
          <p className="text-white/30 line-through text-xs md:text-sm font-semibold uppercase tracking-wider mt-1.5 mb-6">
            work showcase
          </p>
          <p className="text-slate-300 font-medium text-lg md:text-xl leading-relaxed">
            We handle the full spectrum of high-end software development, mobile apps, platform management, and POS server architectures.
          </p>
        </div>

        {/* 1. Capabilities Bento Grid (4 Cards) */}
        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {servicesData.map((service, idx) => {
            const icons = [FiCode, FiSmartphone, FiSliders, FiServer]
            const Icon = icons[idx] || FiCode
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-6 md:p-8 rounded-3xl bg-brand-dark-2/40 border border-slate-800/80 hover:border-brand-blue/30 hover:glow-blue transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-5 group-hover:bg-brand-blue/20 transition-colors border border-brand-blue/10">
                    <Icon size={20} className="text-brand-blue-light" />
                  </div>
                  <h3 className="font-display font-bold text-lg md:text-xl text-white group-hover:text-brand-blue-glow transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mt-2">
                    {service.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-slate-800/60">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-brand-dark-3 text-slate-300 text-xs md:text-sm font-mono tracking-wide border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* 2. Standard Operating Procedure (Grid Layout) */}
        <div className="grid lg:grid-cols-12 gap-12 py-16 border-t border-slate-800/60 items-start">
          {/* Left Intro Column */}
          <div className="lg:col-span-5 flex flex-col gap-3 text-left">
            <span className="text-brand-blue-light text-xs font-semibold uppercase tracking-widest font-mono">Operations Pipeline</span>
            <h2 className="font-display font-bold text-3xl text-white">Standard Operating Procedure</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mt-1">
              How Zorbit systematically transitions your requirements into robust, high-performance deployed codebases.
            </p>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-7 flex flex-col gap-3 w-full">
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
                    className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm md:text-base text-white hover:text-brand-blue-glow focus:outline-none transition-colors cursor-pointer"
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
                          <p className="text-slate-350 text-sm md:text-base leading-relaxed">
                            {step.desc}
                          </p>
                          <div className="flex flex-col gap-1.5 mt-2">
                            {step.details.map((detail, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs md:text-sm text-brand-blue-glow font-mono tracking-wide">
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

        {/* 3. Global Edge Telemetry Network */}
        <div className="mt-16 pt-16 border-t border-slate-800/60">
          <div className="max-w-2xl text-left">
            <span className="text-brand-blue-light text-sm font-semibold uppercase tracking-widest font-mono">Infrastructure</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-white">Global Server Ops & Node Sync</h2>
            <p className="text-slate-300 font-medium text-base md:text-lg mt-2 leading-relaxed">
              We monitor network throughput and active replication channels between our primary servers to ensure 100% data fidelity.
            </p>
          </div>
          <GlobalTelemetryMap />
        </div>
      </section>
    </PageWrapper>
  )
}
