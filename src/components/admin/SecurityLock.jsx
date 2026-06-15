import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiLock, FiAlertCircle, FiTerminal, FiShield } from 'react-icons/fi'
import Button from '../Button'

export default function SecurityLock({ onAuthorize }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === 'zorbit_dev_2026') {
      setError(false)
      onAuthorize()
    } else {
      setError(true)
      setAttempts((prev) => prev + 1)
      setTimeout(() => setError(false), 800)
    }
  }

  return (
    <div className="min-h-screen bg-[#05070B] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Matrix/Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.05)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

      <motion.div
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md p-8 rounded-3xl bg-brand-dark-2 border border-slate-800 glow-blue text-center z-10 relative"
      >
        <div className="absolute top-4 right-4 flex items-center gap-1.5 text-white/20 text-[10px] font-mono">
          <FiTerminal size={10} />
          <span>SESS_ID: Z_ADMIN_DEV</span>
        </div>

        <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-6 border border-brand-blue/20">
          {error ? (
            <FiAlertCircle size={28} className="text-red-500 animate-pulse" />
          ) : (
            <FiLock size={28} className="text-brand-blue-light" />
          )}
        </div>

        <h2 className="font-display text-2xl font-bold mb-2 tracking-tight text-white">
          Secure Command Center
        </h2>
        <p className="text-white/40 text-xs mb-6 max-w-xs mx-auto">
          Authorization required to access client metrics, leads databases, and testimonials.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div>
            <label className="block text-white/50 text-xs font-semibold mb-2 uppercase tracking-wider">
              Developer Key
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••"
              required
              className={`w-full px-4 py-3 rounded-xl bg-brand-dark-3 text-white placeholder-white/20 text-sm focus:outline-none transition-colors border ${
                error ? 'border-red-500/50 focus:border-red-500/80 bg-red-950/10' : 'border-slate-800 focus:border-brand-blue/50'
              }`}
            />
          </div>

          <Button type="submit" variant="primary" className="py-3 w-full justify-center text-xs tracking-wider uppercase font-bold">
            Authenticate Node
          </Button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-xs mt-3 flex items-center justify-center gap-1.5 font-medium"
            >
              <FiShield size={12} /> Access Denied. Key Handshake Failed. ({attempts} attempts)
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mt-8 border-t border-slate-800/60 pt-4 text-[10px] text-white/20 font-mono">
          DEVELOPER BYPASS CODE: <code className="text-brand-blue-glow font-bold">zorbit_dev_2026</code>
        </div>
      </motion.div>
    </div>
  )
}
