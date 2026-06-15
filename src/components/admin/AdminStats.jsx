import { FiMail, FiActivity, FiStar, FiClock } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function AdminStats({ messages = [], reviews = [] }) {
  // POS Pipeline Value: messages with "pos" or "enterprise" in project / message content
  const posCount = messages.filter((m) => {
    const proj = (m.project || '').toLowerCase()
    const body = (m.message || '').toLowerCase()
    return proj.includes('pos') || proj.includes('enterprise') || 
           body.includes('pos') || body.includes('enterprise') || 
           body.includes('point of sale')
  }).length

  const activeReviews = reviews.filter((r) => r.approved === true).length

  const stats = [
    {
      title: 'Total Leads Generated',
      value: messages.length,
      desc: 'All inquiries in localStorage',
      icon: FiMail,
      color: 'text-brand-blue-glow border-brand-blue/20 bg-brand-blue/5',
    },
    {
      title: 'POS Pipeline Count',
      value: posCount,
      desc: 'Enterprise POS inquiries',
      icon: FiActivity,
      color: 'text-cyan-400 border-cyan-500/10 bg-cyan-500/5',
    },
    {
      title: 'Active Testimonials',
      value: activeReviews,
      desc: 'Approved reviews featured live',
      icon: FiStar,
      color: 'text-amber-400 border-amber-500/10 bg-amber-500/5',
    },
    {
      title: 'Avg. Turnaround SLA',
      value: '< 4 Hours',
      desc: 'Target response threshold',
      icon: FiClock,
      color: 'text-emerald-400 border-emerald-500/10 bg-emerald-500/5',
    },
  ]

  const sprints = [
    { name: 'TN-GeoGuard GIS Engine', days: '48 Hours', progress: '15%', color: 'bg-emerald-500 shadow-[0_0_8px_#10B981]' },
    { name: 'Metro Mirchi 2.0 Platform', days: '5 Days', progress: '35%', color: 'bg-brand-blue shadow-[0_0_8px_#2563EB]' },
    { name: 'Zorbit Nexus POS System', days: '10 Days', progress: '70%', color: 'bg-cyan-500 shadow-[0_0_8px_#06B6D4]' },
    { name: 'Smart Library Platform', days: '14 Days', progress: '95%', color: 'bg-violet-500 shadow-[0_0_8px_#8B5CF6]' },
  ]

  return (
    <div className="flex flex-col gap-6 mb-8">
      {/* Top metrics grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-6 rounded-2xl bg-brand-dark-2 border border-slate-800 flex justify-between items-start hover:border-brand-blue/30 transition-colors group"
          >
            <div>
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold mb-1">
                {stat.title}
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white group-hover:text-brand-blue-glow transition-colors">
                {stat.value}
              </h3>
              <p className="text-[10px] text-white/40 mt-1.5">{stat.desc}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${stat.color}`}>
              <stat.icon size={18} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Visual Gantt timeline graph */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-3xl bg-brand-dark-2 border border-slate-800"
      >
        <h3 className="font-display font-bold text-sm text-white mb-5 uppercase tracking-wider">
          Active Project Sprint Timelines
        </h3>
        
        <div className="flex flex-col gap-5">
          {sprints.map((sprint) => (
            <div key={sprint.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="w-48 text-xs font-semibold text-white/60">
                {sprint.name}
              </div>
              <div className="flex-1 bg-brand-dark-3 border border-slate-800/60 rounded-full h-3 overflow-hidden relative mx-0 sm:mx-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: sprint.progress }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full rounded-full ${sprint.color}`}
                />
              </div>
              <div className="w-20 text-right text-xs font-mono font-bold text-brand-blue-glow">
                {sprint.days}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
