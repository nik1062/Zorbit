import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiLayers, FiCalendar, FiTrash2, FiInbox, FiArchive, FiCheck, FiUser } from 'react-icons/fi'
import Button from '../Button'

export default function MessageRow({ messages = [], onUpdateMessages }) {
  const [filter, setFilter] = useState('all')

  const handleToggleArchive = (id) => {
    const updated = messages.map((m) => {
      if (m.id === id) {
        return { ...m, archived: !m.archived }
      }
      return m
    })
    onUpdateMessages(updated)
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this inquiry permanently?')) {
      const updated = messages.filter((m) => m.id !== id)
      onUpdateMessages(updated)
    }
  }

  // Filter messages
  const filtered = messages.filter((msg) => {
    const isPOS = (msg.project || '').toLowerCase().includes('pos') || 
                  (msg.project || '').toLowerCase().includes('enterprise') ||
                  (msg.message || '').toLowerCase().includes('pos')
                  
    if (filter === 'all') return true
    if (filter === 'new') return !msg.archived
    if (filter === 'pos') return isPOS && !msg.archived
    if (filter === 'archived') return msg.archived
    return true
  })

  // Format mailto links
  const getMailtoLink = (msg) => {
    const subject = encodeURIComponent('Zorbit Studio — Onboarding Discussion')
    const body = encodeURIComponent(
      `Hi ${msg.name},\n\nThank you for reaching out to Zorbit Creative Studio.\n\nWe received your inquiry regarding "${msg.project || 'General Development'}" with the following project brief:\n\n"${msg.message}"\n\nOur engineering sprint team would love to set up a quick 15-minute call to align on technical specs and estimate timelines.\n\nLet us know your availability.\n\nBest regards,\nZorbit Engineering Team\nChennai, Tamil Nadu, India`
    )
    return `mailto:${msg.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Control Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        {[
          { id: 'all', label: 'All Inquiries' },
          { id: 'new', label: 'New Leads' },
          { id: 'pos', label: 'POS Inquiries' },
          { id: 'archived', label: 'Archived Files' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
              filter === tab.id
                ? 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue-glow shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                : 'bg-brand-dark-2 hover:bg-brand-dark-3 text-white/40 hover:text-white border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Message Cards List */}
      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-2 p-12 text-center rounded-2xl bg-brand-dark-2 border border-slate-800"
            >
              <FiInbox size={36} className="mx-auto text-white/20 mb-3" />
              <p className="text-white/60 text-sm font-medium">No lead folders found</p>
              <p className="text-white/30 text-xs mt-1">Submitted user responses in this segment are empty.</p>
            </motion.div>
          ) : (
            filtered.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                className="p-6 rounded-2xl bg-brand-dark-2 border border-slate-800 flex flex-col justify-between hover:border-brand-blue/20 transition-all relative overflow-hidden group"
              >
                {/* Visual indicator bar */}
                <div className={`absolute left-0 top-0 h-full w-1 ${msg.archived ? 'bg-slate-700' : 'bg-brand-blue-glow'}`} />

                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-white text-base flex items-center gap-2">
                        <FiUser size={13} className="text-brand-blue-light" />
                        {msg.name}
                      </h4>
                      <p className="text-xs text-white/40 mt-1 font-mono">{msg.email}</p>
                    </div>
                    <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-lg border border-slate-800 bg-brand-dark-3/60 text-white/50 flex items-center gap-1">
                      <FiLayers size={10} className="text-brand-blue-light" />
                      {msg.project || 'General'}
                    </span>
                  </div>

                  <p className="text-white/65 text-xs leading-relaxed bg-brand-dark-3/30 border border-slate-800/40 rounded-xl p-4 min-h-[80px] whitespace-pre-wrap">
                    "{msg.message}"
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between border-t border-slate-800/60 pt-4 mt-6 gap-3">
                  <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-mono">
                    <FiCalendar size={11} />
                    <span>{msg.timestamp ? new Date(msg.timestamp).toLocaleDateString() : 'No Timestamp'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Mail Link Button */}
                    <a
                      href={getMailtoLink(msg)}
                      className="px-3.5 py-1.5 rounded-lg bg-brand-blue hover:bg-brand-blue-light text-white text-[10px] font-bold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                    >
                      <FiMail size={11} /> Respond
                    </a>
                    
                    {/* Toggle Archive */}
                    <button
                      onClick={() => handleToggleArchive(msg.id)}
                      className="p-1.5 rounded-lg bg-brand-dark-3 border border-slate-800 hover:border-brand-blue/30 text-white/40 hover:text-white transition-all cursor-pointer"
                      title={msg.archived ? 'Unarchive' : 'Archive'}
                    >
                      <FiArchive size={12} className={msg.archived ? 'text-brand-blue-glow' : ''} />
                    </button>

                    {/* Delete Permanent */}
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="p-1.5 rounded-lg bg-brand-dark-3 border border-slate-800 hover:border-red-500/20 text-white/40 hover:text-red-400 transition-all cursor-pointer"
                      title="Delete permanently"
                    >
                      <FiTrash2 size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
