import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import { FiCode, FiLayers, FiActivity, FiClock, FiCpu, FiGitBranch, FiGitPullRequest, FiSmartphone, FiSliders, FiServer } from 'react-icons/fi'
import PageWrapper from '../components/PageWrapper'
import Button from '../components/Button'
import ReviewSystem from '../components/ReviewSystem'
import InteractiveGrid from '../components/InteractiveGrid'
import DevConsoleWidget from '../components/DevConsoleWidget'
import TechMarquee from '../components/TechMarquee'

const stats = [
  { value: '5 Days', label: 'Average Web MVP Sprint' },
  { value: '48 Hours', label: 'GIS Live Mapping Sprint' },
  { value: 'Zero', label: 'POS Local Latency' },
  { value: '100%', label: 'Production Stability' },
]

const highlights = [
  {
    icon: FiCode,
    title: 'Website & App Building',
    desc: 'High-performance, pixel-perfect frontend websites and mobile applications built with rapid execution speed.',
  },
  {
    icon: FiSliders,
    title: 'Platform Management',
    desc: 'Continuous administration of web ecosystems, secure database clusters, and automated backups.',
  },
  {
    icon: FiServer,
    title: 'Server Ops & POS Development',
    desc: 'Deploying robust backend server infrastructures alongside offline-first Point of Sale billing systems.',
  },
]

const sprints = [
  { name: 'TN-GeoGuard GIS Engine', days: '48 Hours', progress: '15%', color: 'bg-emerald-500 shadow-[0_0_8px_#10B981]' },
  { name: 'Metro Mirchi 2.0 Platform', days: '5 Days', progress: '35%', color: 'bg-brand-blue shadow-[0_0_8px_#2563EB]' },
  { name: 'Zorbit Nexus POS System', days: '10 Days', progress: '70%', color: 'bg-cyan-500 shadow-[0_0_8px_#06B6D4]' },
  { name: 'Smart Library Platform', days: '14 Days', progress: '95%', color: 'bg-violet-500 shadow-[0_0_8px_#8B5CF6]' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Home() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="min-h-screen flex items-center pt-20 relative overflow-hidden bg-[#05070B]">
        {/* Dynamic HTML5 Interactive Grid Background */}
        <InteractiveGrid />

        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-brand-blue-glow/5 blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 w-full grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue-glow text-xs md:text-sm font-semibold tracking-wide mb-8"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-pulse shadow-[0_0_10px_#2563EB]" />
              Now Booking Late Q2 2026
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="font-display text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 max-w-4xl"
            >
              We engineer high-impact <span className="text-brand-blue text-glow">digital tools</span> in record sprints.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="text-slate-300 font-medium text-lg md:text-xl lg:text-2xl max-w-2xl mb-10 leading-relaxed"
            >
              Zorbit is an elite creative studio specializing in full-stack web architectures, UI/UX systems, and tailor-made enterprise Point of Sale systems.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="flex flex-wrap gap-4"
            >
              <Link to="/work">
                <Button variant="primary">
                  Explore Sprints & Work <HiArrowRight />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline">Consult our Engineers</Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Shell Console Widget Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <DevConsoleWidget />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-brand-dark-2 relative">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="text-center"
            >
              <p className="font-display text-3xl md:text-4xl font-bold text-brand-blue-light mb-1.5">{value}</p>
              <p className="text-slate-300 text-xs md:text-sm font-semibold uppercase tracking-wide">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Ticker Marquee */}
      <TechMarquee />

      {/* Live Studio Telemetry Dashboard */}
      <section className="border-t border-white/5 bg-brand-dark-3/20 py-24 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-blue/3 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          {/* Left info column */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue-glow text-xs font-semibold mb-4"
            >
              <FiActivity size={12} className="animate-pulse" /> Live Studio Status
            </motion.div>
            
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="font-display text-3xl md:text-4xl font-bold mb-4"
            >
              Live Telemetry & <span className="text-brand-blue">Active Sprints</span>
            </motion.h2>
            
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={1}
              className="text-slate-300 font-medium text-base md:text-lg mb-8 leading-relaxed max-w-md"
            >
              We operate with absolute transparency. Track our current software sprints, deployment velocities, and active queue health metrics in real-time.
            </motion.p>

            {/* KPI grid */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {[
                { label: 'Active Sprints', val: '4 Pipeline', desc: 'Parallel dev queues', icon: FiGitBranch, color: 'text-brand-blue-glow' },
                { label: 'Avg. Response SLA', val: '< 4 Hours', desc: 'Inquiry response target', icon: FiClock, color: 'text-emerald-400' },
                { label: 'Commit Velocity', val: '98.9%', desc: 'On-time milestones', icon: FiGitPullRequest, color: 'text-cyan-400' },
                { label: 'POS Sync Latency', val: '12ms', desc: 'Offline-first sync speed', icon: FiCpu, color: 'text-violet-400' },
              ].map((kpi, idx) => (
                <motion.div
                  key={kpi.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={idx + 2}
                  className="p-4 rounded-xl bg-brand-dark-2/60 border border-slate-800/80 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">{kpi.label}</span>
                    <kpi.icon size={14} className={kpi.color} />
                  </div>
                  <div>
                    <h4 className="font-display text-base md:text-lg font-bold text-white">{kpi.val}</h4>
                    <p className="text-[10px] text-white/30 mt-0.5">{kpi.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Gantt Chart Widget */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 w-full p-6 md:p-8 rounded-3xl bg-brand-dark-2/50 border border-slate-800/80 backdrop-blur-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white/60 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active Project Sprint Timelines
              </h3>
              <span className="text-[10px] text-brand-blue-glow font-mono uppercase bg-brand-blue/10 px-2 py-0.5 rounded border border-brand-blue/20">
                Sync: Active
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {sprints.map((sprint, i) => (
                <div key={sprint.name} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-semibold text-white/70">
                    <span className="truncate max-w-[200px] md:max-w-xs">{sprint.name}</span>
                    <span className="font-mono text-brand-blue-glow">{sprint.days} remaining</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-grow bg-brand-dark-3 border border-slate-800/80 rounded-full h-3.5 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: sprint.progress }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeOut' }}
                        className={`h-full rounded-full ${sprint.color}`}
                      />
                    </div>
                    <span className="w-8 text-right font-mono text-[11px] font-bold text-white/40">
                      {sprint.progress}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Git Commit Timeline / Live Stream */}
            <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Latest release pushed 14m ago: <span className="text-white/60 font-semibold">v2.6.0</span>
              </span>
              <Link to="/work" className="text-brand-blue hover:text-brand-blue-light transition-colors">
                View Repository Archives &rarr;
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold mb-4"
        >
          Modular Architectures
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
          className="text-slate-300 font-medium text-lg md:text-xl max-w-2xl mb-14 leading-relaxed"
        >
          We build robust, responsive assets optimized for immediate deployment.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="p-6 rounded-2xl bg-brand-dark-2 border border-white/5 hover:border-brand-blue/30 hover:glow-blue transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-4 group-hover:bg-brand-blue/20 transition-colors">
                <Icon size={22} className="text-brand-blue-light" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="border-t border-white/5 bg-brand-dark-2/40 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <ReviewSystem />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-3xl bg-brand-dark-3 border border-brand-blue/20 p-12 text-center glow-blue"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Have a project concept <span className="text-brand-blue">ready?</span>
          </h2>
          <p className="text-slate-300 font-medium text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Book our engineering sprint team today. We'll start coordinate planning immediately.
          </p>
          <Link to="/contact">
            <Button variant="primary" className="px-8 py-4 text-base">
              Start Your Sprint <HiArrowRight />
            </Button>
          </Link>
        </motion.div>
      </section>
    </PageWrapper>
  )
}