import { motion } from 'framer-motion'
import { FiTarget, FiCpu, FiGitBranch, FiTerminal, FiZap, FiShield, FiCheckCircle } from 'react-icons/fi'
import PageWrapper from '../components/PageWrapper'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
}

const teamRegistry = [
  {
    name: 'Nikunj Kumar',
    role: 'Lead Full-Stack Architect & DevOps',
    nodeId: 'NODE_01_MAA',
    commits: '1,482 commits',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    bio: 'Specializes in high-throughput database replication, microservices architecture, and secure payment integrations.',
  },
  {
    name: 'Abhishek Tiwari',
    role: 'Senior Infrastructure & Platform Architect',
    nodeId: 'NODE_02_INFRA',
    commits: '2,945 commits',
    tech: ['Kubernetes', 'Docker', 'AWS Ops', 'FastAPI', 'Nginx', 'CI/CD'],
    bio: 'Oversees global platform clustering, container orchestration pipelines, cloud firewall rules, and high-availability server management.',
  },
  {
    name: 'Ansh Dubey',
    role: 'Junior Frontend & AI Integration Specialist',
    nodeId: 'NODE_03_INTEGRATE',
    commits: '348 commits',
    tech: ['React', 'Tailwind CSS', 'OpenAI API', 'Python', 'Framer Motion'],
    bio: 'Focuses on responsive user interface grids, prompt engineering pipelines, and connecting generative AI models with native web endpoints.',
  },
]

const values = [
  {
    icon: FiZap,
    title: 'Velocity First',
    desc: 'We replace weeks of legacy planning with rapid 48-Hour and 5-Day engineering sprints to deliver fully functional MVPs.',
  },
  {
    icon: FiShield,
    title: 'Resilience Engineering',
    desc: 'Offline-first synchronizations, strict security access, and fault-tolerant replica nodes are baked directly into our core builds.',
  },
  {
    icon: FiCpu,
    title: 'Aesthetic Precision',
    desc: 'We construct modular design token systems to guarantee 100% pixel responsiveness across all device boundaries.',
  },
]

const timeline = [
  {
    year: '2025',
    title: 'Niral Thiruvizha 3.0 Hackathon',
    desc: 'Engineered TN-GeoGuard, a Leaflet GIS map coordination engine for government land monitoring, within a 48-hour timeline limit.',
  },
  {
    year: '2025',
    title: 'POS Architecture Standard',
    desc: 'Developed the Zorbit Nexus POS system layout, defining the offline-first billing standard with sub-15ms sync cycles.',
  },
  {
    year: '2026',
    title: 'Core Agency Launch',
    desc: 'Organized Zorbit Creative Studio in Bhagalpur, Bihar, India, offering modular website building, mobile apps, and platform management.',
  },
]

export default function About() {
  return (
    <PageWrapper>
      <section className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        {/* Header Hero */}
        <div className="max-w-3xl mb-20 text-left">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue-glow text-xs font-semibold mb-6"
          >
            <FiTarget size={12} className="animate-pulse" /> Core Identity
          </motion.div>
          
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display text-4xl md:text-6xl font-bold leading-tight text-white mb-6"
          >
            We engineer high-fidelity <span className="text-brand-blue">systems.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="text-slate-300 font-medium text-lg md:text-xl leading-relaxed"
          >
            Zorbit is a specialized creative studio and software agency. We bridge the gap between fast-paced design iteration and robust, backend system resilience.
          </motion.p>
        </div>

        {/* Core Values Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border-beam-container rounded-3xl bg-brand-dark-2/40 group"
            >
              <div className="border-beam-effect" />
              <div className="border-beam-content p-6 md:p-8 bg-brand-dark-2/95 rounded-3xl flex flex-col gap-4 h-full w-full">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center border border-brand-blue/10 text-brand-blue-glow shrink-0">
                  <v.icon size={20} />
                </div>
                <h3 className="font-display font-bold text-lg text-white">{v.title}</h3>
                <p className="text-slate-350 text-sm md:text-base leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* History Timeline */}
        <div className="grid lg:grid-cols-12 gap-12 py-20 border-t border-slate-800/60 items-start">
          <div className="lg:col-span-5 flex flex-col gap-3 text-left">
            <span className="text-brand-blue-light text-xs font-semibold uppercase tracking-widest font-mono">Development Logs</span>
            <h2 className="font-display font-bold text-3xl text-white">System Genesis & Milestones</h2>
            <p className="text-slate-350 text-sm md:text-base leading-relaxed mt-1">
              Our growth trajectory from high-pressure hackathon sprints to production-grade enterprise systems.
            </p>
          </div>

          <div className="lg:col-span-7 relative border-l-2 border-slate-800 ml-4 pl-8 py-4 flex flex-col gap-12 w-full">
            {timeline.map((item, idx) => (
              <motion.div
                key={`${item.year}-${idx}`}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative flex flex-col gap-2 group text-left"
              >
                {/* Timeline node */}
                <div className="absolute -left-[41px] top-1.5 w-4.5 h-4.5 rounded-full bg-brand-dark border-2 border-slate-800 group-hover:border-brand-blue transition-colors flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-brand-blue-glow group-hover:shadow-[0_0_8px_#3B82F6] transition-all" />
                </div>

                <div className="flex items-center gap-3 text-brand-blue-glow font-mono font-bold tracking-wide text-xs md:text-sm">
                  <span>[{item.year}]</span>
                  <h3 className="font-display font-bold text-white text-sm md:text-base">{item.title}</h3>
                </div>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Core Architecture Registry */}
        <div className="mt-20 pt-16 border-t border-slate-800/60">
          <div className="max-w-2xl text-left mb-12">
            <span className="text-brand-blue-light text-sm font-semibold uppercase tracking-widest font-mono">Team Synapse</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-white">Core Architecture Registry</h2>
            <p className="text-slate-300 font-medium text-base md:text-lg mt-2 leading-relaxed">
              Meet the system architects responsible for compiling, deploying, and optimizing Zorbit systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamRegistry.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-beam-container rounded-3xl bg-[#090C15]/80 group"
              >
                <div className="border-beam-effect" />
                <div className="border-beam-content p-6 md:p-8 bg-[#090C15]/95 rounded-3xl flex flex-col font-mono text-xs text-left h-full w-full">
                  {/* Header HUD */}
                  <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-5 text-white/45">
                    <div className="flex items-center gap-2">
                      <FiTerminal className="text-brand-blue-glow" size={13} />
                      <span className="text-[10px] tracking-wider uppercase font-semibold text-white/70">
                        {member.nodeId}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      STATUS: ACTIVE
                    </span>
                  </div>

                  {/* Profile Details */}
                  <h3 className="font-display text-lg font-bold text-white tracking-tight font-sans">
                    {member.name}
                  </h3>
                  <p className="text-brand-blue-light text-xs font-semibold mt-1 font-sans">
                    {member.role}
                  </p>

                  <p className="text-slate-300 font-sans text-xs md:text-sm mt-4 leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Tech Stacks */}
                  <div className="mt-auto pt-4 border-t border-slate-800/60 flex flex-col gap-3">
                    <div className="flex justify-between text-[10px] text-white/30 font-semibold uppercase tracking-wider font-mono">
                      <span>Core Technologies</span>
                      <span>{member.commits}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {member.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg bg-brand-dark-3 text-slate-350 text-[11px] font-mono tracking-wide border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
