import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiClock, FiTool, FiAlertCircle, FiCheckCircle, FiX, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { projectsData } from '../data/projectsData'
import PageWrapper from '../components/PageWrapper'
import Button from '../components/Button'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Work() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')

  // Map user selections to projectsData category matches
  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Web') return project.category.includes('Web')
    if (activeFilter === 'POS/Software') return project.category.includes('Enterprise') || project.category.includes('Full-Stack')
    if (activeFilter === 'GIS') return project.category.includes('GIS')
    return true
  })

  return (
    <PageWrapper>
      <section className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-brand-blue-light text-sm font-semibold uppercase tracking-widest mb-4"
        >
          Case Studies
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-display text-4xl md:text-6xl font-bold mb-6 max-w-2xl"
        >
          High-velocity <span className="text-brand-blue">engineering.</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="text-white/40 text-lg max-w-xl mb-12"
        >
          Real-world problem solving. We design and launch fully stable MVPs and robust production networks in record time. Click any card below to open its engineering ledger.
        </motion.p>

        {/* Categories filter tabs */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-slate-800 pb-5">
          {['All', 'Web', 'POS/Software', 'GIS'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4.5 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue-glow shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                  : 'bg-brand-dark hover:bg-brand-dark-3 text-white/40 hover:text-white border-slate-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
                className="border-beam-container rounded-2xl bg-brand-dark-2 cursor-pointer group"
              >
                {/* Border Beam Glowing Border Effect */}
                <div className="border-beam-effect" />

                {/* Card Main Body */}
                <div className="border-beam-content p-7 bg-brand-dark-2 flex flex-col justify-between h-full">
                  <div className="relative z-10 flex flex-col gap-5 h-full w-full">
                    {/* Meta details */}
                    <div className="flex justify-between items-center w-full">
                      <span className="text-brand-blue-light text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full">
                        {project.category}
                      </span>
                      <span className="text-white/40 text-[10px] flex items-center gap-1 font-mono">
                        <FiClock size={11} className="text-brand-blue-glow" /> {project.completionTime}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="font-display font-bold text-xl mb-2 text-white group-hover:text-brand-blue-glow transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/40 text-xs leading-relaxed line-clamp-3">
                        {project.desc || project.problem}
                      </p>
                    </div>

                    {/* Tech Stack tags */}
                    <div className="border-t border-white/5 pt-3.5 mt-auto flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-lg bg-brand-dark-3 text-white/30 text-[9px] border border-white/5 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-[9px] text-white/20 font-mono self-center font-semibold">
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Case Study Deep-Dive Expandable Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070B]/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl p-8 rounded-3xl bg-brand-dark-2 border border-slate-800 glow-blue text-left relative overflow-hidden flex flex-col gap-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-brand-dark-3 hover:bg-brand-dark-4 text-white/40 hover:text-white border border-slate-800 transition-all cursor-pointer"
                aria-label="Close Case Study"
              >
                <FiX size={16} />
              </button>

              {/* Modal Header */}
              <div>
                <span className="text-brand-blue-light text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full">
                  {selectedProject.category}
                </span>
                <h2 className="font-display font-bold text-3xl mt-3 text-white">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center gap-2 mt-2 text-white/40 text-xs font-mono">
                  <FiClock size={12} className="text-brand-blue" />
                  <span>Sprint Delivery: {selectedProject.completionTime}</span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex flex-col gap-5 border-y border-slate-800/60 py-5">
                {/* Problem Section */}
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <FiAlertCircle className="text-red-400" size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] text-white/30 uppercase font-semibold tracking-wider font-mono">Problem Statement</h4>
                    <p className="text-white/70 text-sm leading-relaxed mt-1">
                      {selectedProject.problem}
                    </p>
                  </div>
                </div>

                {/* Solution Section */}
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <FiCheckCircle className="text-emerald-400" size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] text-white/30 uppercase font-semibold tracking-wider font-mono">Engineering Solution</h4>
                    <p className="text-white/70 text-sm leading-relaxed mt-1">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="text-[10px] text-white/30 uppercase font-semibold tracking-wider font-mono mb-2">Technology Framework</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-brand-dark-3 text-white/50 text-[10px] border border-slate-800 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Link to="/contact" className="w-full sm:w-auto mt-2 sm:mt-0">
                  <Button variant="primary" className="py-2.5 text-xs w-full justify-center">
                    Initiate Sprint <FiArrowRight size={12} />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}
