import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiCpu } from 'react-icons/fi'

export default function LoadingIntro({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [logIndex, setLogIndex] = useState(0)

  const logs = [
    'booting zorbit core v2.6.0...',
    'establishing websocket server handshake...',
    'syncing local storage ledger caches...',
    'configuring zero-latency animation hooks...',
    'injecting custom magnetic physics cursor...',
    'assembling workspace telemetry grids...',
    'zorbit studio active. ready.'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        const inc = Math.floor(Math.random() * 12) + 6
        return Math.min(prev + inc, 100)
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      setLogIndex(logs.length - 1)
      const timeout = setTimeout(() => {
        onComplete()
      }, 700)
      return () => clearTimeout(timeout)
    }

    const segment = 100 / (logs.length - 1)
    const currentIdx = Math.min(Math.floor(progress / segment), logs.length - 2)
    setLogIndex(currentIdx)
  }, [progress, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-[#05070B] flex flex-col items-center justify-center font-mono text-xs select-none"
      initial={{ y: 0 }}
      exit={{ 
        y: '-100%',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      <div className="w-full max-w-sm px-8 space-y-6">
        {/* Animated Icon & Name */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 flex items-center justify-center bg-brand-blue/10 border border-brand-blue/20 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.15)]">
            <FiCpu className="text-brand-blue-glow animate-pulse" size={16} />
          </div>
          <div>
            <span className="font-display font-black text-sm tracking-widest text-white">ZORBIT</span>
            <span className="text-[9px] text-brand-blue-glow font-bold ml-1.5 uppercase tracking-widest bg-brand-blue/10 px-1.5 py-0.5 rounded border border-brand-blue/20">
              STUDIO
            </span>
          </div>
        </div>

        {/* Progress bar container */}
        <div className="space-y-2">
          <div className="flex justify-between font-bold text-white/50 text-[10px] uppercase tracking-widest font-mono">
            <span>Loading Workspace Modules</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-slate-950 border border-slate-900 h-1 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-blue shadow-[0_0_10px_#2563EB]"
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>
        </div>

        {/* Log feed */}
        <div className="h-6 text-[9px] text-white/30 flex flex-col justify-end uppercase tracking-wider font-bold">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="truncate">{logs[logIndex]}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
