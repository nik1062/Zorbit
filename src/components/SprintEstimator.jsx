import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSliders, FiClock, FiZap, FiLayers, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Button from './Button'

const projectTypes = [
  { id: 'landing', label: 'Landing Page', basePrice: 14999, baseDays: 3, baseSize: 45 },
  { id: 'webapp', label: 'Full Web App', basePrice: 29999, baseDays: 5, baseSize: 120 },
  { id: 'backend', label: 'Backend System', basePrice: 44999, baseDays: 7, baseSize: 185 },
  { id: 'enterprise', label: 'POS & Enterprise', basePrice: 59999, baseDays: 10, baseSize: 250 },
]

const addons = [
  { id: 'sync', label: 'Real-time WebSocket Sync', price: 7500, days: 2, size: 25 },
  { id: 'admin', label: 'Admin Management Panel', price: 10500, days: 3, size: 30 },
  { id: 'gis', label: 'Leaflet GIS Coordinate Maps', price: 12000, days: 2, size: 45 },
  { id: 'resend', label: 'Resend API Automated Mail', price: 4500, days: 1, size: 10 },
]

export default function SprintEstimator() {
  const [selectedType, setSelectedType] = useState('landing')
  const [selectedAddons, setSelectedAddons] = useState([])
  const [estimate, setEstimate] = useState({ price: 14999, days: 3, size: 45 })

  useEffect(() => {
    const typeObj = projectTypes.find(t => t.id === selectedType)
    let totalPrice = typeObj.basePrice
    let totalDays = typeObj.baseDays
    let totalSize = typeObj.baseSize

    selectedAddons.forEach(addonId => {
      const addon = addons.find(a => a.id === addonId)
      if (addon) {
        totalPrice += addon.price
        totalDays += addon.days
        totalSize += addon.size
      }
    })

    setEstimate({ price: totalPrice, days: totalDays, size: totalSize })
  }, [selectedType, selectedAddons])

  const toggleAddon = (id) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  const getMilestones = () => {
    const milestones = []
    if (estimate.days <= 4) {
      milestones.push(`Day 1: Design tokens & wireframes finalized`)
      milestones.push(`Day 2: Component architecture build`)
      milestones.push(`Day 3: Flat SSG production handoff`)
    } else if (estimate.days <= 8) {
      milestones.push(`Day 1-2: User flows & mockup sign-off`)
      milestones.push(`Day 3-5: Client frontend & UI components staging`)
      milestones.push(`Day 6-7: Core system connection & API tests`)
      milestones.push(`Day ${estimate.days}: Edge deployment & final audit`)
    } else {
      milestones.push(`Day 1-3: DB schemas, UX token maps, architecture lock`)
      milestones.push(`Day 4-8: Full stack modular staging builds`)
      milestones.push(`Day 9-11: Stress testing, concurrency review`)
      milestones.push(`Day ${estimate.days}: Live global cluster switch`)
    }
    return milestones
  }

  return (
    <div className="w-full rounded-3xl bg-brand-dark-2/40 border border-slate-800/80 p-6 md:p-8 backdrop-blur-sm shadow-[0_0_30px_rgba(37,99,235,0.02)] relative overflow-hidden text-left">
      {/* Glow highlight */}
      <div className="absolute top-0 right-1/4 w-[250px] h-[1px] bg-gradient-to-r from-transparent via-brand-blue-glow to-transparent shadow-[0_0_20px_#60A5FA]" />

      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue-glow">
          <FiSliders size={16} />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl md:text-2xl text-white">Sprint Planner</h3>
          <p className="text-slate-400 text-xs md:text-sm">Configure your specifications to calculate estimates instantly.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Configurations Column */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Project Types */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-white/50 mb-3.5">
              1. Select Project Architecture
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {projectTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-3.5 rounded-xl border text-xs md:text-sm font-semibold tracking-wide text-center transition-all cursor-pointer ${
                    selectedType === type.id
                      ? 'bg-brand-blue/15 border-brand-blue/40 text-brand-blue-glow shadow-[0_0_15px_rgba(59,130,246,0.12)] font-bold'
                      : 'bg-brand-dark hover:bg-brand-dark-3 text-slate-405 hover:text-white border-slate-800/80'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-white/50 mb-3.5">
              2. Inject Custom Integrations
            </label>
            <div className="grid md:grid-cols-2 gap-3.5">
              {addons.map((addon) => {
                const isActive = selectedAddons.includes(addon.id)
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-4 rounded-xl border text-left flex justify-between items-center transition-all cursor-pointer group ${
                      isActive
                        ? 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue-glow shadow-[0_0_12px_rgba(59,130,246,0.08)]'
                        : 'bg-brand-dark/70 hover:bg-brand-dark-3 text-slate-300 hover:text-white border-slate-800/80'
                    }`}
                  >
                    <div>
                      <span className="text-xs md:text-sm font-bold block">{addon.label}</span>
                      <span className="text-[10px] text-slate-400 mt-1 block font-mono">
                        +{addon.days} Day{addon.days > 1 && 's'} | +{addon.size}kB Bundle
                      </span>
                    </div>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border transition-colors ${
                      isActive
                        ? 'border-brand-blue/35 bg-brand-blue/10 text-brand-blue-glow'
                        : 'border-slate-800/80 text-white/40 group-hover:text-white/60'
                    }`}>
                      +₹{addon.price.toLocaleString('en-IN')}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

        </div>

        {/* Real-time Diagnostics Output Column */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800/80 bg-[#080B13] overflow-hidden flex flex-col relative glow-blue self-stretch">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(37,99,235,0.015)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

          {/* HUD Header */}
          <div className="bg-[#05070B] px-5 py-3 border-b border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-white/40 z-10">
            <span className="flex items-center gap-1.5 uppercase tracking-wider font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" /> Telemetry Estimate
            </span>
            <span className="text-brand-blue-glow uppercase tracking-widest bg-brand-blue/10 px-2 py-0.5 rounded border border-brand-blue/20">
              Vite bundle: {estimate.size}kB
            </span>
          </div>

          {/* Pricing & Time Display */}
          <div className="p-6 flex-grow flex flex-col gap-6 relative z-10">
            <div className="grid grid-cols-2 gap-4 divide-x divide-slate-800/60">
              
              {/* Timeline Output */}
              <div className="flex flex-col gap-1 text-center pr-2">
                <span className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5 justify-center">
                  <FiClock size={11} className="text-brand-blue-glow" /> Target Timeline
                </span>
                <AnimatePresence mode="wait">
                  <motion.h4
                    key={estimate.days}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="font-display text-2xl md:text-3xl font-black text-white mt-1.5"
                  >
                    {estimate.days} Days
                  </motion.h4>
                </AnimatePresence>
                <span className="text-[10px] text-slate-400 mt-1 uppercase font-mono tracking-wider">
                  Guaranteed Handoff
                </span>
              </div>

              {/* Price Output */}
              <div className="flex flex-col gap-1 text-center pl-4">
                <span className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5 justify-center">
                  <span className="text-brand-blue-glow font-bold text-[11px]">₹</span> Pricing Est.
                </span>
                <AnimatePresence mode="wait">
                  <motion.h4
                    key={estimate.price}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="font-display text-2xl md:text-3xl font-black text-brand-blue-light mt-1.5"
                  >
                    ₹{estimate.price.toLocaleString('en-IN')}
                  </motion.h4>
                </AnimatePresence>
                <span className="text-[10px] text-slate-400 mt-1 uppercase font-mono tracking-wider">
                  Base Starting Rate
                </span>
              </div>

            </div>

            {/* Timeline Stepper checklist */}
            <div className="border-t border-slate-800/60 pt-4 flex-grow">
              <span className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest block mb-3">
                Sprint Milestone Steppers
              </span>
              <div className="space-y-2.5">
                {getMilestones().map((step, idx) => (
                  <div key={idx} className="flex gap-2 items-start text-[11px] md:text-xs text-slate-300">
                    <FiZap size={12} className="text-brand-blue-glow mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout CTA */}
            <div className="pt-4 border-t border-slate-800/60 mt-auto">
              <Link to="/contact">
                <Button variant="primary" className="w-full text-xs font-bold uppercase tracking-wider py-3.5 justify-center">
                  Initiate This Sprint <FiArrowRight size={13} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
