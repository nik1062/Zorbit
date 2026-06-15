import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiTrash2, FiStar, FiFileText, FiAlertCircle, FiHeart } from 'react-icons/fi'

export default function ReviewModerator({ reviews = [], onUpdateReviews }) {
  const handleApprove = (id) => {
    const updated = reviews.map((r) => {
      if (r.id === id) {
        return { ...r, approved: true }
      }
      return r
    })
    onUpdateReviews(updated)
  }

  const handleReject = (id) => {
    if (window.confirm('Are you sure you want to reject/delete this review?')) {
      const updated = reviews.filter((r) => r.id !== id)
      onUpdateReviews(updated)
    }
  }

  const pendingReviews = reviews.filter((r) => !r.approved)
  const approvedReviews = reviews.filter((r) => r.approved)

  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-6">
      {/* Pending Approval Panel */}
      <div className="p-6 rounded-2xl bg-brand-dark-2 border border-slate-800 flex flex-col gap-4">
        <div>
          <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <FiAlertCircle size={16} className="text-brand-blue-light" />
            Pending Approval ({pendingReviews.length})
          </h3>
          <p className="text-white/40 text-xs mt-1">Submitted by visitors. Set to featured to display on main site.</p>
        </div>

        <div className="flex flex-col gap-4 mt-2 max-h-[500px] overflow-y-auto pr-2">
          <AnimatePresence mode="popLayout">
            {pendingReviews.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10 bg-brand-dark-3/30 border border-dashed border-slate-800 rounded-xl"
              >
                <FiCheck size={28} className="mx-auto text-emerald-500 mb-2" />
                <p className="text-white/50 text-xs font-semibold">Inbox Cleared</p>
                <p className="text-white/30 text-[10px] mt-0.5">All incoming feedback reviews have been audited.</p>
              </motion.div>
            ) : (
              pendingReviews.map((rev) => (
                <motion.div
                  key={rev.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-4 rounded-xl bg-brand-dark-3 border border-slate-800/80 flex flex-col justify-between gap-3 relative"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={i < rev.rating ? 'fill-brand-blue-glow text-brand-blue-glow' : 'text-white/10'}
                            size={12}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-white/30">{rev.date || 'New'}</span>
                    </div>
                    <p className="text-white/70 text-xs leading-relaxed italic">"{rev.text}"</p>
                  </div>

                  <div className="border-t border-slate-800/40 pt-2 flex justify-between items-center mt-1">
                    <div>
                      <p className="text-white text-xs font-semibold">{rev.name}</p>
                      <p className="text-[10px] text-brand-blue-light">{rev.company}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(rev.id)}
                        className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <FiCheck size={10} /> Feature
                      </button>
                      <button
                        onClick={() => handleReject(rev.id)}
                        className="p-1 rounded-md bg-brand-dark border border-slate-800 hover:border-red-500/20 text-white/30 hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete Feedback"
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

      {/* Featured Testimonials Panel */}
      <div className="p-6 rounded-2xl bg-brand-dark-2 border border-slate-800 flex flex-col gap-4">
        <div>
          <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <FiHeart size={16} className="text-brand-blue-light" />
            Featured on Main Site ({approvedReviews.length})
          </h3>
          <p className="text-white/40 text-xs mt-1">Publicly featured reviews rendering on the main landing page.</p>
        </div>

        <div className="flex flex-col gap-4 mt-2 max-h-[500px] overflow-y-auto pr-2">
          <AnimatePresence mode="popLayout">
            {approvedReviews.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10 bg-brand-dark-3/30 border border-dashed border-slate-800 rounded-xl"
              >
                <FiFileText size={28} className="mx-auto text-white/10 mb-2" />
                <p className="text-white/50 text-xs font-semibold">No Featured Reviews</p>
                <p className="text-white/30 text-[10px] mt-0.5">Approve reviews from pending list to feature them.</p>
              </motion.div>
            ) : (
              approvedReviews.map((rev) => (
                <motion.div
                  key={rev.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 rounded-xl bg-brand-dark-3 border border-slate-800/80 flex flex-col justify-between gap-3 relative"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={i < rev.rating ? 'fill-brand-blue-glow text-brand-blue-glow' : 'text-white/10'}
                            size={12}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-white/30">{rev.date || 'Featured'}</span>
                    </div>
                    <p className="text-white/70 text-xs leading-relaxed italic">"{rev.text}"</p>
                  </div>

                  <div className="border-t border-slate-800/40 pt-2 flex justify-between items-center mt-1">
                    <div>
                      <p className="text-white text-xs font-semibold">{rev.name}</p>
                      <p className="text-[10px] text-brand-blue-light">{rev.company}</p>
                    </div>
                    <button
                      onClick={() => handleReject(rev.id)}
                      className="px-2.5 py-1 rounded-md bg-brand-dark border border-slate-800 hover:border-red-500/20 text-white/30 hover:text-red-400 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <FiTrash2 size={10} /> Remove
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
