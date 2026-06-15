import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import { FiCode, FiLayers, FiActivity } from 'react-icons/fi'
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
    title: 'Full-Stack Web Engineering',
    desc: 'High-performance frontends paired with robust, secure backend architectures built to scale.',
  },
  {
    icon: FiLayers,
    title: 'UI/UX & Identity Design',
    desc: 'From user journey mapping to custom vector branding assets that convert.',
  },
  {
    icon: FiActivity,
    title: 'Custom POS Engines',
    desc: 'Offline-first resilience, ultra-low interface latency, and rapid inventory syncing.',
  },
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
              className="font-display text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 max-w-4xl"
            >
              We engineer high-impact <span className="text-brand-blue text-glow">digital tools</span> in record sprints.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="text-white/50 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
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
              <p className="font-display text-3xl md:text-4xl font-bold text-brand-blue-light mb-1">{value}</p>
              <p className="text-white/40 text-xs uppercase tracking-wider">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Ticker Marquee */}
      <TechMarquee />

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
          className="text-white/40 mb-14 max-w-xl"
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
              <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
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
          <p className="text-white/40 mb-8 max-w-lg mx-auto">
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