import { motion } from 'framer-motion'
import { FiArrowRight, FiBookOpen, FiDownload } from 'react-icons/fi'
import PageWrapper from '../components/PageWrapper'
import { resourcesData } from '../data/resourcesData'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Resources() {
  return (
    <PageWrapper>
      <section className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue-glow text-xs md:text-sm font-semibold mb-6"
        >
          <FiBookOpen size={14} /> Insights & Technical SEO
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-display text-4xl md:text-6xl font-bold mb-6 max-w-2xl"
        >
          Engineering playbooks & <span className="text-brand-blue">resources.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mb-16 leading-relaxed"
        >
          Explore our internal documentation, architecture breakdowns, and startup growth strategies designed to help you scale your technology faster.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resourcesData.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.link}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={i + 3}
              className="group block p-6 rounded-3xl bg-brand-dark-2/60 border border-white/5 hover:border-brand-blue/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)] flex flex-col h-full cursor-pointer"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue-light bg-brand-blue/10 px-3 py-1 rounded-full border border-brand-blue/20">
                  {post.category}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {post.date}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-brand-blue-light transition-colors leading-tight">
                {post.title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-6">
                {post.description}
              </p>

              <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between mt-auto">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  {post.readTime === 'Download' ? <FiDownload size={14} /> : <FiBookOpen size={14} />}
                  {post.readTime}
                </span>
                <span className="w-8 h-8 rounded-full bg-brand-dark-3 flex items-center justify-center text-white/50 group-hover:bg-brand-blue group-hover:text-white transition-all transform group-hover:translate-x-1">
                  <FiArrowRight size={14} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}
