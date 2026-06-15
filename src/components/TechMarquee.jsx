import { motion } from 'framer-motion'
import { FiCpu, FiCode, FiLayers, FiDatabase, FiSettings, FiActivity } from 'react-icons/fi'

const tech = [
  { name: 'React 18', icon: FiCode },
  { name: 'Tailwind CSS v3', icon: FiLayers },
  { name: 'Vite', icon: FiCpu },
  { name: 'FastAPI', icon: FiSettings },
  { name: 'Node.js', icon: FiActivity },
  { name: 'PostgreSQL', icon: FiDatabase },
  { name: 'MongoDB', icon: FiDatabase },
  { name: 'Framer Motion', icon: FiActivity },
  { name: 'Leaflet GIS', icon: FiLayers },
  { name: 'SQLite', icon: FiDatabase },
]

export default function TechMarquee() {
  const list = [...tech, ...tech, ...tech] // Duplicate for seamless scrolling

  return (
    <div className="w-full overflow-hidden py-10 relative bg-brand-dark-2/40 border-y border-white/5">
      {/* Fade Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: [0, -960] }}
        transition={{
          ease: 'linear',
          duration: 25,
          repeat: Infinity,
        }}
      >
        {list.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-brand-dark-2/65 border border-white/5 text-white/60 hover:text-brand-blue-glow hover:border-brand-blue/30 transition-all cursor-pointer hover:-translate-y-0.5"
          >
            <item.icon size={14} className="text-brand-blue-light" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider">{item.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
