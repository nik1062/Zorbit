import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiCheckCircle, FiActivity } from 'react-icons/fi'

export default function ExitPopup() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Safe session storage wrapper to prevent crashes in strict privacy modes
    const getSession = () => {
      try { return sessionStorage.getItem('zorbit_popup_shown') } catch(e) { return null }
    }
    const setSession = () => {
      try { sessionStorage.setItem('zorbit_popup_shown', 'true') } catch(e) {}
    }

    // Only show once per session
    if (getSession()) return

    let mobileTimer;

    const handleMouseLeave = (e) => {
      // If mouse leaves top of viewport (exit intent)
      if (e.clientY <= 0) {
        if (!show) {
          setShow(true)
          setSession()
        }
      }
    }

    // Trigger after 45 seconds for mobile fallback
    mobileTimer = setTimeout(() => {
      if (!getSession()) {
        setShow(true)
        setSession()
      }
    }, 45000)

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(mobileTimer)
    }
  }, [show])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      setLoading(false)
      return
    }

    const payload = {
      name: 'Website Visitor',
      email: email,
      company: 'Unknown',
      project: 'Free Technical Audit (Lead Magnet)',
      message: 'Visitor requested a free technical architecture audit via the Exit-Intent Popup.',
    }

    try {
      await fetch('https://script.google.com/macros/s/AKfycbyCKKFNnIJ826kWCHm9JZjUeADqwfNf-VwaqkrHkW3JNt4_s0JtxU9E4YpzNTOo-N8wWg/exec', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'text/plain' },
      })
      setSuccess(true)
    } catch (err) {
      setError('Network error. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const closePopup = () => setShow(false)

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg border-beam-container rounded-3xl bg-brand-dark-2 overflow-hidden shadow-2xl"
          >
            <div className="border-beam-effect" />
            <div className="border-beam-content p-8 bg-brand-dark-2/95 rounded-3xl relative">
              <button
                onClick={closePopup}
                className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors"
              >
                <FiX size={24} />
              </button>

              {success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <FiCheckCircle size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2 text-white">Audit Requested</h3>
                  <p className="text-slate-300 text-sm">
                    We'll review your site and email you our findings within 24 hours.
                  </p>
                  <button
                    onClick={closePopup}
                    className="mt-6 px-6 py-2.5 rounded-xl border border-slate-700 hover:bg-brand-dark-3 transition-colors text-xs uppercase tracking-wider font-bold text-white cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="text-brand-blue-light text-xs font-semibold uppercase tracking-widest font-mono">
                    Free Technical Audit
                  </span>
                  <h3 className="font-display text-3xl font-bold text-white leading-tight mt-1">
                    Wait... Is your software running too slow?
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mt-2 mb-6">
                    Drop your email below. Our engineering team will do a quick review of your app or website and send you a list of optimizations to improve speed and conversion—100% free.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="founder@startup.com"
                        className="w-full px-5 py-4 rounded-xl bg-brand-dark-3 border border-slate-800 text-white placeholder-white/20 text-sm focus:outline-none focus:border-brand-blue/50 transition-colors font-mono"
                        required
                      />
                      {error && <span className="text-red-400 text-xs font-mono mt-2 inline-block">{error}</span>}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        loading
                          ? 'opacity-50 bg-brand-blue/50 cursor-not-allowed'
                          : 'bg-brand-blue hover:bg-brand-blue-light text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]'
                      }`}
                    >
                      {loading ? (
                        <>
                          Requesting... <span className="inline-block w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin ml-1" />
                        </>
                      ) : (
                        <>
                          Get Free Audit <FiActivity size={14} />
                        </>
                      )}
                    </button>
                  </form>
                  <p className="text-center text-white/30 text-[10px] font-mono mt-4">
                    // No spam. Unsubscribe anytime.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
