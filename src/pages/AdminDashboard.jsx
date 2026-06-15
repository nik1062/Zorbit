import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiMessageSquare, FiStar, FiLogOut, FiSettings, FiBriefcase } from 'react-icons/fi'
import PageWrapper from '../components/PageWrapper'
import SecurityLock from '../components/admin/SecurityLock'
import AdminStats from '../components/admin/AdminStats'
import MessageRow from '../components/admin/MessageRow'
import ReviewModerator from '../components/admin/ReviewModerator'

import { api } from '../services/api'

export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [messages, setMessages] = useState([])
  const [reviews, setReviews] = useState([])
  const [activeTab, setActiveTab] = useState('leads')

  useEffect(() => {
    const auth = sessionStorage.getItem('zorbit_admin_dev_auth')
    if (auth === 'true') {
      setIsAuthorized(true)
    }

    // Central API requests for data loading
    api.getLeads().then((data) => {
      setMessages(data)
    })

    api.getReviews().then((data) => {
      setReviews(data)
    })
  }, [])

  const handleAuthorize = () => {
    setIsAuthorized(true)
    sessionStorage.setItem('zorbit_admin_dev_auth', 'true')
  }

  const handleLogout = () => {
    setIsAuthorized(false)
    sessionStorage.removeItem('zorbit_admin_dev_auth')
  }

  const handleUpdateMessages = async (updatedMessages) => {
    const data = await api.updateLeads(updatedMessages)
    setMessages(data)
  }

  const handleUpdateReviews = async (updatedReviews) => {
    const data = await api.updateReviews(updatedReviews)
    setReviews(data)
  }

  if (!isAuthorized) {
    return <SecurityLock onAuthorize={handleAuthorize} />
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#05070B] text-white pt-20">
        {/* Fixed Top Control Bar using Glassmorphism */}
        <div className="sticky top-[72px] z-40 bg-[#05070B]/80 backdrop-blur-md border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-pulse shadow-[0_0_8px_#2563EB]" />
              <h1 className="font-display font-bold text-lg tracking-tight">
                zorbit-studio <span className="text-brand-blue-glow">DevConsole</span>
              </h1>
              <span className="px-2 py-0.5 rounded bg-brand-dark-3 text-white/40 text-[9px] font-mono border border-slate-800">
                v2.6.0
              </span>
            </div>
            
            {/* View Selection & Logout */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('leads')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'leads'
                    ? 'bg-brand-blue text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                    : 'bg-brand-dark hover:bg-brand-dark-3 text-white/50 hover:text-white border border-slate-800/60'
                }`}
              >
                <FiMessageSquare size={13} /> Command Leads
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'testimonials'
                    ? 'bg-brand-blue text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                    : 'bg-brand-dark hover:bg-brand-dark-3 text-white/50 hover:text-white border border-slate-800/60'
                }`}
              >
                <FiStar size={13} /> Moderation Board
              </button>
              
              <div className="h-6 w-px bg-slate-800 mx-1" />

              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-brand-dark hover:bg-red-500/10 text-white/40 hover:text-red-400 border border-slate-800/60 transition-all cursor-pointer"
                title="Disconnect session"
              >
                <FiLogOut size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Command Center Workspace */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Operations KPI Metrics Row */}
          <AdminStats messages={messages} reviews={reviews} />

          {/* Sub Panels */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-6 md:p-8 rounded-3xl bg-brand-dark-3/40 border border-slate-800/60 backdrop-blur-sm"
          >
            {activeTab === 'leads' ? (
              <div>
                <div className="mb-6">
                  <h2 className="font-display font-bold text-xl flex items-center gap-2">
                    <FiBriefcase className="text-brand-blue-light" size={18} /> Leads & Project Briefs
                  </h2>
                  <p className="text-white/40 text-xs mt-1">Review contact inquiries, formulate custom mail response packets, or update archives.</p>
                </div>
                <MessageRow messages={messages} onUpdateMessages={handleUpdateMessages} />
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="font-display font-bold text-xl flex items-center gap-2">
                    <FiSettings className="text-brand-blue-light" size={18} /> Testimonials Moderation
                  </h2>
                  <p className="text-white/40 text-xs mt-1">Audit public reviews, feature top testimonials to the landing page, or delete submissions.</p>
                </div>
                <ReviewModerator reviews={reviews} onUpdateReviews={handleUpdateReviews} />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
