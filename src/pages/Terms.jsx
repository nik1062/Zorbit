import { motion } from 'framer-motion'
import { FiShield, FiFileText, FiCpu, FiClock, FiKey } from 'react-icons/fi'
import PageWrapper from '../components/PageWrapper'

const sections = [
  {
    icon: FiClock,
    title: '1. Sprint Engagements & Delivery',
    content: 'Zorbit Studio operates exclusively on high-density engineering sprints (ranging from 48-hour rush queues to 14-day standard pipelines). Timeline commitments commence immediately upon client blueprint confirmation and security deposit clearance. Any modifications to the project scope during an active sprint will automatically adjust the delivery milestone target.',
  },
  {
    icon: FiCpu,
    title: '2. Code Ownership & Intellectual Property',
    content: 'Upon successful receipt of the final sprint milestone payment, Zorbit Studio grants the client full, unrestricted intellectual property rights and ownership over all custom codebase structures, Figma token assets, and repository assets developed during the designated sprint. Zorbit Studio retains the right to display design wireframes and anonymized case studies for promotional purposes.',
  },
  {
    icon: FiShield,
    title: '3. Technical Warranty & Stability',
    content: 'We engineer digital systems for production stability. Every sprint delivery includes a complimentary 30-day technical stability warranty. During this lifecycle window, Zorbit Studio will monitor CDN distributions, database sync pipelines, and resolve any software regressions or latency leaks arising directly from our shipped scope free of charge.',
  },
  {
    icon: FiKey,
    title: '4. Lead Data & Security Handshakes',
    content: 'Zorbit Studio is committed to complete security of your project briefs and lead metadata. All communication, API configurations, and architectural blueprints submitted via our dev console are encrypted. We do not sell or lease client contact directories to third parties. Access to the Zorbit command console is restricted to authenticated team nodes.',
  },
]

export default function Terms() {
  return (
    <PageWrapper>
      <section className="pt-32 pb-24 max-w-5xl mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-3xl mb-16 text-left space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue-glow text-xs font-semibold font-mono uppercase tracking-widest"
          >
            <FiShield size={12} className="animate-pulse" /> Legal Framework
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Terms of Engagement <span className="text-brand-blue">& SLA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 font-medium text-base md:text-lg leading-relaxed"
          >
            Effective Date: June 18, 2026. These terms govern all software development, design tokens, and platform administration sprints contracted with Zorbit Studio.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-start mb-16">
          {sections.map((section, idx) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, type: 'spring' }}
                className="p-6 md:p-8 rounded-3xl bg-brand-dark-2/45 border border-slate-800/80 backdrop-blur-sm shadow-[0_0_20px_rgba(37,99,235,0.02)] flex flex-col gap-4 text-left group hover:border-brand-blue/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center border border-brand-blue/10 group-hover:bg-brand-blue/20 transition-all duration-300">
                  <Icon size={16} className="text-brand-blue-light" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-blue-glow transition-colors duration-250 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-slate-350 text-sm leading-relaxed font-medium">
                    {section.content}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Note Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-6 rounded-2xl bg-brand-dark-3/60 border border-slate-800 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-left relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex gap-3 items-center relative z-10">
            <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0 border border-brand-blue/10">
              <FiFileText className="text-brand-blue-light" size={14} />
            </div>
            <div>
              <span className="text-xs text-white/50 block font-mono font-bold uppercase tracking-wider">Need Custom SLAs?</span>
              <p className="text-xs text-slate-300 font-semibold mt-0.5">We draft custom enterprise agreements for high-traffic sync POS clusters.</p>
            </div>
          </div>
          <a
            href="mailto:zorbitweb@gmail.com"
            className="px-4 py-2 bg-brand-blue hover:bg-brand-blue-light text-white text-xs font-bold rounded-lg tracking-wider uppercase transition-colors shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.2)]"
          >
            Consult Legal Team
          </a>
        </motion.div>
      </section>
    </PageWrapper>
  )
}
